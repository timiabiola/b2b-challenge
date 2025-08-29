import { NextRequest, NextResponse } from 'next/server'
import type { LeadSubmission } from '@/types'

export async function POST(request: NextRequest) {
  try {
    const data: LeadSubmission = await request.json()
    
    // Validate required fields
    if (!data.firstName || !data.lastName || !data.email || !data.phone || !data.position || !data.industry || !data.processesToAutomate || !data.decisionAuthority) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Format phone number for GHL
    const formattedPhone = data.phone.replace(/\D/g, '')

    // Prepare GHL payload
    const ghlPayload = {
      phone: formattedPhone,
      email: data.email,
      first_name: data.firstName,
      last_name: data.lastName,
      tags: ['website-lead', 'landing-page'],
      custom_fields: {
        position: data.position,
        industry: data.industry,
        process_to_automate: data.processesToAutomate.join(', '),
        decision_authority: data.decisionAuthority,
        submission_id: data.submissionId,
        submission_timestamp: data.timestamp,
      }
    }

    // Send to Go High Level (if configured)
    if (process.env.GHL_WEBHOOK_URL && process.env.GHL_API_KEY) {
      try {
        const ghlResponse = await fetch(process.env.GHL_WEBHOOK_URL, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${process.env.GHL_API_KEY}`
          },
          body: JSON.stringify(ghlPayload)
        })

        if (!ghlResponse.ok) {
          console.error('GHL submission failed:', await ghlResponse.text())
          // Don't fail the request if GHL fails - we can still save locally
        }
      } catch (ghlError) {
        console.error('GHL submission error:', ghlError)
        // Continue processing even if GHL fails
      }
    } else {
      console.log('GHL not configured, logging submission:', ghlPayload)
    }

    // Send to n8n webhook for internal communication
    if (process.env.N8N_WEBHOOK_URL) {
      try {
        const n8nPayload = {
          submissionId: data.submissionId,
          timestamp: data.timestamp,
          firstName: data.firstName,
          lastName: data.lastName,
          email: data.email,
          phone: data.phone,
          position: data.position,
          industry: data.industry,
          processesToAutomate: data.processesToAutomate,
          decisionAuthority: data.decisionAuthority,
          source: 'landing-page',
          formType: 'lead-capture'
        }

        const n8nResponse = await fetch(process.env.N8N_WEBHOOK_URL, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(n8nPayload)
        })

        if (!n8nResponse.ok) {
          console.error('n8n webhook failed:', await n8nResponse.text())
        }
      } catch (n8nError) {
        console.error('n8n webhook error:', n8nError)
        // Don't fail the request if webhook fails
      }
    }

    // You could also save to a database here as a backup
    // await saveToDatabase(data)

    // Log for monitoring
    console.log('Lead submission received:', {
      submissionId: data.submissionId,
      timestamp: data.timestamp,
      industry: data.industry,
      decisionAuthority: data.decisionAuthority
    })

    return NextResponse.json({ 
      success: true,
      message: 'Lead submitted successfully',
      submissionId: data.submissionId
    })
    
  } catch (error) {
    console.error('Lead submission error:', error)
    return NextResponse.json(
      { error: 'Failed to process submission' },
      { status: 500 }
    )
  }
}


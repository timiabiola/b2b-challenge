import { NextRequest, NextResponse } from 'next/server'
import type { LeadSubmission } from '@/types'

export async function POST(request: NextRequest) {
  try {
    const data: LeadSubmission = await request.json()

    // Validate required fields
    if (!data.firstName || !data.lastName || !data.email || !data.phone) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Format phone number for GHL
    const formattedPhone = data.phone.replace(/\D/g, '')

    // Prepare GHL payload
    const ghlPayload = {
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      phone: formattedPhone,
      tags: ['website-lead', 'nurse-blueprint', 'bedside-to-business'],
      source: 'Bedside-to-Business Blueprint Landing Page'
    }

    // Send to Go High Level webhook
    const ghlWebhookUrl = 'https://services.leadconnectorhq.com/hooks/vuoXllweQOW5Mxsn8raO/webhook-trigger/e40d7604-df6c-4e88-9cd1-b01f7807863a'

    try {
      const ghlResponse = await fetch(ghlWebhookUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(ghlPayload)
      })

      if (!ghlResponse.ok) {
        console.error('GHL webhook failed:', await ghlResponse.text())
        // Don't fail the request if GHL fails - we can still save locally
      } else {
        console.log('GHL webhook successful')
      }
    } catch (ghlError) {
      console.error('GHL webhook error:', ghlError)
      // Continue processing even if GHL fails
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
          blueprintRequest: 'Bedside-to-Business Blueprint',
          source: 'landing-page',
          formType: 'blueprint-download'
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
    console.log('Blueprint download request received:', {
      submissionId: data.submissionId,
      timestamp: data.timestamp,
      blueprintType: 'Bedside-to-Business'
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


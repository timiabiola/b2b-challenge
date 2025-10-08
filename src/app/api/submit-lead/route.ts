import { NextRequest, NextResponse } from 'next/server'
import type { LeadSubmission } from '@/types'

export async function POST(request: NextRequest) {
  try {
    const data: LeadSubmission = await request.json()

    // Validate required fields
    if (!data.firstName || !data.lastName || !data.email) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Note: This API route is no longer actively used.
    // The form now sends directly to Zapier webhook from the client.
    // This route is kept for backwards compatibility and logging purposes.

    // Log for monitoring
    console.log('Challenge waitlist submission received:', {
      submissionId: data.submissionId,
      timestamp: data.timestamp,
      email: data.email,
      challengeType: 'Bedside-to-Business Challenge'
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


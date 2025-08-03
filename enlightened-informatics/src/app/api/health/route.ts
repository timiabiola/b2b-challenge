import { NextResponse } from 'next/server'

export async function GET() {
  return NextResponse.json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    message: 'Enlightened Informatics server is running!',
    port: process.env.PORT || 8081
  })
}
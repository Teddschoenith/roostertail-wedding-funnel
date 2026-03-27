import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  try {
    const body = await request.json()

    const webhookUrl = process.env.N8N_WEBHOOK_URL
    if (!webhookUrl) {
      console.warn('N8N_WEBHOOK_URL not configured — lead logged locally only')
      console.log('Lead received:', JSON.stringify(body, null, 2))
      return NextResponse.json({ success: true, note: 'webhook not configured' })
    }

    const response = await fetch(webhookUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    })

    if (!response.ok) {
      console.error('Webhook failed:', response.status, await response.text())
      return NextResponse.json({ success: false, error: 'webhook_failed' }, { status: 502 })
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Lead submission error:', error)
    return NextResponse.json({ success: false, error: 'server_error' }, { status: 500 })
  }
}

import { NextResponse } from 'next/server'
import { upsertGHLContact } from '@/lib/ghl'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    console.log('Lead received:', body.eventSlug || 'wedding', body.email)

    // Primary: push to GoHighLevel
    const ghlResult = await upsertGHLContact(body)
    if (!ghlResult.success) {
      console.error('GHL upsert failed:', ghlResult.error)
    }

    // Secondary: forward to N8N webhook if configured
    const webhookUrl = process.env.N8N_WEBHOOK_URL
    if (webhookUrl && !webhookUrl.includes('your-n8n-instance.com')) {
      fetch(webhookUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      }).catch((err) => console.error('N8N webhook error:', err))
    }

    // Always return success to never block the funnel UX
    return NextResponse.json({ success: true, contactId: ghlResult.contactId })
  } catch (error) {
    console.error('Lead submission error:', error)
    return NextResponse.json({ success: true, note: 'logged_with_error' })
  }
}

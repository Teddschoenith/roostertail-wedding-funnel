import { NextResponse } from 'next/server'
import { upsertGHLContact } from '@/lib/ghl'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    console.log('Lead received:', body.eventSlug || 'wedding', body.email)

    // DIAGNOSTIC: test multiple endpoints to see which work
    const diag: Record<string, unknown> = {}
    try {
      // Test 1: GET location (already known to work)
      const r1 = await fetch(`https://services.leadconnectorhq.com/locations/${process.env.GHL_LOCATION_ID}`, {
        headers: { 'Authorization': `Bearer ${process.env.GHL_API_KEY}`, 'Version': '2021-07-28' },
      })
      diag.getLocation = r1.status

      // Test 2: GET custom fields (should also be read)
      const r2 = await fetch(`https://services.leadconnectorhq.com/locations/${process.env.GHL_LOCATION_ID}/customFields`, {
        headers: { 'Authorization': `Bearer ${process.env.GHL_API_KEY}`, 'Version': '2021-07-28' },
      })
      diag.getCustomFields = r2.status

      // Test 3: POST to /contacts/ (different from upsert)
      const r3 = await fetch(`https://services.leadconnectorhq.com/contacts/`, {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${process.env.GHL_API_KEY}`, 'Version': '2021-07-28', 'Content-Type': 'application/json' },
        body: JSON.stringify({ locationId: process.env.GHL_LOCATION_ID, firstName: 'DIAGCREATE', email: 'diagcreate@test.com' }),
      })
      diag.postContactsCreate = { status: r3.status, body: (await r3.text()).substring(0, 100) }
    } catch (e) { diag.error = String(e).substring(0, 100) }

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
    return NextResponse.json({ success: true, contactId: ghlResult.contactId, _err: ghlResult.error, _diag: diag })
  } catch (error) {
    console.error('Lead submission error:', error)
    return NextResponse.json({ success: true, note: 'logged_with_error' })
  }
}

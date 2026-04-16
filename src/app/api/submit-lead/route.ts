import { NextResponse } from 'next/server'
import { upsertGHLContact } from '@/lib/ghl'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    console.log('Lead received:', body.eventSlug || 'wedding', body.email)
    console.log('GHL env check:', {
      hasApiKey: !!process.env.GHL_API_KEY,
      hasLocationId: !!process.env.GHL_LOCATION_ID,
      apiKeyLength: process.env.GHL_API_KEY?.length || 0,
    })

    // DEBUG: test a simple GET to check token access
    let getTestStatus = 0
    let getTestBody = ''
    try {
      const testRes = await fetch(`https://services.leadconnectorhq.com/locations/${process.env.GHL_LOCATION_ID}`, {
        headers: {
          'Authorization': `Bearer ${process.env.GHL_API_KEY}`,
          'Version': '2021-07-28',
        },
      })
      getTestStatus = testRes.status
      getTestBody = (await testRes.text()).substring(0, 200)
    } catch (e) { getTestBody = String(e).substring(0, 200) }

    // Primary: push to GoHighLevel
    const ghlResult = await upsertGHLContact(body)
    console.log('GHL result:', ghlResult)
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
    // TEMP: include debug info to diagnose production
    return NextResponse.json({
      success: true,
      contactId: ghlResult.contactId,
      _debug: {
        hasApiKey: !!process.env.GHL_API_KEY,
        hasLocationId: !!process.env.GHL_LOCATION_ID,
        ghlSuccess: ghlResult.success,
        ghlError: ghlResult.error,
        getTest: { status: getTestStatus, body: getTestBody },
      },
    })
  } catch (error) {
    console.error('Lead submission error:', error)
    // Still return 200 so the funnel advances
    return NextResponse.json({ success: true, note: 'logged_with_error' })
  }
}

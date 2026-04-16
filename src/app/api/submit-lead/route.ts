import { NextResponse } from 'next/server'

// Resilient lead submission: tries n8n first, falls back to GHL webhook directly
// Both URLs have server-side retries. Leads should never be missed.

const GHL_WEBHOOK_FALLBACK = 'https://services.leadconnectorhq.com/hooks/oBEdmRQxsF0ObLbuUbXP/webhook-trigger/df41fc53-1d06-433f-9cd8-744481fa222d'

async function postWithRetry(url: string, body: unknown, label: string): Promise<{ ok: boolean; status?: number; error?: string }> {
  const maxAttempts = 3
  const baseDelayMs = 500

  for (let attempt = 1; attempt <= maxAttempts; attempt++) {
    try {
      const res = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
        signal: AbortSignal.timeout(10000),
      })

      if (res.ok) {
        console.log(`[${label}] success on attempt ${attempt}:`, res.status)
        return { ok: true, status: res.status }
      }

      const errorText = await res.text().catch(() => '')
      console.error(`[${label}] attempt ${attempt} failed:`, res.status, errorText.substring(0, 200))

      // Don't retry on 4xx (client errors) except 408, 429
      if (res.status >= 400 && res.status < 500 && res.status !== 408 && res.status !== 429) {
        return { ok: false, status: res.status, error: errorText.substring(0, 200) }
      }
    } catch (err) {
      console.error(`[${label}] attempt ${attempt} error:`, String(err).substring(0, 200))
    }

    // Exponential backoff before next attempt
    if (attempt < maxAttempts) {
      await new Promise((r) => setTimeout(r, baseDelayMs * Math.pow(2, attempt - 1)))
    }
  }

  return { ok: false, error: 'all_retries_exhausted' }
}

export async function POST(request: Request) {
  const startedAt = Date.now()
  let body: Record<string, unknown> = {}

  try {
    body = await request.json()
    const leadId = `${body.eventSlug || 'wedding'}-${body.email || 'unknown'}-${Date.now()}`
    console.log('[lead] received:', leadId, { eventType: body.eventType, guestCount: body.guestCount })

    // Primary destination: n8n webhook (handles retries + mapping + GHL forward)
    const n8nUrl = process.env.N8N_WEBHOOK_URL
    let n8nResult: { ok: boolean; status?: number; error?: string } | null = null

    if (n8nUrl && !n8nUrl.includes('your-n8n-instance.com')) {
      n8nResult = await postWithRetry(n8nUrl, body, 'n8n')
    }

    // Fallback: direct GHL webhook (only if n8n failed or not configured)
    let fallbackResult: { ok: boolean; status?: number; error?: string } | null = null
    if (!n8nResult?.ok) {
      console.warn('[lead] n8n failed or not configured, using GHL fallback')
      fallbackResult = await postWithRetry(GHL_WEBHOOK_FALLBACK, body, 'ghl-fallback')
    }

    const delivered = n8nResult?.ok || fallbackResult?.ok

    if (!delivered) {
      // Last-resort: log everything so we can recover manually from Vercel logs
      console.error('[lead] ALL DESTINATIONS FAILED - lead data logged for manual recovery:', JSON.stringify(body))
    }

    console.log('[lead] done in', Date.now() - startedAt, 'ms', { delivered, n8n: n8nResult?.ok, fallback: fallbackResult?.ok })

    // Always return success to the client so the funnel UX never breaks
    return NextResponse.json({ success: true, delivered })
  } catch (error) {
    // Even on unexpected error, log the raw body for manual recovery
    console.error('[lead] UNEXPECTED ERROR - raw body:', JSON.stringify(body), 'error:', error)
    return NextResponse.json({ success: true, note: 'logged_with_error' })
  }
}

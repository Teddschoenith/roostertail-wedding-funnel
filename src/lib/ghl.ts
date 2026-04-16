// GoHighLevel CRM integration
// Maps funnel lead data to GHL contact fields and upserts contacts

const GHL_API_BASE = 'https://services.leadconnectorhq.com'

// ─── EXISTING CUSTOM FIELD IDS ──────────────────────────────────────
const EXISTING_FIELDS = {
  typeOfEvent: 'QHGafv0gdGlbDpNAqxki',         // CHECKBOX - triggers workflows
  estimatedGuestCount: 'YeAJPJJOoNT1UwksRtXZ',  // NUMERICAL
  howManyGuests: 'qwGBNvf7zwiahOgBIy2Q',        // TEXT - preserves original range
  preferredEventDate: 'aqWW36fq9glAcBfte6Xe',    // DATE
  tellUsAboutEvent: 'g53yX5m5U5Y0YwfB5L3d',     // LARGE_TEXT
}

// ─── LEAD INFO FIELD IDS ────────────────────────────────────────────
const LEAD_INFO = {
  leadSource: 'DwAyDnzI7wzeovAAiXyi',
  beenBefore: 'ImFejiLpeJPRGRFtRKuk',
  timeline: 'FeZsbz2w4UPQkt0rCa4a',
  role: 'yhiIz6FRN0aKtOVVAaqq',
  bestTimeToCall: 't5ZAD8WjanKQaU5DFkaj',
}

// ─── EVENT DETAILS FIELD IDS ────────────────────────────────────────
const EVENT_DETAILS = {
  cateringPreference: 'tnLvTUacDQDS4D263sWl',
  companyOrganization: 'KQj0GgvY6HKzezQdlyRY',
  companyUrl: 'uArpDoY44NJfTofYw33g',
  eventSubType: 'yjdcBIGN7j6k3HaMTkpE',
  partyType: '3QeN26yMI01hrrJ9qlOS',
  partnerName: 'gdVV01J1IT7zSoiH4C9r',
}

// ─── SPECIFIC DETAILS FIELD IDS ─────────────────────────────────────
const SPECIFIC_DETAILS = {
  birthdayPerson: 'AM0Ef0mZhAvPRshFlefN',
  birthdayDate: 'GSOUUIMrLEenpyPKxXX1',
  milestoneAge: 'B0uMvjXoI1QMZKk8ZOTW',
  showerType: 'hw5CE121xjlHoRSpI1Yh',
  preferredTime: 'yvZDh9T1VVKc7lB3ISbl',
  schoolName: 'oT91jcOhP8jxjSWSkidg',
  promTheme: 'BjQDlEE3OtrDeBHMaH02',
}

// ─── EVENT TYPE MAPPING ─────────────────────────────────────────────
// Maps funnel eventType values to GHL "Type Of Event" picklist values
// This is CRITICAL - incorrect mapping breaks workflow triggers
const EVENT_TYPE_MAP: Record<string, string> = {
  'Weddings': 'Wedding',
  'Wedding': 'Wedding',
  'Corporate Events': 'Corporate Events',
  'Christmas Parties': 'Holiday Parties',
  'Holiday Parties': 'Holiday Parties',
  'Prom': 'Prom',
  'Birthdays': 'Birthdays',
  'Showers': 'Shower (Bridal or Baby)',
  'Other Events': 'Other',
  'Other': 'Other',
}

function mapEventTypeToGHL(eventType: string): string {
  return EVENT_TYPE_MAP[eventType] || 'Other'
}

// ─── HELPER: EXTRACT NUMBER FROM GUEST COUNT STRING ─────────────────
// "50-150" -> 50, "Under 50" -> 50, "300+" -> 300
function extractGuestNumber(guestStr: string): number | null {
  if (!guestStr) return null
  const match = guestStr.match(/(\d+)/)
  return match ? parseInt(match[1], 10) : null
}

// ─── HELPER: PARSE DATE STRING TO ISO ───────────────────────────────
// Converts "June 15, 2027" or "March 5" to "YYYY-MM-DD" for GHL DATE fields
function parseDateToISO(dateStr: string): string | null {
  if (!dateStr || dateStr === 'Flexible') return null
  try {
    const parsed = new Date(dateStr)
    if (!isNaN(parsed.getTime())) {
      return parsed.toISOString().split('T')[0]
    }
  } catch { /* fall through */ }
  return null
}

// ─── HELPER: SPLIT FULL NAME ────────────────────────────────────────
function splitName(fullName: string): { firstName: string; lastName: string } {
  if (!fullName) return { firstName: '', lastName: '' }
  const parts = fullName.trim().split(/\s+/)
  const firstName = parts[0] || ''
  const lastName = parts.slice(1).join(' ') || ''
  return { firstName, lastName }
}

// ─── BUILD CUSTOM FIELDS ARRAY ──────────────────────────────────────
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function buildCustomFields(payload: Record<string, any>): { id: string; field_value: any }[] {
  const fields: { id: string; field_value: any }[] = []

  function add(id: string, value: any) {
    if (value !== undefined && value !== null && value !== '') {
      fields.push({ id, field_value: value })
    }
  }

  // Type of Event - CHECKBOX expects array
  const eventType = payload.eventType || payload.eventSlug
  if (eventType) {
    const ghlType = mapEventTypeToGHL(eventType)
    add(EXISTING_FIELDS.typeOfEvent, [ghlType])
  }

  // Guest count - store full range string in TEXT field + extracted number in NUMERICAL field
  const guestCount = payload.guestCount
  if (guestCount) {
    add(EXISTING_FIELDS.howManyGuests, guestCount)
    const num = extractGuestNumber(guestCount)
    if (num !== null) add(EXISTING_FIELDS.estimatedGuestCount, num)
  }

  // Preferred date - GHL DATE field needs YYYY-MM-DD format
  const dateValue = payload.preferredDate || payload.weddingDate
  if (dateValue && dateValue !== 'Flexible') {
    const isoDate = parseDateToISO(dateValue)
    if (isoDate) add(EXISTING_FIELDS.preferredEventDate, isoDate)
  }

  // Lead Info
  add(LEAD_INFO.leadSource, payload.eventSlug || 'wedding')
  add(LEAD_INFO.beenBefore, payload.beenBefore)
  add(LEAD_INFO.timeline, payload.timeline)
  add(LEAD_INFO.role, payload.role)
  add(LEAD_INFO.bestTimeToCall, payload.bestTimeToCall)

  // Event Details
  const catering = payload.cateringStyle || payload.catering || payload.diningStyle
  add(EVENT_DETAILS.cateringPreference, catering)
  add(EVENT_DETAILS.companyOrganization, payload.companyName)
  add(EVENT_DETAILS.companyUrl, payload.companyUrl)
  add(EVENT_DETAILS.eventSubType, payload.eventSubType)
  add(EVENT_DETAILS.partyType, payload.partyType)
  add(EVENT_DETAILS.partnerName, payload.partnerName)

  // Specific Details
  add(SPECIFIC_DETAILS.birthdayPerson, payload.birthdayPerson)
  add(SPECIFIC_DETAILS.birthdayDate, payload.birthdayDate)
  add(SPECIFIC_DETAILS.milestoneAge, payload.milestone)
  add(SPECIFIC_DETAILS.showerType, payload.showerType)
  add(SPECIFIC_DETAILS.preferredTime, payload.timeOfDay)
  add(SPECIFIC_DETAILS.schoolName, payload.schoolName)
  add(SPECIFIC_DETAILS.promTheme, payload.promTheme)

  // Build a description from any extra notes
  const notes = payload.additionalNotes
  if (notes) {
    add(EXISTING_FIELDS.tellUsAboutEvent, notes)
  }

  return fields
}

// ─── BUILD TAGS ─────────────────────────────────────────────────────
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function buildTags(payload: Record<string, any>): string[] {
  const tags: string[] = []
  const slug = payload.eventSlug || 'wedding'
  tags.push(`${slug}-funnel`)

  if (payload.guestCount) tags.push(`guests-${payload.guestCount.toLowerCase().replace(/\s+/g, '-')}`)
  if (payload.timeline) tags.push(`timeline-${payload.timeline.toLowerCase().replace(/\s+/g, '-')}`)

  return tags
}

// ─── UPSERT CONTACT IN GHL ──────────────────────────────────────────
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function upsertGHLContact(payload: Record<string, any>): Promise<{ success: boolean; contactId?: string; error?: string }> {
  const apiKey = process.env.GHL_API_KEY
  const locationId = process.env.GHL_LOCATION_ID

  if (!apiKey || !locationId) {
    console.error('GHL credentials not configured')
    return { success: false, error: 'missing_credentials' }
  }

  const { firstName, lastName } = splitName(payload.yourName || '')
  const customFields = buildCustomFields(payload)
  const tags = buildTags(payload)

  const body = {
    locationId,
    firstName,
    lastName: lastName || undefined,
    email: payload.email || undefined,
    phone: payload.phone || undefined,
    source: 'Website Funnel',
    tags,
    customFields,
  }

  try {
    const response = await fetch(`${GHL_API_BASE}/contacts/upsert`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Version': '2021-07-28',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    })

    if (!response.ok) {
      const errorText = await response.text()
      console.error('GHL upsert failed:', response.status, errorText)
      return { success: false, error: `ghl_${response.status}` }
    }

    const data = await response.json()
    const contactId = data?.contact?.id
    console.log('GHL contact upserted:', contactId)
    return { success: true, contactId }
  } catch (err) {
    console.error('GHL upsert error:', err)
    return { success: false, error: 'network_error' }
  }
}

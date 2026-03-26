# Roostertail Wedding Funnel Specification

## Overview

Mobile-first wedding lead generation funnel for **The Roostertail**, Detroit's waterfront event venue since 1958. Built in Perspective Funnels (perspective.co) — all copy, assets, and specs stored here for version control.

## Target Audience

Engaged couples in the Detroit metro area, 150+ guests, looking for an all-inclusive waterfront wedding venue.

---

## Funnel Flow

### Screen 1 — Landing Page

- **Hero heading:** TBD — will A/B test
- **Subtext:** Establishing The Roostertail as Detroit's waterfront venue
- **Scrollable sections:**
  - Quote from a real bride
  - About us blurb
  - Photo gallery
- **Feel:** Fun and interactive — not a traditional website, more like a story
- **CTA:** Button that starts the quiz

---

### Screen 2 — Guest Count

> "How many guests are you expecting?"

**Options:**
- Under 100
- 100–200
- 200–350
- 350+

---

### Screen 3 — Wedding Date

> "When are you getting married?"

**Options:**
- Spring/Summer 2026
- Fall/Winter 2026
- 2027
- Still deciding

---

### Screen 4 — What Matters Most

> "What matters most for your big day?"

**Options (multi-select):**
- Waterfront views and sunsets
- One price everything handled
- A venue with history and character
- Outdoor ceremony option

---

### Screen 5 — Pricing Transparency

> "Here's how our pricing works"

**Subtitle:** "We're designed to be the most stress-free wedding venue in Detroit. Three parts, no surprises."

**Bucket 1: Ceremony Fee** — if applicable
- Includes chairs, setup, rehearsal, aisleway, weather backup plan

**Bucket 2: Per-Person Package** — starts at $139/pp
- Includes plated or buffet dinner, open bar with bartenders, tax and gratuity — all in one number

**Bucket 3: Venue Rental** — includes:
- Tables, Chiavari chairs, linens, chargers
- Dedicated event coordinator from booking to day-of
- Full service staff setup and breakdown
- Custom LED lighting
- Complimentary parking for all guests
- Private restrooms, patio, and waterfront access

**Footer text:** "And that's it! No hidden fees. No vendor spreadsheet. No parking headaches."

**CTA:** "Got it — let's keep going"

---

### Screen 6 — Lead Capture

> "We'd love to put something together for you"

**Subtitle:** "Our events team will personally reach out within 24 hours."

**Fields:**
- Your name
- Partner's name
- Email
- Phone
- Best time to call (Morning / Afternoon / Evening)

**CTA:** "Get my custom quote"

---

### Screen 7 — Tour Scheduling

> "Would you like to schedule an on-site tour?"

**Options:**
- Yes
- Not yet — just call me first

**If yes:** "What's your preferred date and time?" with date/time selector

---

### Screen 8 — Thank You

> "You're on the list!"

**Body:** "Our team will personally reach out within 24 hours with availability and pricing for your date."

**Links to:**
- Photo gallery
- Instagram @theroostertail
- Venue tour video

**Footer:** "Detroit's waterfront event venue since 1958"

---

## Backend

- **Webhook** fires to n8n on lead submission
- **Lead scoring** based on guest count + date proximity
- **Hot leads** (150+ guests, date within 12 months): instant Telegram alert to sales team via @Roostertailai_bot
- **All leads:**
  - Auto-email confirmation
  - Log to VenueFlow/Firestore
  - Tag with quiz answers and source campaign

---

## Design Notes

- **Mobile-first** (98%+ of traffic from Meta/IG ads)
- **Fun and interactive** — tap-to-answer quiz style, not a boring form
- **Brand colors and fonts** TBD — match Roostertail wedding magazine aesthetic
- **Photos** from venue wedding portfolio

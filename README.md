# Roostertail Wedding Lead Funnel

This is the wedding lead generation funnel project for **The Roostertail** — Detroit's waterfront event venue since 1958.

## Overview

A mobile-first, interactive quiz-style funnel designed to capture and qualify wedding leads from Meta/Instagram ad campaigns. Built for deployment on [Perspective Funnels](https://perspective.co).

## Target Audience

Engaged couples in the Detroit metro area planning weddings with 150+ guests, looking for an all-inclusive waterfront venue.

## Repository Structure

```
├── docs/
│   └── FUNNEL_SPEC.md    # Full funnel specification (screens, copy, backend logic)
├── assets/                # Images, videos, and creative assets
├── .gitignore
└── README.md
```

## Funnel Flow

1. **Landing Page** — Hero, social proof, photo gallery, CTA
2. **Guest Count** — Qualification question
3. **Wedding Date** — Timeline qualification
4. **What Matters Most** — Multi-select preferences
5. **Pricing Transparency** — Three-bucket pricing breakdown
6. **Lead Capture** — Name, email, phone, best time to call
7. **Tour Scheduling** — Optional on-site tour booking
8. **Thank You** — Confirmation + social links

## Tech Stack

- **Funnel Builder:** Perspective Funnels (perspective.co)
- **Automation:** n8n (webhook-based)
- **Notifications:** Telegram via @Roostertailai_bot
- **CRM/Database:** VenueFlow / Firestore
- **Ad Platform:** Meta / Instagram

## Status

🚧 In development

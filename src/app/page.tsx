'use client'

import { useState } from 'react'
import Link from 'next/link'
import { eventTypeCards } from '@/lib/event-configs'

function StarIcon({ size = 20 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="starGold" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FFD700" />
          <stop offset="50%" stopColor="#FFC107" />
          <stop offset="100%" stopColor="#FFB300" />
        </linearGradient>
      </defs>
      <path d="M12 2L14.944 8.856L22 9.644L16.8 14.544L18.18 22L12 18.28L5.82 22L7.2 14.544L2 9.644L9.056 8.856L12 2Z" fill="url(#starGold)" stroke="#E6A800" strokeWidth="0.5" strokeLinejoin="round" />
    </svg>
  )
}

function FiveStars({ size = 20 }: { size?: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((i) => <StarIcon key={i} size={size} />)}
    </div>
  )
}

function FAQItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false)
  return (
    <div className="border-b border-border">
      <button onClick={() => setOpen(!open)} className="w-full flex items-center justify-between py-4 text-left">
        <span className="font-semibold text-sm text-black pr-4">{q}</span>
        <svg className={`w-5 h-5 text-muted shrink-0 transition-transform ${open ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" /></svg>
      </button>
      {open && <p className="text-muted text-sm pb-4 leading-relaxed">{a}</p>}
    </div>
  )
}

const testimonials = [
  {
    quote: "our company holiday party was the best one we have ever had. the waterfront views, the food, the service. our employees are still raving about it.",
    name: 'Michigan Manufacturing Co.',
    img: '/images/roostertail-204_websize.webp',
  },
  {
    quote: "the venue was the talk of the school for weeks. students felt like celebrities walking in. the staircase, the waterfront, the lighting. absolutely worth it.",
    name: 'Grosse Pointe High School',
    img: '/images/events/dsc03447.webp',
  },
  {
    quote: "my husband's 50th birthday party was absolutely perfect. the views, the food, the dance floor. it felt like a real celebration.",
    name: 'Sandra M.',
    img: '/images/events/dsc03553.webp',
  },
]

const gallery = [
  { src: '/images/roostertail-501_websize.webp', alt: 'Corporate event at The Roostertail' },
  { src: '/images/roostertail-82_websize.webp', alt: 'Waterfront celebration' },
  { src: '/images/events/dsc03447.webp', alt: 'Prom at The Roostertail' },
  { src: '/images/roostertail-858_websize.webp', alt: 'Elegant venue setup' },
  { src: '/images/events/dsc05521.webp', alt: 'Shower celebration' },
  { src: '/images/events/roostertail-building-exterior-vintage-neon-sign-night.webp', alt: 'The Roostertail at night' },
]

const faqs = [
  { q: 'What types of events do you host?', a: 'Weddings, corporate events, holiday parties, proms, birthdays, showers, reunions, fundraisers, and more. If you can celebrate it, we have hosted it.' },
  { q: 'How many guests can you accommodate?', a: 'Our venue accommodates 30 to 400+ guests depending on the event format and room configuration.' },
  { q: 'What is included?', a: 'Every event includes on-site parking, a dedicated event coordinator, professional service staff, tables, chairs, linens, and full setup and breakdown.' },
  { q: 'Do you provide catering?', a: 'Yes. We offer plated dinners, buffet service, cocktail receptions, and brunch packages. Our chef can customize menus to your preferences and dietary needs.' },
  { q: 'How far in advance should we book?', a: 'We recommend 2-6 months in advance. Holiday dates and weekends fill up faster, so the earlier the better for those.' },
  { q: 'Can we bring our own entertainment?', a: 'Yes! Bring your own DJ, band, or performers. Our venue has a professional sound system ready to use. We can also connect you with preferred vendors.' },
]

export default function Home() {
  const pairedCards = eventTypeCards.slice(0, 6)
  const lastCard = eventTypeCards[6]

  return (
    <div className="bg-white">
      {/* ===== HERO ===== */}
      <section className="min-h-[100dvh] flex flex-col justify-center px-5 py-10">
        <p className="text-accent text-xs font-semibold tracking-widest uppercase mb-3 text-center">
          Detroit&apos;s Waterfront Venue &middot; Est. 1958
        </p>
        <h1 className="font-display text-[2rem] leading-[1.15] font-bold text-black mb-2 text-center">
          What type of event are you looking for?
        </h1>
        <p className="text-muted text-sm mb-6 text-center">
          Tap to get started
        </p>

        <div className="grid grid-cols-2 gap-3 stagger">
          {pairedCards.map((card) => (
            <Link
              key={card.slug}
              href={`/${card.slug}`}
              className="relative overflow-hidden rounded-2xl shadow-md active:scale-[0.97] transition-transform block"
            >
              <img src={card.img} alt={card.label} className="w-full aspect-[3/4] object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-3">
                <p className="text-white font-bold text-sm leading-tight">{card.label}</p>
                <p className="text-white/70 text-[11px] leading-tight mt-0.5">{card.desc}</p>
              </div>
            </Link>
          ))}
        </div>

        {lastCard && (
          <Link
            href={`/${lastCard.slug}`}
            className="relative overflow-hidden rounded-2xl shadow-md active:scale-[0.97] transition-transform block mt-3"
          >
            <img src={lastCard.img} alt={lastCard.label} className="w-full aspect-[2/1] object-cover object-center" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-4">
              <p className="text-white font-bold text-base leading-tight">{lastCard.label}</p>
              <p className="text-white/70 text-xs leading-tight mt-0.5">{lastCard.desc}</p>
            </div>
          </Link>
        )}
      </section>

      {/* ===== SOCIAL PROOF BAR ===== */}
      <section className="bg-light-gray py-10 px-6 text-center">
        <div className="flex justify-center mb-3">
          <FiveStars size={28} />
        </div>
        <p className="text-black font-bold text-2xl mb-1">Detroit&apos;s favorite event venue</p>
        <p className="text-muted text-sm mt-2">
          Over 10,000 celebrations hosted since 1958.
        </p>
      </section>

      {/* ===== WHAT YOU GET ===== */}
      <section className="bg-white py-12 px-6">
        <p className="text-accent text-xs font-semibold tracking-widest uppercase mb-3">
          What you get
        </p>
        <h2 className="font-display text-2xl font-bold text-black mb-2">
          What can you expect from The Roostertail?
        </h2>
        <p className="text-muted text-sm mb-8">
          More is included, so there&apos;s less to manage.
        </p>

        <div className="grid grid-cols-2 gap-3">
          {[
            { icon: '🍽️', title: 'Full catering service', desc: 'Chef-prepared menus for every taste' },
            { icon: '🥂', title: 'Full bar service', desc: 'Open bar, cash bar, or custom packages' },
            { icon: '🪑', title: 'Tables, chairs & linens', desc: 'Everything you need, included' },
            { icon: '👔', title: 'Professional service staff', desc: 'Setup, service, and breakdown' },
            { icon: '🎶', title: 'Sound system & lighting', desc: 'DJ-ready with custom uplighting' },
            { icon: '🅿️', title: 'On-site parking', desc: 'Convenient self-parking included' },
            { icon: '🌅', title: 'Waterfront views', desc: 'Right on the Detroit River' },
            { icon: '🏡', title: 'Private patio', desc: 'Exclusive outdoor space' },
            { icon: '📋', title: 'Event coordinator', desc: 'Your point person for all logistics' },
            { icon: '✨', title: 'Flexible configurations', desc: 'Cocktail, seated, theater, and more' },
          ].map((item) => (
            <div key={item.title} className="bg-light-gray rounded-xl p-4">
              <span className="text-2xl mb-2 block">{item.icon}</span>
              <p className="font-semibold text-sm text-black">{item.title}</p>
              <p className="text-muted text-xs mt-1">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ===== TESTIMONIALS ===== */}
      <section className="bg-light-gray py-12 px-6">
        <p className="text-accent text-xs font-semibold tracking-widest uppercase mb-3">
          Real events
        </p>
        <h2 className="font-display text-2xl font-bold text-black mb-8">
          What people love about us
        </h2>

        <div className="flex flex-col gap-4">
          {testimonials.map((t) => (
            <div key={t.name} className="bg-white rounded-2xl overflow-hidden">
              <img src={t.img} alt={t.name} className="w-full aspect-[16/9] object-cover" loading="lazy" />
              <div className="p-5">
                <div className="flex items-center mb-3">
                  <FiveStars size={14} />
                </div>
                <p className="text-black/80 text-sm italic leading-relaxed">
                  &ldquo;{t.quote}&rdquo;
                </p>
                <p className="text-muted text-xs mt-3 font-semibold">{t.name}</p>
              </div>
            </div>
          ))}
        </div>

        <Link
          href="/wedding"
          className="w-full rounded-2xl bg-blue py-4 text-white text-base font-semibold active:scale-[0.97] transition-transform mt-8 block text-center"
        >
          Get in touch with an event coordinator &rarr;
        </Link>
        <p className="text-muted text-xs mt-3 text-center">Takes less than 60 seconds</p>
      </section>

      {/* ===== PHOTO GALLERY ===== */}
      <section className="bg-white py-12 px-6">
        <p className="text-accent text-xs font-semibold tracking-widest uppercase mb-3">
          See it for yourself
        </p>
        <h2 className="font-display text-2xl font-bold text-black mb-6">
          Your venue, your vision
        </h2>

        <div className="grid grid-cols-3 gap-2">
          {gallery.map((photo, i) => (
            <img
              key={photo.src}
              src={photo.src}
              alt={photo.alt}
              loading="lazy"
              className={`w-full object-cover rounded-xl ${i === 0 || i === 5 ? 'col-span-2 aspect-[2/1]' : 'aspect-square'}`}
            />
          ))}
        </div>
      </section>

      {/* ===== ABOUT US ===== */}
      <section className="bg-light-gray py-12 px-6">
        <div className="flex gap-4 mb-6">
          <img
            src="/images/roostertail-901_websize.webp"
            alt="Event at The Roostertail"
            className="w-1/2 rounded-2xl object-cover aspect-[3/4]"
            loading="lazy"
          />
          <img
            src="/images/roostertail-930_websize.webp"
            alt="Celebration at The Roostertail"
            className="w-1/2 rounded-2xl object-cover aspect-[3/4]"
            loading="lazy"
          />
        </div>

        <p className="text-accent text-xs font-semibold tracking-widest uppercase mb-3">
          About us
        </p>
        <h2 className="font-display text-2xl font-bold text-black mb-3">
          Detroit&apos;s waterfront event venue since 1958
        </h2>
        <p className="text-muted text-sm leading-relaxed mb-4">
          The Roostertail sits on the Detroit River with panoramic waterfront views that have hosted over 10,000 celebrations. From weddings to corporate galas, proms to birthday parties, we bring your vision to life.
        </p>
        <p className="text-muted text-sm leading-relaxed">
          Our dedicated event coordinators and professional staff support you through the entire planning process. That&apos;s why organizations and families across Michigan choose us year after year.
        </p>
      </section>

      {/* ===== FAQ ===== */}
      <section className="bg-white py-12 px-6">
        <p className="text-accent text-xs font-semibold tracking-widest uppercase mb-3">
          Common questions
        </p>
        <h2 className="font-display text-2xl font-bold text-black mb-6">
          Frequently Asked Questions
        </h2>
        {faqs.map((faq) => (
          <FAQItem key={faq.q} q={faq.q} a={faq.a} />
        ))}
      </section>

      {/* ===== FINAL CTA ===== */}
      <section className="bg-light-gray py-12 px-6 text-center">
        <div className="flex justify-center mb-3">
          <FiveStars size={24} />
        </div>
        <h2 className="font-display text-2xl font-bold text-black mb-2">
          Ready to plan your event?
        </h2>
        <p className="text-muted text-sm mb-6">
          Choose your event type and we&apos;ll connect you with a coordinator.
        </p>

        <div className="flex flex-col gap-2">
          {eventTypeCards.slice(0, 4).map((card) => (
            <Link
              key={card.slug}
              href={`/${card.slug}`}
              className="w-full rounded-2xl bg-blue py-3.5 text-white text-sm font-semibold active:scale-[0.97] transition-transform block text-center"
            >
              {card.label} &rarr;
            </Link>
          ))}
          <div className="grid grid-cols-3 gap-2">
            {eventTypeCards.slice(4).map((card) => (
              <Link
                key={card.slug}
                href={`/${card.slug}`}
                className="rounded-xl bg-white border border-border py-3 text-black text-xs font-semibold active:scale-[0.97] transition-transform block text-center"
              >
                {card.label}
              </Link>
            ))}
          </div>
        </div>

        <p className="text-muted text-xs mt-6">
          The Roostertail &middot; 100 Marquette Dr, Detroit, MI 48214
        </p>
      </section>
    </div>
  )
}

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
        <span className="font-semibold text-sm md:text-base text-black pr-4">{q}</span>
        <svg className={`w-5 h-5 text-muted shrink-0 transition-transform ${open ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" /></svg>
      </button>
      {open && <p className="text-muted text-sm pb-4 leading-relaxed">{a}</p>}
    </div>
  )
}

const testimonials = [
  {
    quote: "Another spectacular Echo Global Logistics holiday party. The Roostertail created a magical evening for us. Nicole and her team treated us all like royalty.",
    name: 'Suzanne Parrish, Echo Global Logistics',
    img: '/images/roostertail-204_websize.webp',
  },
  {
    quote: "Walled Lake Western High School held their senior prom at The Roostertail. The venue is absolutely gorgeous and the students deemed it Instagram-worthy.",
    name: 'Jessica Sanchez, Walled Lake Western High School',
    img: '/images/events/dsc03447.webp',
  },
  {
    quote: "Thanks for an amazing 50th birthday party. It was excellence from start to finish. The team was so attentive, ensuring everything went smoothly.",
    name: 'Tamaka Butler',
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
  { q: 'How many guests can you accommodate?', a: 'Our venue accommodates 30 to 2,000+ guests depending on the event format and room configuration.' },
  { q: 'What is included?', a: 'Every event includes on-site parking, a dedicated venue coordinator, professional service staff, tables, chairs, linens, and full setup and breakdown of our equipment.' },
  { q: 'Do you provide catering?', a: 'We take a lot of pride in our food and have award-winning chefs. Our chef can customize menus to your preferences and dietary needs.' },
  { q: 'How far in advance should we book?', a: 'Some events book one to two years prior to the event date. Some are two weeks before. We can do it all.' },
  { q: 'Can we bring our own DJ?', a: 'Yes! You can bring your own DJ or band. We can also connect you with preferred vendors.' },
]

export default function Home() {
  return (
    <div className="bg-white homepage-container">
      {/* ===== HERO ===== */}
      <section className="flex flex-col justify-center px-5 py-10 md:py-20 min-h-dvh md:[min-height:auto]">
        <div className="section-inner">
          <p className="text-accent text-xs md:text-sm font-semibold tracking-widest uppercase mb-3 md:mb-4 text-center">
            Detroit&apos;s Waterfront Venue &middot; Est. 1958
          </p>
          <h1 className="font-display text-[2rem] md:text-5xl leading-[1.15] font-bold text-black mb-2 md:mb-3 text-center">
            What type of event are you looking for?
          </h1>
          <p className="text-muted text-sm md:text-base mb-6 md:mb-10 text-center">
            Click to get started
          </p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-5">
            {eventTypeCards.slice(0, 4).map((card) => (
              <Link
                key={card.slug}
                href={`/${card.slug}`}
                className="relative overflow-hidden rounded-2xl shadow-md md:shadow-lg hover:shadow-xl hover:scale-[1.03] active:scale-[0.97] transition-all block"
              >
                <img src={card.img} alt={card.label} className="w-full aspect-[3/4] object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-3 md:p-4">
                  <p className="text-white font-bold text-sm md:text-base leading-tight">{card.label}</p>
                  <p className="text-white/70 text-[11px] md:text-xs leading-tight mt-0.5">{card.desc}</p>
                </div>
              </Link>
            ))}
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-5 mt-3 md:mt-5">
            {eventTypeCards.slice(4).map((card) => (
              <Link
                key={card.slug}
                href={`/${card.slug}`}
                className="relative overflow-hidden rounded-2xl shadow-md md:shadow-lg hover:shadow-xl hover:scale-[1.03] active:scale-[0.97] transition-all block"
              >
                <img src={card.img} alt={card.label} className="w-full aspect-[3/4] md:aspect-[4/3] object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-3 md:p-4">
                  <p className="text-white font-bold text-sm md:text-base leading-tight">{card.label}</p>
                  <p className="text-white/70 text-[11px] md:text-xs leading-tight mt-0.5">{card.desc}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ===== SOCIAL PROOF BAR ===== */}
      <section className="bg-light-gray py-10 md:py-14 px-6 text-center">
        <div className="section-inner">
          <div className="flex justify-center mb-3">
            <FiveStars size={28} />
          </div>
          <p className="text-black font-bold text-2xl md:text-3xl mb-1">Detroit&apos;s favorite event venue</p>
          <p className="text-muted text-sm md:text-base mt-2">
            Over 10,000 celebrations hosted since 1958.
          </p>
        </div>
      </section>

      {/* ===== WHAT YOU GET ===== */}
      <section className="bg-white py-12 md:py-16 px-6">
        <div className="section-inner">
          <p className="text-accent text-xs font-semibold tracking-widest uppercase mb-3">
            What you get
          </p>
          <h2 className="font-display text-2xl md:text-3xl font-bold text-black mb-2">
            What can you expect from The Roostertail?
          </h2>
          <p className="text-muted text-sm mb-8">
            More is included, so there&apos;s less to manage.
          </p>

          <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
            {[
              { icon: '🍽️', title: 'Full catering service', desc: 'Chef-prepared menus for every taste' },
              { icon: '🥂', title: 'Full bar service', desc: 'Open bar, cash bar, or custom packages' },
              { icon: '🪑', title: 'Tables, chairs & linens', desc: 'Everything you need, included' },
              { icon: '👔', title: 'Professional service staff', desc: 'Setup, service, and breakdown' },
              { icon: '💡', title: 'Permanently installed LED lighting', desc: 'Custom colors and effects, DJ-ready' },
              { icon: '🅿️', title: 'On-site parking', desc: 'Convenient self-parking included' },
              { icon: '🌅', title: 'Waterfront views', desc: 'Right on the Detroit River' },
              { icon: '🏡', title: 'Private patio', desc: 'Exclusive outdoor space' },
              { icon: '📋', title: 'Venue coordinator', desc: 'Your point person for all logistics' },
              { icon: '✨', title: 'Flexible configurations', desc: 'Layouts tailored to your event' },
            ].map((item) => (
              <div key={item.title} className="bg-light-gray rounded-xl p-4">
                <span className="text-2xl mb-2 block">{item.icon}</span>
                <p className="font-semibold text-sm text-black">{item.title}</p>
                <p className="text-muted text-xs mt-1">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== TESTIMONIALS ===== */}
      <section className="bg-light-gray py-12 md:py-16 px-6">
        <div className="section-inner">
          <p className="text-accent text-xs font-semibold tracking-widest uppercase mb-3">
            Real events
          </p>
          <h2 className="font-display text-2xl md:text-3xl font-bold text-black mb-8">
            What people love about us
          </h2>

          <div className="flex flex-col md:flex-row gap-4 md:gap-6">
            {testimonials.map((t) => (
              <div key={t.name} className="bg-white rounded-2xl overflow-hidden md:flex-1">
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

          <div className="md:flex md:justify-center mt-8">
            <Link
              href="/get-started"
              className="w-full md:w-auto md:px-16 rounded-2xl bg-blue py-4 text-white text-base font-semibold hover:bg-blue-dark active:scale-[0.97] transition-all block text-center"
            >
              Get in touch with an venue coordinator &rarr;
            </Link>
          </div>
          <p className="text-muted text-xs mt-3 text-center">Takes less than 60 seconds</p>
        </div>
      </section>

      {/* ===== PHOTO GALLERY ===== */}
      <section className="bg-white py-12 md:py-16 px-6">
        <div className="section-inner">
          <p className="text-accent text-xs font-semibold tracking-widest uppercase mb-3">
            See it for yourself
          </p>
          <h2 className="font-display text-2xl md:text-3xl font-bold text-black mb-6">
            Your venue, your vision
          </h2>

          <div className="grid grid-cols-3 gap-2 md:gap-4">
            {gallery.map((photo, i) => (
              <img
                key={photo.src}
                src={photo.src}
                alt={photo.alt}
                loading="lazy"
                className={`w-full object-cover rounded-xl md:rounded-2xl ${i === 0 || i === 5 ? 'col-span-2 aspect-[2/1]' : 'aspect-square'}`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ===== ABOUT US ===== */}
      <section className="bg-light-gray py-12 md:py-16 px-6">
        <div className="section-inner md:flex md:gap-12 md:items-center">
          <div className="flex gap-4 mb-6 md:mb-0 md:w-1/2 md:shrink-0">
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

          <div>
            <p className="text-accent text-xs font-semibold tracking-widest uppercase mb-3">
              About us
            </p>
            <h2 className="font-display text-2xl md:text-3xl font-bold text-black mb-3">
              Detroit&apos;s waterfront event venue since 1958
            </h2>
            <p className="text-muted text-sm md:text-base leading-relaxed mb-4">
              The Roostertail sits on the Detroit River with panoramic waterfront views that have hosted over 10,000 celebrations. From weddings to corporate galas, proms to birthday parties, we bring your vision to life.
            </p>
            <p className="text-muted text-sm md:text-base leading-relaxed">
              Our dedicated venue coordinators and professional staff support you through the entire planning process. That&apos;s why organizations and families across Michigan choose us year after year.
            </p>
          </div>
        </div>
      </section>

      {/* ===== FAQ ===== */}
      <section className="bg-white py-12 md:py-16 px-6">
        <div className="section-inner md:max-w-2xl md:mx-auto">
          <p className="text-accent text-xs font-semibold tracking-widest uppercase mb-3 md:text-center">
            Common questions
          </p>
          <h2 className="font-display text-2xl md:text-3xl font-bold text-black mb-6 md:text-center">
            Frequently Asked Questions
          </h2>
          {faqs.map((faq) => (
            <FAQItem key={faq.q} q={faq.q} a={faq.a} />
          ))}
        </div>
      </section>

      {/* ===== FINAL CTA ===== */}
      <section className="bg-light-gray py-12 md:py-16 px-6 text-center">
        <div className="section-inner">
          <div className="flex justify-center mb-3">
            <FiveStars size={24} />
          </div>
          <h2 className="font-display text-2xl md:text-3xl font-bold text-black mb-2">
            Ready to plan your event?
          </h2>
          <p className="text-muted text-sm mb-6">
            Choose your event type and we&apos;ll connect you with a coordinator.
          </p>

          <div className="flex flex-col md:flex-row md:flex-wrap md:justify-center gap-2 md:gap-3 max-w-md md:max-w-3xl mx-auto w-full">
            {eventTypeCards.map((card) => (
              <Link
                key={card.slug}
                href={`/${card.slug}`}
                className="w-full md:w-auto md:px-8 rounded-2xl bg-blue py-3.5 text-white text-sm font-semibold hover:bg-blue-dark active:scale-[0.97] transition-all block text-center"
              >
                {card.label} &rarr;
              </Link>
            ))}
          </div>

          <p className="text-muted text-xs mt-6">
            The Roostertail &middot; 100 Marquette Dr, Detroit, MI 48214
          </p>
        </div>
      </section>
    </div>
  )
}

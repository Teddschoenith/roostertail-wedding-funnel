'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import SlideWrapper from '@/components/funnel/SlideWrapper'
import { useFunnelStore } from '@/lib/funnel-store'
import { getHeadlineVariant, getHeadline, type HeadlineVariant } from '@/lib/ab-test'
import FAQ from '@/components/funnel/FAQ'

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.12, duration: 0.5, ease: 'easeOut' as const },
  }),
}

/* Google-style detailed star SVG */
function StarIcon({ size = 20, className = '' }: { size?: number; className?: string }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <defs>
        <linearGradient id="starGold" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FFD700" />
          <stop offset="50%" stopColor="#FFC107" />
          <stop offset="100%" stopColor="#FFB300" />
        </linearGradient>
      </defs>
      <path
        d="M12 2L14.944 8.856L22 9.644L16.8 14.544L18.18 22L12 18.28L5.82 22L7.2 14.544L2 9.644L9.056 8.856L12 2Z"
        fill="url(#starGold)"
        stroke="#E6A800"
        strokeWidth="0.5"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function FiveStars({ size = 20 }: { size?: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((i) => (
        <StarIcon key={i} size={size} />
      ))}
    </div>
  )
}

export default function S1_Landing() {
  const { goNext, setAnswer } = useFunnelStore()
  const [beenBefore, setBeenBefore] = useState<string | null>(null)
  const [variant, setVariant] = useState<HeadlineVariant>('A')

  useEffect(() => {
    const v = getHeadlineVariant()
    setVariant(v)
    setAnswer('headlineVariant', v)
  }, [])

  return (
    <SlideWrapper>
      {/* ===== HERO ===== */}
      <section className="min-h-[100dvh] flex flex-col justify-center px-6 py-12 bg-white">
        <motion.p
          custom={0} variants={fadeUp} initial="hidden" animate="visible"
          className="text-accent text-xs font-semibold tracking-widest uppercase mb-4 text-center"
        >
          Detroit&apos;s Waterfront Venue &middot; Est. 1958
        </motion.p>

        <motion.h1
          custom={1} variants={fadeUp} initial="hidden" animate="visible"
          className="font-display text-[2rem] leading-[1.15] font-bold text-black mb-6 text-center"
        >
          {getHeadline(variant)}
        </motion.h1>

        <motion.p
          custom={2} variants={fadeUp} initial="hidden" animate="visible"
          className="text-black font-semibold text-lg mb-4 text-center"
        >
          Have you ever been to a Roostertail wedding?
        </motion.p>

        <motion.div custom={3} variants={fadeUp} initial="hidden" animate="visible">
          <div className="flex gap-3">
            {[
              { label: 'Yes!', img: '/images/champagne-tower-bride-pouring.webp' },
              { label: 'Not yet', img: '/images/couple-dock-waterfront-golden-hour.webp' },
            ].map((opt) => (
              <button
                key={opt.label}
                onClick={() => {
                  setBeenBefore(opt.label)
                  setAnswer('beenBefore', opt.label)
                  setTimeout(goNext, 400)
                }}
                className={`
                  flex-1 overflow-hidden rounded-2xl
                  active:scale-[0.97] transition-all
                  ${beenBefore === opt.label
                    ? 'ring-3 ring-blue ring-offset-2 shadow-lg'
                    : 'shadow-sm'
                  }
                `}
              >
                <img
                  src={opt.img}
                  alt={opt.label}
                  className="w-full aspect-[3/4] object-cover"
                />
                <div className="py-3 px-3 text-center font-bold text-base bg-blue text-white">
                  {opt.label}
                </div>
              </button>
            ))}
          </div>
        </motion.div>
      </section>

      {/* ===== SOCIAL PROOF BAR ===== */}
      <section className="bg-light-gray py-10 px-6 text-center">
        <div className="flex justify-center mb-3">
          <FiveStars size={28} />
        </div>
        <p className="text-black font-bold text-2xl mb-1">Over 1,000 five-star reviews</p>
        <p className="text-muted text-sm mt-2">
          The only wedding venue in Detroit with this many five-star reviews.
        </p>
      </section>

      {/* ===== WHAT TO EXPECT ===== */}
      <section className="bg-white py-12 px-6">
        <p className="text-accent text-xs font-semibold tracking-widest uppercase mb-3">
          What you get
        </p>
        <h2 className="font-display text-2xl font-bold text-black mb-2">
          What can you expect from The Roostertail?
        </h2>
        <p className="text-muted text-sm mb-8">
          Everything. That&apos;s the point.
        </p>

        <div className="grid grid-cols-2 gap-3">
          {[
            { icon: '🍽️', title: 'Plated or buffet dinner', desc: 'Chef-prepared, your choice' },
            { icon: '🥂', title: 'Full open bar', desc: 'Premium spirits, bartenders included' },
            { icon: '🪑', title: 'Tables, chairs & linens', desc: 'Chiavari chairs, chargers, all of it' },
            { icon: '👔', title: 'Full service staff', desc: 'Setup, service, and breakdown' },
            { icon: '🎶', title: 'Custom LED lighting', desc: 'Set the mood, your colors' },
            { icon: '🅿️', title: 'Free guest parking', desc: 'No shuttles, no stress' },
            { icon: '🌅', title: 'Waterfront access', desc: 'Right on the Detroit River' },
            { icon: '🏡', title: 'Private patio', desc: 'Exclusive outdoor space for your guests' },
            { icon: '📋', title: 'Dedicated coordinator', desc: 'From booking to last dance' },
            { icon: '💍', title: 'Ceremony on-site', desc: 'Indoor or outdoor, weather backup included' },
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
          Real couples
        </p>
        <h2 className="font-display text-2xl font-bold text-black mb-8">
          What couples love about us
        </h2>

        <div className="flex flex-col gap-4">
          {[
            {
              quote: "honestly we visited five other venues and none of them even came close. what we wanted was there, the water, the experience, and the trust that this was going to be the best night of our lives. it was.",
              name: 'Eliane & Paul',
              detail: '',
              img: '/images/couple-dock-waterfront-golden-hour.webp',
            },
            {
              quote: "our coordinator was amazing like she remembered every little detail we told her months ago. the day of we didnt have to think about anything we just showed up and had the best night of our lives",
              name: 'Emma & Emily',
              detail: '',
              img: '/images/outdoor-waterfront-ceremony-aisle.webp',
            },
            {
              quote: "i went into my wedding journey thinking i was going to be super stressed. i was reassured from the moment i got there that stress wasn't an option. so much of the stress in weddings was handled by them. it was my wedding day when i realized i made two of the best decisions of my life.",
              name: 'Lindsey & Ryan',
              detail: '',
              img: '/images/couple-walking-dock-string-lights.webp',
            },
          ].map((t) => (
            <div key={t.name} className="bg-white rounded-2xl overflow-hidden">
              <img src={t.img} alt={t.name} className="w-full aspect-[16/9] object-cover" />
              <div className="p-5">
                <div className="flex items-center mb-3">
                  <FiveStars size={14} />
                </div>
                <p className="text-black/80 text-sm italic leading-relaxed">
                  &ldquo;{t.quote}&rdquo;
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* CTA right after reviews */}
        <button
          onClick={goNext}
          className="w-full rounded-2xl bg-blue py-4 text-white text-base font-semibold active:scale-[0.97] transition-transform mt-8"
        >
          Let&apos;s get you in touch with an event coordinator →
        </button>
        <p className="text-muted text-xs mt-3 text-center">Takes less than 60 seconds</p>
      </section>

      {/* ===== PHOTO GALLERY ===== */}
      <section className="bg-white py-12 px-6">
        <p className="text-accent text-xs font-semibold tracking-widest uppercase mb-3">
          See it for yourself
        </p>
        <h2 className="font-display text-2xl font-bold text-black mb-6">
          Your venue, your vibe
        </h2>

        <div className="grid grid-cols-3 gap-2">
          {[
            { src: '/images/outdoor-waterfront-ceremony-aisle.webp', alt: 'Outdoor waterfront ceremony' },
            { src: '/images/couple-fountain-night-dramatic.webp', alt: 'Couple by the fountain at night' },
            { src: '/images/first-dance-sunset-windows.webp', alt: 'First dance at sunset' },
            { src: '/images/waterfront-tablescape-chiavari-chairs.webp', alt: 'Waterfront tablescape' },
            { src: '/images/led-dance-floor-the-tail-logo.webp', alt: 'LED dance floor' },
            { src: '/images/venue-exterior-night-fountains.webp', alt: 'The Roostertail at night' },
          ].map((photo, i) => (
            <img
              key={photo.src}
              src={photo.src}
              alt={photo.alt}
              className={`w-full object-cover rounded-xl ${i === 0 || i === 5 ? 'col-span-2 aspect-[2/1]' : 'aspect-square'}`}
            />
          ))}
        </div>
      </section>

      {/* ===== ABOUT US ===== */}
      <section className="bg-light-gray py-12 px-6">
        <div className="flex gap-4 mb-6">
          <img
            src="/images/hora-chair-dance-celebration.webp"
            alt="Wedding celebration at The Roostertail"
            className="w-1/2 rounded-2xl object-cover aspect-[3/4]"
          />
          <img
            src="/images/saxophonist-florals-waterfront.webp"
            alt="Live saxophonist among florals at The Roostertail"
            className="w-1/2 rounded-2xl object-cover aspect-[3/4]"
          />
        </div>

        <p className="text-accent text-xs font-semibold tracking-widest uppercase mb-3">
          About us
        </p>
        <h2 className="font-display text-2xl font-bold text-black mb-3">
          Detroit&apos;s waterfront event venue since 1958
        </h2>
        <p className="text-muted text-sm leading-relaxed mb-4">
          The Roostertail sits on the Detroit River with panoramic waterfront views that have hosted over 10,000 celebrations. We&apos;re not just a venue, we&apos;re a full-service wedding production team.
        </p>
        <p className="text-muted text-sm leading-relaxed">
          From the moment you book to the last song of the night, our dedicated coordinator and full staff handle every detail. That&apos;s why couples choose us. No surprises, just a great party.
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
        <FAQ />
      </section>

      {/* ===== FINAL CTA ===== */}
      <section className="bg-light-gray py-12 px-6 text-center">
        <div className="flex justify-center mb-3">
          <FiveStars size={24} />
        </div>
        <p className="text-muted text-xs font-medium mb-6">
          The only wedding venue in Detroit with 1,000+ five-star reviews
        </p>

        <h2 className="font-display text-2xl font-bold text-black mb-3">
          One venue. One price.{'\n'}Nothing else to figure out.
        </h2>
        <p className="text-muted text-sm mb-6">
          Talk to one of our event coordinators and see if we&apos;re the right fit for your day.
        </p>
        <button
          onClick={goNext}
          className="w-full rounded-2xl bg-blue py-4 text-white text-base font-semibold active:scale-[0.97] transition-transform"
        >
          Let&apos;s get you in touch with an event coordinator →
        </button>
      </section>

      {/* ===== FOOTER ===== */}
      <footer className="bg-white py-6 px-6 text-center">
        <p className="text-muted text-xs">The Roostertail &middot; Detroit&apos;s waterfront event venue since 1958</p>
      </footer>
    </SlideWrapper>
  )
}

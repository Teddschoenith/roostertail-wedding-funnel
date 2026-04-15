'use client'

import { useState } from 'react'
import SlideWrapper from '../EventSlideWrapper'
import { useEventFunnelStore } from '@/lib/event-funnel-store'
import type { EventConfig } from '@/lib/event-configs'
import EventFAQ from '../EventFAQ'

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
      <path
        d="M12 2L14.944 8.856L22 9.644L16.8 14.544L18.18 22L12 18.28L5.82 22L7.2 14.544L2 9.644L9.056 8.856L12 2Z"
        fill="url(#starGold)" stroke="#E6A800" strokeWidth="0.5" strokeLinejoin="round"
      />
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

export default function EventLanding({ config }: { config: EventConfig }) {
  const { goNext, setAnswer } = useEventFunnelStore()
  const [beenBefore, setBeenBefore] = useState<string | null>(null)

  return (
    <SlideWrapper>
      {/* HERO */}
      <section className="min-h-[100dvh] flex flex-col justify-center px-6 py-12 bg-white">
        <p className="text-accent text-xs font-semibold tracking-widest uppercase mb-4 text-center">
          {config.heroTagline}
        </p>
        <h1 className="font-display text-[2rem] leading-[1.15] font-bold text-black mb-6 text-center">
          {config.heroHeadline}
        </h1>
        <p className="text-black font-semibold text-lg mb-4 text-center">
          {config.heroQuestion}
        </p>
        <div className="flex gap-3">
          {config.heroOptions.map((opt) => (
            <button
              key={opt.label}
              onClick={() => {
                setBeenBefore(opt.label)
                setAnswer('beenBefore', opt.label)
                setTimeout(goNext, 400)
              }}
              className={`flex-1 overflow-hidden rounded-2xl active:scale-[0.97] transition-all ${beenBefore === opt.label ? 'ring-3 ring-blue ring-offset-2 shadow-lg' : 'shadow-sm'}`}
            >
              <img src={opt.img} alt={opt.label} className="w-full aspect-[3/4] object-cover" />
              <div className="py-3 px-3 text-center font-bold text-base bg-blue text-white">
                {opt.label}
              </div>
            </button>
          ))}
        </div>
      </section>

      {/* SOCIAL PROOF */}
      <section className="bg-light-gray py-10 px-6 text-center">
        <div className="flex justify-center mb-3">
          <FiveStars size={28} />
        </div>
        <p className="text-black font-bold text-2xl mb-1">{config.socialProofText}</p>
        <p className="text-muted text-sm mt-2">{config.socialProofSubtext}</p>
      </section>

      {/* FEATURES */}
      <section className="bg-white py-12 px-6">
        <p className="text-accent text-xs font-semibold tracking-widest uppercase mb-3">What you get</p>
        <h2 className="font-display text-2xl font-bold text-black mb-2">
          What can you expect from The Roostertail?
        </h2>
        <p className="text-muted text-sm mb-8">More is included, so there&apos;s less to manage.</p>
        <div className="grid grid-cols-2 gap-3">
          {config.features.map((item) => (
            <div key={item.title} className="bg-light-gray rounded-xl p-4">
              <span className="text-2xl mb-2 block">{item.icon}</span>
              <p className="font-semibold text-sm text-black">{item.title}</p>
              <p className="text-muted text-xs mt-1">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="bg-light-gray py-12 px-6">
        <p className="text-accent text-xs font-semibold tracking-widest uppercase mb-3">Real events</p>
        <h2 className="font-display text-2xl font-bold text-black mb-8">What people love about us</h2>
        <div className="flex flex-col gap-4">
          {config.testimonials.map((t) => (
            <div key={t.name} className="bg-white rounded-2xl overflow-hidden">
              <img src={t.img} alt={t.name} className="w-full aspect-[16/9] object-cover" loading="lazy" />
              <div className="p-5">
                <div className="flex items-center mb-3"><FiveStars size={14} /></div>
                <p className="text-black/80 text-sm italic leading-relaxed">&ldquo;{t.quote}&rdquo;</p>
                <p className="text-muted text-xs mt-3 font-semibold">{t.name}</p>
              </div>
            </div>
          ))}
        </div>
        <button
          onClick={goNext}
          className="w-full rounded-2xl bg-blue py-4 text-white text-base font-semibold active:scale-[0.97] transition-transform mt-8"
        >
          Let&apos;s get you in touch with an event coordinator &rarr;
        </button>
        <p className="text-muted text-xs mt-3 text-center">Takes less than 60 seconds</p>
      </section>

      {/* GALLERY */}
      <section className="bg-white py-12 px-6">
        <p className="text-accent text-xs font-semibold tracking-widest uppercase mb-3">See it for yourself</p>
        <h2 className="font-display text-2xl font-bold text-black mb-6">Your venue, your vibe</h2>
        <div className="grid grid-cols-3 gap-2">
          {config.gallery.map((photo, i) => (
            <img
              key={photo.src}
              src={photo.src}
              alt={photo.alt}
              className={`w-full object-cover rounded-xl ${i === 0 || i === 5 ? 'col-span-2 aspect-[2/1]' : 'aspect-square'}`}
              loading="lazy"
            />
          ))}
        </div>
      </section>

      {/* ABOUT */}
      <section className="bg-light-gray py-12 px-6">
        <div className="flex gap-4 mb-6">
          {config.aboutImages.map((img, i) => (
            <img key={img} src={img} alt="The Roostertail" className="w-1/2 rounded-2xl object-cover aspect-[3/4]" loading="lazy" />
          ))}
        </div>
        <p className="text-accent text-xs font-semibold tracking-widest uppercase mb-3">About us</p>
        <h2 className="font-display text-2xl font-bold text-black mb-3">{config.aboutHeadline}</h2>
        {config.aboutText.map((text, i) => (
          <p key={i} className="text-muted text-sm leading-relaxed mb-4">{text}</p>
        ))}
      </section>

      {/* FAQ */}
      <section className="bg-white py-12 px-6">
        <p className="text-accent text-xs font-semibold tracking-widest uppercase mb-3">Common questions</p>
        <h2 className="font-display text-2xl font-bold text-black mb-6">Frequently Asked Questions</h2>
        <EventFAQ items={config.faq} />
      </section>

      {/* FINAL CTA */}
      <section className="bg-light-gray py-12 px-6 text-center">
        <div className="flex justify-center mb-3"><FiveStars size={24} /></div>
        <p className="text-muted text-xs font-medium mb-6">Detroit&apos;s waterfront event venue since 1958</p>
        <h2 className="font-display text-2xl font-bold text-black mb-3">{config.ctaText}</h2>
        <p className="text-muted text-sm mb-6">{config.ctaSubtext}</p>
        <button
          onClick={goNext}
          className="w-full rounded-2xl bg-blue py-4 text-white text-base font-semibold active:scale-[0.97] transition-transform"
        >
          Let&apos;s get you in touch with an event coordinator &rarr;
        </button>
      </section>

      {/* FOOTER */}
      <footer className="bg-white py-6 px-6 text-center">
        <p className="text-muted text-xs">The Roostertail &middot; Detroit&apos;s waterfront event venue since 1958</p>
      </footer>
    </SlideWrapper>
  )
}

'use client'

import Link from 'next/link'
import { eventTypeCards } from '@/lib/event-configs'

export default function GetStarted() {
  return (
    <div className="bg-white min-h-dvh">
      <section className="flex flex-col justify-center px-5 py-10 md:py-20 min-h-dvh md:[min-height:auto]">
        <div className="section-inner">
          <p className="text-accent text-xs md:text-sm font-semibold tracking-widest uppercase mb-3 md:mb-4 text-center">
            Let&apos;s get you to the right coordinator
          </p>
          <h1 className="font-display text-[2rem] md:text-5xl leading-[1.15] font-bold text-black mb-2 md:mb-3 text-center">
            What type of event are you looking for?
          </h1>
          <p className="text-muted text-sm md:text-base mb-6 md:mb-10 text-center">
            Pick your event type and we&apos;ll connect you with the right person.
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
    </div>
  )
}

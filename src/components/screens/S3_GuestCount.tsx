'use client'

import SlideWrapper from '@/components/funnel/SlideWrapper'
import { useFunnelStore } from '@/lib/funnel-store'

const options = [
  { label: 'Under 100', icon: '👫', img: '/images/couple-patio-cocktails-purple-fountain.webp' },
  { label: '100–200', icon: '🎉', img: '/images/first-dance-ballroom-crowd.webp' },
  { label: '200–350', icon: '🥂', img: '/images/dance-floor-packed-party-waterfront.webp' },
  { label: '350+', icon: '✨', img: '/images/guests-packed-ballroom-event.webp' },
]

export default function S3_GuestCount() {
  const { answers, setAnswer, goNext } = useFunnelStore()

  const handleSelect = (value: string) => {
    setAnswer('guestCount', value)
    setTimeout(goNext, 350)
  }

  return (
    <SlideWrapper>
      <div className="flex flex-col justify-center min-h-[100dvh] px-6 pt-16 pb-12 bg-white">
        <h2 className="font-display text-3xl font-bold text-black mb-2">
          How big is the party?
        </h2>
        <p className="text-muted text-sm mb-8">
          Helps us recommend the right setup
        </p>

        <div className="grid grid-cols-2 gap-3">
          {options.map((opt) => (
            <button
              key={opt.label}
              onClick={() => handleSelect(opt.label)}
              className={`
                overflow-hidden rounded-2xl border-2 text-left
                active:scale-[0.97] transition-all
                ${answers.guestCount === opt.label
                  ? 'border-blue shadow-md'
                  : 'border-border'
                }
              `}
            >
              <img src={opt.img} alt={opt.label} className="w-full aspect-[16/10] object-cover" />
              <div className="p-3 bg-white">
                <p className="font-semibold text-sm text-black">
                  {opt.icon} {opt.label}
                </p>
              </div>
            </button>
          ))}
        </div>
      </div>
    </SlideWrapper>
  )
}

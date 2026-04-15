'use client'

import SlideWrapper from '../EventSlideWrapper'
import { useEventFunnelStore } from '@/lib/event-funnel-store'
import type { EventConfig } from '@/lib/event-configs'

export default function EventGuestCount({ config }: { config: EventConfig }) {
  const { answers, setAnswer, goNext } = useEventFunnelStore()

  const handleSelect = (value: string) => {
    setAnswer('guestCount', value)
    setTimeout(goNext, 350)
  }

  return (
    <SlideWrapper>
      <div className="flex flex-col justify-center min-h-[100dvh] px-6 pt-16 pb-12 bg-white stagger md:max-w-[540px] md:mx-auto md:border-x md:border-border">
        <h2 className="font-display text-3xl font-bold text-black mb-2">
          {config.guestCountHeadline}
        </h2>
        <p className="text-blue text-sm font-medium mb-8">
          {config.guestCountSubtext}
        </p>

        <div className="grid grid-cols-2 gap-3">
          {config.guestCountOptions.map((opt) => (
            <button
              key={opt.label}
              onClick={() => handleSelect(opt.label)}
              className={`overflow-hidden rounded-2xl text-left shadow-sm active:scale-[0.97] transition-all ${answers.guestCount === opt.label ? 'ring-2 ring-blue ring-offset-2 shadow-md' : ''}`}
            >
              <img src={opt.img} alt={opt.label} className="w-full aspect-[16/10] object-cover" />
              <div className="py-3 px-3 bg-blue">
                <p className="font-bold text-sm text-white">{opt.icon} {opt.label}</p>
              </div>
            </button>
          ))}
        </div>
      </div>
    </SlideWrapper>
  )
}

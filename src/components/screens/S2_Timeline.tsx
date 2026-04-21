'use client'

import SlideWrapper from '@/components/funnel/SlideWrapper'
import { useFunnelStore } from '@/lib/funnel-store'

const options = [
  { label: 'This week', icon: '🔥', img: '/images/couple-entrance-sunglasses-fun.webp' },
  { label: 'This month', icon: '📅', img: '/images/first-dance-sunset-windows.webp' },
  { label: 'Next couple months', icon: '☀️', img: '/images/outdoor-waterfront-ceremony-aisle.webp' },
  { label: 'Sometime this year', icon: '💭', img: '/images/reception-decor-purple-cherry-blossoms.webp' },
]

export default function S2_Timeline() {
  const { answers, setAnswer, goNext } = useFunnelStore()

  const handleSelect = (value: string) => {
    setAnswer('timeline', value)
    setTimeout(goNext, 350)
  }

  return (
    <SlideWrapper>
      <div className="flex flex-col justify-center min-h-[100dvh] px-6 pt-16 pb-12 bg-white stagger md:max-w-xl md:mx-auto md:w-full">
        <h2 className="font-display text-3xl font-bold text-black mb-2">
          When are you looking to finalize your venue?
        </h2>
        <p className="text-blue text-sm font-medium mb-8">
          Pick one and we&apos;ll take it from there
        </p>

        <div className="grid grid-cols-2 gap-3">
          {options.map((opt) => (
            <button
              key={opt.label}
              onClick={() => handleSelect(opt.label)}
              className={`
                overflow-hidden rounded-2xl text-left shadow-sm
                active:scale-[0.97] transition-all
                ${answers.timeline === opt.label
                  ? 'ring-2 ring-blue ring-offset-2 shadow-md'
                  : ''
                }
              `}
            >
              <img src={opt.img} alt={opt.label} className="w-full aspect-[16/10] object-cover" />
              <div className="py-3 px-3 bg-blue">
                <p className="font-bold text-sm text-white">
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

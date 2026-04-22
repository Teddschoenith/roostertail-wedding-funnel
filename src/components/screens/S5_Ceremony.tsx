'use client'

import SlideWrapper from '@/components/funnel/SlideWrapper'
import { useFunnelStore } from '@/lib/funnel-store'

const options = [
  { label: 'Yes', value: 'Yes', icon: '💍' },
  { label: 'No', value: 'No', icon: '🎉' },
  { label: 'Not sure yet', value: 'Not sure yet', icon: '🤔' },
]

export default function S5_Ceremony() {
  const { answers, setAnswer, goNext } = useFunnelStore()

  const handleSelect = (value: string) => {
    setAnswer('ceremonyOnSite', value)
    setTimeout(goNext, 350)
  }

  return (
    <SlideWrapper>
      <div className="flex flex-col justify-center min-h-[100dvh] px-6 pt-16 pb-12 bg-white stagger md:max-w-xl md:mx-auto md:w-full">
        <div className="w-full aspect-[4/3] rounded-2xl overflow-hidden mb-6 shadow-sm">
          <img
            src="/images/outdoor-waterfront-ceremony-aisle.webp"
            alt="Waterfront ceremony"
            className="w-full h-full object-cover"
          />
        </div>

        <h2 className="font-display text-3xl font-bold text-black mb-2">
          Are you having your ceremony on site?
        </h2>
        <p className="text-blue text-sm font-medium mb-8">
          Our waterfront aisle is a favorite
        </p>

        <div className="flex flex-col gap-3">
          {options.map((opt) => (
            <button
              key={opt.value}
              onClick={() => handleSelect(opt.value)}
              className={`
                w-full rounded-2xl py-4 px-5 text-left font-bold text-base
                bg-blue text-white shadow-sm
                active:scale-[0.97] transition-all
                ${answers.ceremonyOnSite === opt.value
                  ? 'ring-2 ring-blue ring-offset-2 shadow-md'
                  : ''
                }
              `}
            >
              <span className="mr-2">{opt.icon}</span> {opt.label}
            </button>
          ))}
        </div>
      </div>
    </SlideWrapper>
  )
}

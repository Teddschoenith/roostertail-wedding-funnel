'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import SlideWrapper from '../EventSlideWrapper'
import { useEventFunnelStore } from '@/lib/event-funnel-store'
import type { EventConfig } from '@/lib/event-configs'

function Confetti() {
  const [particles] = useState(() =>
    Array.from({ length: 40 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      delay: Math.random() * 2,
      duration: 2 + Math.random() * 2,
      size: 6 + Math.random() * 8,
      color: ['#C9A96E', '#1a1a1a', '#E5E7EB', '#D4BA8A', '#F59E0B'][Math.floor(Math.random() * 5)],
    }))
  )

  return (
    <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
      {particles.map((p) => (
        <motion.div
          key={p.id}
          initial={{ y: -20, x: `${p.x}vw`, opacity: 1, rotate: 0 }}
          animate={{ y: '100vh', opacity: 0, rotate: 360 }}
          transition={{ delay: p.delay, duration: p.duration, ease: 'easeIn' as const }}
          style={{ position: 'absolute', width: p.size, height: p.size, borderRadius: 2, background: p.color }}
        />
      ))}
    </div>
  )
}

export default function EventThankYou({ config }: { config: EventConfig }) {
  const { answers } = useEventFunnelStore()
  const [showConfetti, setShowConfetti] = useState(false)
  const wantsTour = answers.wantsTour === 'yes'

  useEffect(() => {
    setShowConfetti(true)
    const timer = setTimeout(() => setShowConfetti(false), 5000)
    return () => clearTimeout(timer)
  }, [])

  return (
    <SlideWrapper>
      {showConfetti && <Confetti />}

      <div className="flex flex-col items-center justify-center min-h-[100dvh] px-6 py-12 bg-white">
        <div className="w-20 h-20 rounded-full bg-light-gray flex items-center justify-center mb-6">
          <span className="text-4xl">🎉</span>
        </div>

        <h2 className="font-display text-3xl font-bold text-black mb-3 text-center">
          {config.thankYouHeadline}
        </h2>

        <p className="text-muted text-base leading-relaxed mb-10 text-center max-w-sm">
          {wantsTour
            ? "We got your tour request. One of our event coordinators will reach out within 24 hours to confirm your date."
            : config.thankYouText
          }
        </p>

        {config.thankYouCTA && (
          <div className="flex flex-col gap-3 w-full max-w-sm">
            <a
              href={config.thankYouCTA.href}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 rounded-2xl bg-blue text-white px-6 py-4 font-semibold text-sm"
            >
              {config.thankYouCTA.label}
            </a>
          </div>
        )}

        <p className="text-muted text-xs mt-10">
          Detroit&apos;s waterfront event venue since 1958
        </p>
      </div>
    </SlideWrapper>
  )
}

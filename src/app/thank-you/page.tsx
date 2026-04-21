'use client'

import { Suspense, useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { motion } from 'framer-motion'
import { eventConfigs } from '@/lib/event-configs'

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

interface ThankYouView {
  headline: string
  message: string
  cta?: { label: string; href: string }
}

function getView(type: string, wantsTour: boolean): ThankYouView {
  const tourMessage = 'We got your tour request. One of our venue coordinators will reach out within 24 hours to confirm your date.'

  if (type === 'wedding') {
    return {
      headline: "We can't wait to meet you",
      message: wantsTour ? tourMessage : 'One of our venue coordinators will personally reach out within 24 hours.',
      cta: { label: 'View wedding packages →', href: '/wedding-packages.pdf' },
    }
  }

  const config = eventConfigs[type]
  if (config) {
    return {
      headline: config.thankYouHeadline,
      message: wantsTour ? tourMessage : config.thankYouText,
      cta: config.thankYouCTA,
    }
  }

  return {
    headline: 'Thanks for reaching out',
    message: 'One of our venue coordinators will personally reach out within 24 hours.',
  }
}

function ThankYouContent() {
  const searchParams = useSearchParams()
  const type = searchParams.get('type') || 'wedding'
  const wantsTour = searchParams.get('tour') === 'yes'

  const [showConfetti, setShowConfetti] = useState(false)

  useEffect(() => {
    setShowConfetti(true)
    const timer = setTimeout(() => setShowConfetti(false), 5000)
    return () => clearTimeout(timer)
  }, [])

  const view = getView(type, wantsTour)

  return (
    <div className="flex flex-col items-center justify-center min-h-[100dvh] px-6 py-12 bg-white md:max-w-xl md:mx-auto md:w-full">
      {showConfetti && <Confetti />}

      <div className="w-20 h-20 rounded-full bg-light-gray flex items-center justify-center mb-6">
        <span className="text-4xl">🎉</span>
      </div>

      <h2 className="font-display text-3xl font-bold text-black mb-3 text-center">
        {view.headline}
      </h2>

      <p className="text-muted text-base leading-relaxed mb-10 text-center max-w-sm">
        {view.message}
      </p>

      {view.cta && (
        <div className="flex flex-col gap-3 w-full max-w-sm">
          <a
            href={view.cta.href}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 rounded-2xl bg-blue text-white px-6 py-4 font-semibold text-sm"
          >
            {view.cta.label}
          </a>
        </div>
      )}

      <p className="text-muted text-xs mt-10">
        Detroit&apos;s waterfront event venue since 1958
      </p>
    </div>
  )
}

export default function ThankYouPage() {
  return (
    <Suspense fallback={<div className="min-h-[100dvh] bg-white" />}>
      <ThankYouContent />
    </Suspense>
  )
}

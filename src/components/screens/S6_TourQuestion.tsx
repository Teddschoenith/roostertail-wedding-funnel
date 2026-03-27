'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import SlideWrapper from '@/components/funnel/SlideWrapper'
import { useFunnelStore } from '@/lib/funnel-store'

export default function S6_TourQuestion() {
  const { setAnswer, goNext, goToStep } = useFunnelStore()
  const [wantsTour, setWantsTour] = useState<string | null>(null)
  const [tourDate, setTourDate] = useState('')
  const [submitted, setSubmitted] = useState(false)

  const handleNo = () => {
    setWantsTour('no')
    setAnswer('wantsTour', 'no')
    // Skip to thank you (step 7 — the "we'll reach out" version)
    setTimeout(() => goNext(), 400)
  }

  const handleYes = () => {
    setWantsTour('yes')
    setAnswer('wantsTour', 'yes')
  }

  const handleDateSubmit = () => {
    if (!tourDate) return
    setAnswer('tourDate', tourDate)
    setSubmitted(true)
    setTimeout(() => goNext(), 600)
  }

  return (
    <SlideWrapper>
      <div className="flex flex-col justify-center min-h-[100dvh] px-6 pt-16 pb-12 bg-white">
        <AnimatePresence mode="wait">
          {!wantsTour ? (
            /* ===== YES / NO CARDS ===== */
            <motion.div
              key="tour-ask"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, x: -40 }}
              transition={{ duration: 0.3 }}
            >
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="font-display text-3xl font-bold text-black mb-2 text-center"
              >
                Want to come see it in person?
              </motion.h2>
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="text-muted text-sm mb-6 text-center"
              >
                We&apos;d love to show you around
              </motion.p>

              <div className="flex gap-3">
                <motion.button
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  onClick={handleYes}
                  className="flex-1 overflow-hidden rounded-2xl shadow-sm active:scale-[0.97] transition-all"
                >
                  <img
                    src="/images/venue-exterior-night-fountains.webp"
                    alt="The Roostertail venue"
                    className="w-full aspect-[3/4] object-cover"
                  />
                  <div className="py-3 px-3 text-center font-bold text-base bg-blue text-white">
                    Yes!
                  </div>
                </motion.button>
                <motion.button
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  onClick={handleNo}
                  className="flex-1 overflow-hidden rounded-2xl shadow-sm active:scale-[0.97] transition-all"
                >
                  <img
                    src="/images/couple-patio-cocktails-purple-fountain.webp"
                    alt="Just call me"
                    className="w-full aspect-[3/4] object-cover"
                  />
                  <div className="py-3 px-3 text-center font-bold text-base bg-blue text-white">
                    Not yet, just call me
                  </div>
                </motion.button>
              </div>
            </motion.div>
          ) : wantsTour === 'yes' && !submitted ? (
            /* ===== DATE PICKER ===== */
            <motion.div
              key="tour-date"
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -40 }}
              transition={{ duration: 0.3 }}
              className="text-center"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: 'spring', stiffness: 200, damping: 15 }}
                className="w-16 h-16 rounded-full bg-light-gray flex items-center justify-center mb-6 mx-auto"
              >
                <span className="text-3xl">📍</span>
              </motion.div>

              <h2 className="font-display text-2xl font-bold text-black mb-2">
                What&apos;s your preferred date?
              </h2>
              <p className="text-muted text-sm mb-6">
                We&apos;ll see if that works and confirm with you
              </p>

              <input
                type="date"
                value={tourDate}
                onChange={(e) => setTourDate(e.target.value)}
                className="w-full rounded-xl border-2 border-border bg-white px-4 py-4 text-base text-black focus:border-blue focus:outline-none transition-colors mb-4"
              />

              <button
                onClick={handleDateSubmit}
                disabled={!tourDate}
                className="w-full rounded-2xl bg-blue py-4 text-white text-base font-semibold active:scale-[0.97] transition-transform disabled:opacity-40"
              >
                Request this date →
              </button>
            </motion.div>
          ) : (
            /* ===== CONFIRMED ===== */
            <motion.div
              key="tour-confirmed"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center"
            >
              <span className="text-5xl block mb-4">✓</span>
              <p className="font-bold text-lg text-black">Tour requested</p>
              <p className="text-muted text-sm">Taking you to the next step...</p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </SlideWrapper>
  )
}

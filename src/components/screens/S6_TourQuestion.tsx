'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import SlideWrapper from '@/components/funnel/SlideWrapper'
import { useFunnelStore } from '@/lib/funnel-store'

export default function S6_TourQuestion() {
  const { setAnswer } = useFunnelStore()
  const [wantsTour, setWantsTour] = useState<string | null>(null)
  const [tourDate, setTourDate] = useState('')
  const [submitted, setSubmitted] = useState(false)

  const handleNo = () => {
    setWantsTour('no')
    setAnswer('wantsTour', 'no')
    setTimeout(() => {
      window.location.href = '/thank-you?type=wedding&tour=no'
    }, 400)
  }

  const handleYes = () => {
    setWantsTour('yes')
    setAnswer('wantsTour', 'yes')
  }

  const handleDateSubmit = () => {
    if (!tourDate) return
    setAnswer('tourDate', tourDate)
    setSubmitted(true)
    setTimeout(() => {
      window.location.href = '/thank-you?type=wedding&tour=yes'
    }, 600)
  }

  return (
    <SlideWrapper>
      <div className="flex flex-col justify-center min-h-[100dvh] px-6 pt-16 pb-12 bg-white md:max-w-xl md:mx-auto md:w-full">
        <AnimatePresence mode="wait">
          {!wantsTour ? (
            /* ===== YES / NO CARDS ===== */
            <motion.div
              key="tour-ask"
              initial={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.15 }}
              className="stagger"
            >
              <h2 className="font-display text-3xl font-bold text-black mb-2 text-center">
                Want to come see it in person?
              </h2>
              <p className="text-muted text-sm mb-6 text-center">
                We&apos;d love to show you around
              </p>

              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={handleYes}
                  className="overflow-hidden rounded-2xl shadow-sm active:scale-[0.97] transition-all flex flex-col"
                >
                  <img
                    src="/images/venue-exterior-night-fountains.webp"
                    alt="The Roostertail venue"
                    className="w-full aspect-[4/3] object-cover"
                  />
                  <div className="py-3 px-3 text-center font-bold text-base bg-blue text-white flex-1 flex items-center justify-center">
                    Yes, let&apos;s tour!
                  </div>
                </button>
                <button
                  onClick={handleNo}
                  className="overflow-hidden rounded-2xl shadow-sm active:scale-[0.97] transition-all flex flex-col"
                >
                  <img
                    src="/images/couple-patio-cocktails-purple-fountain.webp"
                    alt="Just call me"
                    className="w-full aspect-[4/3] object-cover"
                  />
                  <div className="py-3 px-3 text-center font-bold text-base bg-blue text-white flex-1 flex items-center justify-center">
                    Not yet, just call me
                  </div>
                </button>
              </div>
            </motion.div>
          ) : wantsTour === 'yes' && !submitted ? (
            /* ===== DATE PICKER ===== */
            <motion.div
              key="tour-date"
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="text-center stagger mt-[-15vh]"
            >
              <div className="w-12 h-12 rounded-full bg-light-gray flex items-center justify-center mb-4 mx-auto">
                <span className="text-2xl">📍</span>
              </div>

              <h2 className="font-display text-2xl font-bold text-black mb-2">
                What&apos;s your preferred date?
              </h2>
              <p className="text-blue text-sm font-medium mb-6">
                We&apos;ll see if that works and confirm with you
              </p>

              <div className="max-w-[240px] mx-auto">
                <label className="block text-xs font-medium text-muted mb-1.5 text-left">Tour date</label>
                <input
                  type="date"
                  value={tourDate}
                  onChange={(e) => setTourDate(e.target.value)}
                  className="w-full rounded-xl border border-border bg-white px-4 py-3 text-base text-black focus:border-blue focus:outline-none transition-colors mb-4"
                />

                <button
                  onClick={handleDateSubmit}
                  disabled={!tourDate}
                  className="w-full rounded-2xl bg-blue py-4 text-white text-base font-semibold active:scale-[0.97] transition-transform disabled:opacity-40"
                >
                  Request this date →
                </button>
              </div>
            </motion.div>
          ) : (
            /* ===== CONFIRMED ===== */
            <motion.div
              key="tour-confirmed"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.2 }}
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

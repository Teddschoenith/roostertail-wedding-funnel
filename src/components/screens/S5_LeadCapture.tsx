'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useForm } from 'react-hook-form'
import SlideWrapper from '@/components/funnel/SlideWrapper'
import { useFunnelStore } from '@/lib/funnel-store'
import { trackLeadSubmission } from '@/lib/analytics'

const roles = [
  { label: 'The Bride', img: '/images/role-bride-portrait.webp' },
  { label: 'The Groom', img: '/images/role-groom-groomsmen.webp' },
  { label: 'Wedding Planner', img: '/images/role-planner-signing.webp' },
  { label: 'Mother of the Bride', img: '/images/role-guests-ceremony.webp' },
  { label: 'Other', img: '/images/role-other-baby.webp' },
]

function getFields(role: string): { name: string; partner: string } {
  switch (role) {
    case 'The Bride':
      return { name: 'Your name', partner: "Your partner's name" }
    case 'The Groom':
      return { name: 'Your name', partner: "Your partner's name" }
    case 'Wedding Planner':
      return { name: 'Your name', partner: "Couple's names" }
    case 'Mother of the Bride':
      return { name: 'Your name', partner: "Your daughter's name" }
    default:
      return { name: 'Your name', partner: "Couple's names" }
  }
}

interface FormData {
  yourName: string
  partnerName: string
  email: string
  phone: string
  bestTimeToCall: string
}

export default function S5_LeadCapture() {
  const { answers, setAnswer, goNext, utmParams } = useFunnelStore()
  const [selectedRole, setSelectedRole] = useState<string | null>(answers.role as string || null)
  const [submitting, setSubmitting] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: {
      yourName: answers.yourName || '',
      partnerName: answers.partnerName || '',
      email: answers.email || '',
      phone: answers.phone || '',
      bestTimeToCall: 'No preference',
    },
  })

  const onSubmit = (data: FormData) => {
    setSubmitting(true)
    setAnswer('yourName', data.yourName)
    setAnswer('partnerName', data.partnerName)
    setAnswer('email', data.email)
    setAnswer('phone', data.phone)
    setAnswer('bestTimeToCall', data.bestTimeToCall)

    const payload = {
      ...data,
      role: selectedRole,
      eventType: 'Wedding',
      eventSlug: 'wedding',
      weddingDate: answers.weddingDate,
      timeline: answers.timeline,
      guestCount: answers.guestCount,
      headlineVariant: answers.headlineVariant,
      beenBefore: answers.beenBefore,
      ceremonyOnSite: answers.ceremonyOnSite,
      utmParams,
      submittedAt: new Date().toISOString(),
      userAgent: typeof navigator !== 'undefined' ? navigator.userAgent : '',
    }

    // Fire and forget — don't block the user waiting for the webhook
    fetch('/api/submit-lead', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    }).catch(() => {})
    trackLeadSubmission(payload)

    goNext()
  }

  const fields = selectedRole ? getFields(selectedRole) : null
  const inputClass = 'w-full rounded-xl border-2 border-border bg-white px-4 py-4 text-base text-black placeholder:text-muted/50 focus:border-blue focus:outline-none transition-colors'

  return (
    <SlideWrapper>
      <div className="flex flex-col min-h-[100dvh] px-6 pt-16 pb-12 bg-white md:max-w-xl md:mx-auto md:w-full">
        <AnimatePresence mode="wait">
          {!selectedRole ? (
            /* ===== ROLE SELECTOR — IMAGE CARDS ===== */
            <motion.div
              key="role-picker"
              initial={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.15 }}
              className="stagger"
            >
              <h2 className="font-display text-3xl font-bold text-black mb-2 text-center">
                Who are you?
              </h2>
              <p className="text-muted text-sm mb-6 text-center">
                Helps us personalize your experience
              </p>

              {/* Top row — 2 big cards: Bride + Groom */}
              <div className="grid grid-cols-2 gap-3 mb-3">
                {roles.slice(0, 2).map((role) => (
                  <button
                    key={role.label}
                    onClick={() => {
                      setSelectedRole(role.label)
                      setAnswer('role', role.label)
                    }}
                    className="overflow-hidden rounded-2xl shadow-sm active:scale-[0.97] transition-all"
                  >
                    <img
                      src={role.img}
                      alt={role.label}
                      className="w-full aspect-[3/4] object-cover"
                    />
                    <div className="py-3 px-3 text-center font-bold text-sm bg-blue text-white">
                      {role.label}
                    </div>
                  </button>
                ))}
              </div>

              {/* Bottom row — 3 cards: Planner, Mother, Other */}
              <div className="grid grid-cols-3 gap-3">
                {roles.slice(2).map((role) => (
                  <button
                    key={role.label}
                    onClick={() => {
                      setSelectedRole(role.label)
                      setAnswer('role', role.label)
                    }}
                    className="overflow-hidden rounded-2xl shadow-sm active:scale-[0.97] transition-all flex flex-col bg-blue"
                  >
                    <div className="w-full aspect-[3/4] overflow-hidden">
                      <img
                        src={role.img}
                        alt={role.label}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="py-2.5 px-1 text-center font-bold text-xs text-white leading-tight flex-1 flex items-center justify-center">
                      {role.label}
                    </div>
                  </button>
                ))}
              </div>
            </motion.div>
          ) : (
            /* ===== FORM — after role selected ===== */
            <motion.div
              key="lead-form"
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <h2 className="font-display text-3xl font-bold text-black mb-2">
                Let&apos;s put something together for you
              </h2>
              <p className="text-muted text-sm mb-6">
                Our events team will personally reach out within 24 hours.
              </p>

              <button
                onClick={() => setSelectedRole(null)}
                className="text-sm text-muted mb-5 flex items-center gap-2"
              >
                <img
                  src={roles.find(r => r.label === selectedRole)?.img}
                  alt={selectedRole}
                  className="w-8 h-8 rounded-full object-cover"
                />
                {selectedRole}
                <span className="text-xs text-blue underline">change</span>
              </button>

              <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4" noValidate>
                <div>
                  <label className="block text-xs font-medium text-muted mb-1.5">{fields!.name}</label>
                  <input
                    {...register('yourName', {
                      required: 'Please enter your name',
                      minLength: { value: 2, message: 'Please enter your full name' },
                    })}
                    type="text"
                    placeholder={fields!.name}
                    autoComplete="name"
                    autoCapitalize="words"
                    autoCorrect="off"
                    enterKeyHint="next"
                    className={inputClass}
                  />
                  {errors.yourName && <p className="text-red-500 text-xs mt-1">{errors.yourName.message}</p>}
                </div>

                <div>
                  <label className="block text-xs font-medium text-muted mb-1.5">{fields!.partner}</label>
                  <input
                    {...register('partnerName', {
                      required: 'Please enter this name',
                      minLength: { value: 2, message: 'Please enter the full name' },
                    })}
                    type="text"
                    placeholder={fields!.partner}
                    autoComplete="off"
                    autoCapitalize="words"
                    autoCorrect="off"
                    enterKeyHint="next"
                    className={inputClass}
                  />
                  {errors.partnerName && <p className="text-red-500 text-xs mt-1">{errors.partnerName.message}</p>}
                </div>

                <div>
                  <label className="block text-xs font-medium text-muted mb-1.5">Email</label>
                  <input
                    {...register('email', {
                      required: 'Please enter your email',
                      pattern: {
                        value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                        message: 'Please enter a valid email',
                      },
                    })}
                    type="email"
                    inputMode="email"
                    placeholder="you@example.com"
                    autoComplete="email"
                    autoCapitalize="none"
                    autoCorrect="off"
                    spellCheck={false}
                    enterKeyHint="next"
                    className={inputClass}
                  />
                  {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
                </div>

                <div>
                  <label className="block text-xs font-medium text-muted mb-1.5">Phone</label>
                  <input
                    {...register('phone', {
                      required: 'Please enter your phone number',
                      validate: (val) => {
                        const digits = (val || '').replace(/\D/g, '')
                        return (digits.length >= 10 && digits.length <= 15) || 'Please enter a valid phone number'
                      },
                    })}
                    type="tel"
                    inputMode="tel"
                    placeholder="(555) 123-4567"
                    autoComplete="tel"
                    enterKeyHint="done"
                    className={inputClass}
                  />
                  {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone.message}</p>}
                </div>

                <div>
                  <label className="block text-xs font-medium text-muted mb-1.5">Best time to call</label>
                  <select {...register('bestTimeToCall')} className={`${inputClass} appearance-none`}>
                    <option value="No preference">No preference</option>
                    <option value="Morning">Morning</option>
                    <option value="Afternoon">Afternoon</option>
                    <option value="Evening">Evening</option>
                  </select>
                </div>

                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full rounded-2xl bg-blue py-4 text-white text-base font-semibold mt-2 active:scale-[0.97] transition-transform disabled:opacity-60"
                >
                  {submitting ? 'Sending...' : 'Let\'s get in touch with the coordinator →'}
                </button>
              </form>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </SlideWrapper>
  )
}

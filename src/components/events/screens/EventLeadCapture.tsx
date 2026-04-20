'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useForm } from 'react-hook-form'
import SlideWrapper from '../EventSlideWrapper'
import { useEventFunnelStore } from '@/lib/event-funnel-store'
import { trackMetaEvent, trackGA4Event } from '@/lib/analytics'
import type { EventConfig } from '@/lib/event-configs'

interface FormData {
  yourName: string
  email: string
  phone: string
  companyUrl: string
}

export default function EventLeadCapture({ config }: { config: EventConfig }) {
  const { answers, setAnswer, goNext, utmParams } = useEventFunnelStore()
  const [selectedRole, setSelectedRole] = useState<string | null>((answers.role as string) || null)
  const [submitting, setSubmitting] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: {
      yourName: (answers.yourName as string) || '',
      email: (answers.email as string) || '',
      phone: (answers.phone as string) || '',
      companyUrl: (answers.companyUrl as string) || '',
    },
  })

  const onSubmit = (data: FormData) => {
    setSubmitting(true)
    setAnswer('yourName', data.yourName)
    setAnswer('email', data.email)
    setAnswer('phone', data.phone)
    if (data.companyUrl) setAnswer('companyUrl', data.companyUrl)

    const payload = {
      ...data,
      role: selectedRole,
      eventType: config.eventType,
      eventSlug: config.slug,
      timeline: answers.timeline,
      preferredDate: answers.preferredDate,
      guestCount: answers.guestCount,
      beenBefore: answers.beenBefore,
      ...Object.fromEntries(
        config.detailFields.map(f => [f.key, answers[f.key]])
      ),
      utmParams,
      submittedAt: new Date().toISOString(),
      userAgent: typeof navigator !== 'undefined' ? navigator.userAgent : '',
    }

    fetch('/api/submit-lead', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    }).catch(() => {})

    trackMetaEvent('Lead', { content_name: config.analyticsEventName, ...payload })
    trackGA4Event('generate_lead', { method: config.analyticsEventName, ...payload })

    goNext()
  }

  const inputClass = 'w-full rounded-xl border-2 border-border bg-white px-4 py-4 text-base text-black placeholder:text-muted/50 focus:border-blue focus:outline-none transition-colors'

  return (
    <SlideWrapper>
      <div className="flex flex-col min-h-[100dvh] px-6 pt-16 pb-12 bg-white md:max-w-xl md:mx-auto md:w-full">
        <AnimatePresence mode="wait">
          {!selectedRole ? (
            /* ===== ROLE PICKER ===== */
            <motion.div
              key="role-picker"
              initial={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.15 }}
            >
              <h2 className="font-display text-3xl font-bold text-black mb-2 text-center">
                {config.roleHeadline}
              </h2>
              <p className="text-muted text-sm mb-6 text-center">
                {config.roleSubtext}
              </p>

              <div className="grid grid-cols-2 gap-3">
                {config.roles.map((role) => (
                  <button
                    key={role.label}
                    onClick={() => {
                      setSelectedRole(role.label)
                      setAnswer('role', role.label)
                    }}
                    className="overflow-hidden rounded-2xl shadow-sm active:scale-[0.97] transition-all flex flex-col bg-blue"
                  >
                    <div className="w-full aspect-[4/3] overflow-hidden">
                      <img
                        src={role.img}
                        alt={role.label}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="py-3 px-2 text-center font-bold text-sm text-white leading-tight flex-1 flex items-center justify-center">
                      {role.label}
                    </div>
                  </button>
                ))}
              </div>
            </motion.div>
          ) : (
            /* ===== FORM ===== */
            <motion.div
              key="lead-form"
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <h2 className="font-display text-3xl font-bold text-black mb-2">
                {config.formHeadline}
              </h2>
              <p className="text-muted text-sm mb-6">
                {config.formSubtext}
              </p>

              <button
                onClick={() => setSelectedRole(null)}
                className="text-sm text-muted mb-5 flex items-center gap-2 hover:text-blue transition-colors"
              >
                <img
                  src={config.roles.find(r => r.label === selectedRole)?.img}
                  alt=""
                  className="w-8 h-8 object-cover rounded-full"
                />
                <span>{selectedRole} - change</span>
              </button>

              <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
                <div>
                  <label className="block text-xs font-medium text-muted mb-1.5">Your name</label>
                  <input
                    {...register('yourName', { required: 'Name is required' })}
                    placeholder="Your name"
                    className={inputClass}
                  />
                  {errors.yourName && <p className="text-red-500 text-xs mt-1">{errors.yourName.message}</p>}
                </div>

                <div>
                  <label className="block text-xs font-medium text-muted mb-1.5">Email</label>
                  <input
                    {...register('email', { required: 'Email is required' })}
                    type="email"
                    placeholder="Email"
                    className={inputClass}
                  />
                  {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
                </div>

                <div>
                  <label className="block text-xs font-medium text-muted mb-1.5">Phone</label>
                  <input
                    {...register('phone')}
                    type="tel"
                    placeholder="Phone"
                    className={inputClass}
                  />
                </div>

                {config.showCompanyUrl && (
                  <div>
                    <label className="block text-xs font-medium text-muted mb-1.5">Company website (optional)</label>
                    <input
                      {...register('companyUrl')}
                      type="url"
                      placeholder="Company website (optional)"
                      className={inputClass}
                    />
                  </div>
                )}

                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full rounded-2xl bg-blue py-4 text-white text-base font-semibold mt-2 active:scale-[0.97] transition-transform disabled:opacity-60"
                >
                  {submitting ? 'Sending...' : config.submitText}
                </button>
              </form>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </SlideWrapper>
  )
}

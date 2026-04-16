'use client'

import { useState } from 'react'
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
      <div className="flex flex-col justify-center min-h-[100dvh] px-6 pb-12 bg-white md:max-w-xl md:mx-auto md:w-full">
        <h2 className="font-display text-3xl font-bold text-black mb-2">
          {config.formHeadline}
        </h2>
        <p className="text-muted text-sm mb-6">
          {config.formSubtext}
        </p>

        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-3">
          <div>
            <input
              {...register('yourName', { required: 'Name is required' })}
              placeholder="Your name"
              className={inputClass}
            />
            {errors.yourName && <p className="text-red-500 text-xs mt-1">{errors.yourName.message}</p>}
          </div>

          <div>
            <input
              {...register('email', { required: 'Email is required' })}
              type="email"
              placeholder="Email"
              className={inputClass}
            />
            {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
          </div>

          <div>
            <input
              {...register('phone')}
              type="tel"
              placeholder="Phone"
              className={inputClass}
            />
          </div>

          {config.showCompanyUrl && (
            <div>
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
      </div>
    </SlideWrapper>
  )
}

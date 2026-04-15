'use client'

import { useForm } from 'react-hook-form'
import SlideWrapper from '../EventSlideWrapper'
import { useEventFunnelStore } from '@/lib/event-funnel-store'
import type { EventConfig } from '@/lib/event-configs'

export default function EventDetails({ config }: { config: EventConfig }) {
  const { setAnswer, goNext } = useEventFunnelStore()
  const { register, handleSubmit } = useForm()

  const inputClass = 'w-full rounded-xl border-2 border-border bg-white px-4 py-4 text-base text-black placeholder:text-muted/50 focus:border-blue focus:outline-none transition-colors'

  const onSubmit = (data: Record<string, string>) => {
    Object.entries(data).forEach(([key, value]) => {
      if (value) setAnswer(key, value)
    })
    goNext()
  }

  return (
    <SlideWrapper>
      <div className="flex flex-col justify-center min-h-[100dvh] px-6 pt-16 pb-12 bg-white md:max-w-[540px] md:mx-auto md:border-x md:border-border">
        <h2 className="font-display text-3xl font-bold text-black mb-2">
          {config.detailsHeadline}
        </h2>
        <p className="text-blue text-sm font-medium mb-8">
          {config.detailsSubtext}
        </p>

        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-3">
          {config.detailFields.map((field) => {
            if (field.type === 'select' && field.options) {
              return (
                <div key={field.key}>
                  <select
                    {...register(field.key, { required: field.required })}
                    className={`${inputClass} appearance-none`}
                    defaultValue=""
                  >
                    <option value="" disabled>{field.label}</option>
                    {field.options.map((opt) => (
                      <option key={opt} value={opt}>{opt}</option>
                    ))}
                  </select>
                </div>
              )
            }
            return (
              <div key={field.key}>
                <input
                  {...register(field.key, { required: field.required })}
                  placeholder={field.placeholder || field.label}
                  className={inputClass}
                />
              </div>
            )
          })}

          <button
            type="submit"
            className="w-full rounded-2xl bg-blue py-4 text-white text-base font-semibold mt-2 active:scale-[0.97] transition-transform"
          >
            Continue &rarr;
          </button>
        </form>
      </div>
    </SlideWrapper>
  )
}

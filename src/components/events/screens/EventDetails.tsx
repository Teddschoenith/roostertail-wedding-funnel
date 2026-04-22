'use client'

import { useForm } from 'react-hook-form'
import SlideWrapper from '../EventSlideWrapper'
import { useEventFunnelStore } from '@/lib/event-funnel-store'
import type { EventConfig } from '@/lib/event-configs'

function getInputAttrs(key: string): {
  autoComplete: string
  autoCapitalize: 'none' | 'sentences' | 'words'
  autoCorrect: 'on' | 'off'
  spellCheck: boolean
} {
  const k = key.toLowerCase()
  if (k.includes('company') || k.includes('organization')) {
    return { autoComplete: 'organization', autoCapitalize: 'words', autoCorrect: 'off', spellCheck: false }
  }
  if (k.includes('school')) {
    return { autoComplete: 'organization', autoCapitalize: 'words', autoCorrect: 'off', spellCheck: false }
  }
  if (k.includes('person') || k.includes('name')) {
    return { autoComplete: 'name', autoCapitalize: 'words', autoCorrect: 'off', spellCheck: false }
  }
  return { autoComplete: 'off', autoCapitalize: 'sentences', autoCorrect: 'on', spellCheck: true }
}

export default function EventDetails({ config }: { config: EventConfig }) {
  const { setAnswer, goNext } = useEventFunnelStore()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()

  const inputClass = 'w-full rounded-xl border-2 border-border bg-white px-4 py-4 text-base text-black placeholder:text-muted/50 focus:border-blue focus:outline-none transition-colors'

  const onSubmit = (data: Record<string, string>) => {
    Object.entries(data).forEach(([key, value]) => {
      if (value) setAnswer(key, value)
    })
    goNext()
  }

  return (
    <SlideWrapper>
      <div className="flex flex-col justify-center min-h-[100dvh] px-6 pt-16 pb-12 bg-white md:max-w-xl md:mx-auto md:w-full">
        <h2 className="font-display text-3xl font-bold text-black mb-2">
          {config.detailsHeadline}
        </h2>
        <p className="text-blue text-sm font-medium mb-8">
          {config.detailsSubtext}
        </p>

        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4" noValidate>
          {config.detailFields.map((field) => {
            const err = errors[field.key]
            const errMsg = typeof err?.message === 'string' ? err.message : undefined
            if (field.type === 'select' && field.options) {
              return (
                <div key={field.key}>
                  <label className="block text-xs font-medium text-muted mb-1.5">{field.label}</label>
                  <select
                    {...register(field.key, { required: field.required ? 'Please select an option' : false })}
                    className={`${inputClass} appearance-none`}
                    defaultValue=""
                  >
                    <option value="" disabled>Select one</option>
                    {field.options.map((opt) => (
                      <option key={opt} value={opt}>{opt}</option>
                    ))}
                  </select>
                  {errMsg && <p className="text-red-500 text-xs mt-1">{errMsg}</p>}
                </div>
              )
            }
            if (field.type === 'textarea') {
              return (
                <div key={field.key}>
                  <label className="block text-xs font-medium text-muted mb-1.5">{field.label}</label>
                  <textarea
                    {...register(field.key, {
                      required: field.required ? 'This field is required' : false,
                      minLength: field.required ? { value: 3, message: 'Tell us a bit more' } : undefined,
                    })}
                    placeholder={field.placeholder || field.label}
                    rows={3}
                    autoCapitalize="sentences"
                    autoCorrect="on"
                    enterKeyHint="enter"
                    className={`${inputClass} resize-none`}
                  />
                  {errMsg && <p className="text-red-500 text-xs mt-1">{errMsg}</p>}
                </div>
              )
            }
            const attrs = getInputAttrs(field.key)
            return (
              <div key={field.key}>
                <label className="block text-xs font-medium text-muted mb-1.5">{field.label}</label>
                <input
                  {...register(field.key, {
                    required: field.required ? 'This field is required' : false,
                    minLength: field.required ? { value: 2, message: 'Please enter a valid value' } : undefined,
                  })}
                  type="text"
                  placeholder={field.placeholder || field.label}
                  autoComplete={attrs.autoComplete}
                  autoCapitalize={attrs.autoCapitalize}
                  autoCorrect={attrs.autoCorrect}
                  spellCheck={attrs.spellCheck}
                  enterKeyHint="next"
                  className={inputClass}
                />
                {errMsg && <p className="text-red-500 text-xs mt-1">{errMsg}</p>}
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

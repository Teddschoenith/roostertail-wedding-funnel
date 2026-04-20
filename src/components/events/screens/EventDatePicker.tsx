'use client'

import { useState } from 'react'
import SlideWrapper from '../EventSlideWrapper'
import { useEventFunnelStore } from '@/lib/event-funnel-store'
import type { EventConfig } from '@/lib/event-configs'

const months = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
]

function getDaysInMonth(month: number, year: number) {
  return new Date(year, month + 1, 0).getDate()
}

export default function EventDatePicker({ config }: { config: EventConfig }) {
  const { setAnswer, goNext } = useEventFunnelStore()
  const currentYear = new Date().getFullYear()
  const years = [currentYear, currentYear + 1, currentYear + 2]

  const [month, setMonth] = useState('')
  const [day, setDay] = useState('')
  const [year, setYear] = useState('')

  const daysCount = month !== '' && year !== ''
    ? getDaysInMonth(parseInt(month), parseInt(year))
    : 31

  const handleSubmit = () => {
    // Accept partial dates - build the most complete string we can
    let dateStr = 'Flexible'
    if (month && day && year) {
      dateStr = `${months[parseInt(month)]} ${day}, ${year}`
    } else if (month && year) {
      dateStr = `${months[parseInt(month)]} ${year}`
    } else if (day && year) {
      dateStr = `Day ${day}, ${year}`
    } else if (year) {
      dateStr = String(year)
    } else if (month) {
      dateStr = months[parseInt(month)]
    }
    setAnswer('preferredDate', dateStr)
    goNext()
  }

  const selectClass = 'flex-1 rounded-xl border-2 border-border bg-white px-3 py-4 text-base text-black focus:border-blue focus:outline-none transition-colors appearance-none text-center'

  return (
    <SlideWrapper>
      <div className="flex flex-col justify-center min-h-[100dvh] px-6 pb-12 bg-white md:max-w-xl md:mx-auto md:w-full">
        <h2 className="font-display text-3xl font-bold text-black mb-2 text-center">
          Do you have a date in mind?
        </h2>
        <p className="text-muted text-sm mb-8 text-center">
          No worries if you are not sure yet
        </p>

        <div className="flex gap-2 mb-6">
          <div className="flex-1">
            <label className="block text-xs font-medium text-muted mb-1.5 text-center">Month</label>
            <select
              value={month}
              onChange={(e) => setMonth(e.target.value)}
              className={`${selectClass} w-full`}
            >
              <option value="">Month</option>
              {months.map((m, i) => (
                <option key={m} value={i}>{m}</option>
              ))}
            </select>
          </div>

          <div className="flex-1">
            <label className="block text-xs font-medium text-muted mb-1.5 text-center">Day</label>
            <select
              value={day}
              onChange={(e) => setDay(e.target.value)}
              className={`${selectClass} w-full`}
            >
              <option value="">Day</option>
              {Array.from({ length: daysCount }, (_, i) => i + 1).map((d) => (
                <option key={d} value={d}>{d}</option>
              ))}
            </select>
          </div>

          <div className="flex-1">
            <label className="block text-xs font-medium text-muted mb-1.5 text-center">Year</label>
            <select
              value={year}
              onChange={(e) => setYear(e.target.value)}
              className={`${selectClass} w-full`}
            >
              <option value="">Year</option>
              {years.map((y) => (
                <option key={y} value={y}>{y}</option>
              ))}
            </select>
          </div>
        </div>

        <button
          onClick={handleSubmit}
          className="w-full rounded-2xl bg-blue py-4 text-white text-base font-semibold active:scale-[0.97] transition-transform"
        >
          {month && day && year ? 'Continue' : "I'm flexible"}
        </button>

        {!(month && day && year) && (
          <p className="text-muted text-xs mt-3 text-center">
            Tap &quot;I&apos;m flexible&quot; to skip
          </p>
        )}
      </div>
    </SlideWrapper>
  )
}

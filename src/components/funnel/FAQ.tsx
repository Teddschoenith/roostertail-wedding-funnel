'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const faqs = [
  {
    q: 'What is included in the per-person price?',
    a: 'Everything. Plated or buffet dinner, full open bar with bartenders, tax, and gratuity. One number, no add-ons.',
  },
  {
    q: 'Do I need to hire separate vendors for chairs, tables, or linens?',
    a: 'No. Chiavari chairs, tables, linens, chargers, custom LED lighting, and a dedicated event coordinator are all included in the venue rental.',
  },
  {
    q: 'Is parking free for guests?',
    a: 'Yes. Complimentary parking for all guests. No shuttles, no valet fees.',
  },
  {
    q: 'Can I have my ceremony and reception at The Roostertail?',
    a: 'Absolutely. We offer both indoor and outdoor ceremony options with a weather backup plan. Chairs, setup, rehearsal coordination, and aisleway are all included.',
  },
  {
    q: 'How many guests can you accommodate?',
    a: 'We regularly host weddings from 100 to 400+ guests. Our team will recommend the right room configuration for your party size.',
  },
  {
    q: 'What does the event coordinator do?',
    a: 'Your dedicated coordinator handles everything from the day you book to the last dance. Floor plans, vendor timing, day-of logistics, and anything else that comes up.',
  },
]

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(null)

  return (
    <div className="flex flex-col gap-2">
      {faqs.map((faq, i) => (
        <button
          key={i}
          onClick={() => setOpen(open === i ? null : i)}
          className="w-full text-left bg-white rounded-xl p-4 shadow-sm"
        >
          <div className="flex items-center justify-between">
            <p className="font-semibold text-sm text-black pr-4">{faq.q}</p>
            <span className={`text-muted text-xl transition-transform ${open === i ? 'rotate-45' : ''}`}>+</span>
          </div>
          <AnimatePresence>
            {open === i && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="overflow-hidden"
              >
                <p className="text-muted text-sm leading-relaxed mt-3 pt-3 border-t border-border">
                  {faq.a}
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </button>
      ))}
    </div>
  )
}

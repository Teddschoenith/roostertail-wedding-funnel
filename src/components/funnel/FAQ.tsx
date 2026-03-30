'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const faqs = [
  {
    q: 'What is included in the per-person price?',
    a: 'The per-person package includes your meal service (plated or buffet), full open bar with bartenders, tax, and gratuity. Some events may also include additional venue or ceremony-related fees depending on the date, space, and setup.',
  },
  {
    q: 'Do I need to hire separate vendors for chairs, tables, or linens?',
    a: 'No. Chiavari chairs, tables, linens, chargers, and event lighting are all included in the venue rental.',
  },
  {
    q: 'Is parking free for guests?',
    a: 'Yes. Guests have access to convenient on-site self-parking at no additional cost.',
  },
  {
    q: 'Can I have my ceremony and reception at The Roostertail?',
    a: 'Absolutely. We offer both indoor and outdoor ceremony options, plus a weather backup plan. Ceremony setup details and availability can be reviewed with our team based on your package and event needs.',
  },
  {
    q: 'How many guests can you accommodate?',
    a: 'We regularly host weddings from 100 to 400+ guests. Our team will recommend the right room configuration for your party size.',
  },
  {
    q: 'What does the venue coordinator do?',
    a: 'Your venue coordinator helps with venue-related planning, timeline coordination, floor plans, and day-of venue logistics. They\u2019ll work with your vendor team to help keep the day running smoothly.',
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

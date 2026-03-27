'use client'

import { motion } from 'framer-motion'

interface OptionButtonProps {
  label: string
  selected?: boolean
  onClick: () => void
  icon?: string
}

export default function OptionButton({ label, selected, onClick, icon }: OptionButtonProps) {
  return (
    <motion.button
      onClick={onClick}
      whileTap={{ scale: 0.97 }}
      className={`
        w-full rounded-2xl px-6 py-5 text-left text-lg font-medium
        transition-colors duration-200 border-2
        ${selected
          ? 'border-gold bg-gold/10 text-charcoal'
          : 'border-charcoal/10 bg-white text-charcoal hover:border-gold/50'
        }
      `}
    >
      <span className="flex items-center gap-3">
        {icon && <span className="text-2xl">{icon}</span>}
        <span>{label}</span>
        {selected && (
          <motion.span
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="ml-auto text-gold"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="20 6 9 17 4 12" />
            </svg>
          </motion.span>
        )}
      </span>
    </motion.button>
  )
}

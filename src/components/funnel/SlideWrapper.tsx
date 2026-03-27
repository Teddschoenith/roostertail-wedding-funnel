'use client'

import { motion } from 'framer-motion'
import { useFunnelStore } from '@/lib/funnel-store'

interface SlideWrapperProps {
  children: React.ReactNode
  className?: string
}

export default function SlideWrapper({ children, className = '' }: SlideWrapperProps) {
  const { direction } = useFunnelStore()

  return (
    <motion.div
      initial={{ opacity: 0, x: direction > 0 ? 60 : -60 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25, ease: 'easeOut' }}
      className={`absolute inset-0 h-[100dvh] w-full overflow-y-auto scroll-hidden ${className}`}
    >
      {children}
    </motion.div>
  )
}

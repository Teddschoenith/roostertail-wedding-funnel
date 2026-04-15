'use client'

import { motion } from 'framer-motion'
import { useEventFunnelStore } from '@/lib/event-funnel-store'

interface SlideWrapperProps {
  children: React.ReactNode
  className?: string
}

export default function EventSlideWrapper({ children, className = '' }: SlideWrapperProps) {
  const { direction } = useEventFunnelStore()

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.15, ease: 'easeOut' }}
      className={`absolute inset-0 h-[100dvh] w-full overflow-y-auto scroll-hidden ${className}`}
    >
      {children}
    </motion.div>
  )
}

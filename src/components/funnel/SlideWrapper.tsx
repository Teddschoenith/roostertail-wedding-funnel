'use client'

import { motion } from 'framer-motion'
import { useFunnelStore } from '@/lib/funnel-store'

const variants = {
  enter: (direction: number) => ({
    x: direction > 0 ? '100%' : '-100%',
    opacity: 0,
  }),
  center: {
    x: 0,
    opacity: 1,
  },
  exit: (direction: number) => ({
    x: direction > 0 ? '-100%' : '100%',
    opacity: 0,
  }),
}

interface SlideWrapperProps {
  children: React.ReactNode
  className?: string
}

export default function SlideWrapper({ children, className = '' }: SlideWrapperProps) {
  const { direction } = useFunnelStore()

  return (
    <motion.div
      custom={direction}
      variants={variants}
      initial="enter"
      animate="center"
      exit="exit"
      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
      className={`absolute inset-0 h-[100dvh] w-full overflow-y-auto scroll-hidden ${className}`}
    >
      {children}
    </motion.div>
  )
}

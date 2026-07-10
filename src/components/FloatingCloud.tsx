import { motion } from 'framer-motion'
import { Cloud } from 'lucide-react'

interface FloatingCloudProps {
  size?: number
  x: number
  y: number
  delay?: number
  duration?: number
  opacity?: number
}

export function FloatingCloud({ size = 48, x, y, delay = 0, duration = 6, opacity = 0.15 }: FloatingCloudProps) {
  return (
    <motion.div
      className="absolute pointer-events-none"
      style={{ left: `${x}%`, top: `${y}%` }}
      aria-hidden="true"
      initial={{ opacity: 0 }}
      animate={{
        opacity: [0, opacity, opacity, 0],
        x: [0, 30, 0, -30, 0],
        y: [0, -15, 0, 15, 0],
      }}
      transition={{
        duration,
        delay,
        repeat: Infinity,
        ease: 'easeInOut',
      }}
    >
      <Cloud
        size={size}
        className="text-white dark:text-white"
        style={{ opacity }}
      />
    </motion.div>
  )
}

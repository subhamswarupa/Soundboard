import { motion } from 'framer-motion'
import { Sparkles } from 'lucide-react'

const stars = [
  { x: 10, y: 20, size: 16, delay: 0 },
  { x: 85, y: 15, size: 20, delay: 1 },
  { x: 20, y: 70, size: 14, delay: 2 },
  { x: 75, y: 75, size: 18, delay: 0.5 },
  { x: 50, y: 10, size: 12, delay: 1.5 },
  { x: 90, y: 50, size: 16, delay: 2.5 },
  { x: 5, y: 50, size: 14, delay: 0.8 },
  { x: 60, y: 80, size: 20, delay: 1.8 },
]

export function FloatingStars() {
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden" aria-hidden="true">
      {stars.map((star, i) => (
        <motion.div
          key={i}
          className="absolute"
          style={{ left: `${star.x}%`, top: `${star.y}%` }}
          initial={{ opacity: 0, scale: 0 }}
          animate={{
            opacity: [0, 0.6, 0, 0.6, 0],
            scale: [0, 1, 0.5, 1, 0],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 4,
            delay: star.delay,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        >
          <Sparkles size={star.size} className="text-yellow-300 dark:text-yellow-200" style={{ opacity: 0.6 }} />
        </motion.div>
      ))}
    </div>
  )
}

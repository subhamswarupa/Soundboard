import { motion } from 'framer-motion'

interface EqualizerProps {
  isPlaying: boolean
  barCount?: number
  color?: string
  size?: 'sm' | 'md' | 'lg'
}

export function Equalizer({ isPlaying, barCount = 5, color = '#FF6B9D', size = 'md' }: EqualizerProps) {
  const heights = size === 'sm' ? [3, 5, 4, 6, 3] : size === 'lg' ? [6, 12, 9, 14, 7] : [4, 8, 6, 10, 5]
  const gap = size === 'sm' ? 1.5 : size === 'lg' ? 3 : 2

  return (
    <div
      className="flex items-end justify-center"
      style={{ gap, height: size === 'lg' ? 24 : size === 'md' ? 18 : 10 }}
      aria-label={isPlaying ? 'Sound playing' : 'Sound stopped'}
    >
      {Array.from({ length: barCount }).map((_, i) => (
        <motion.div
          key={i}
          className="rounded-full"
          style={{
            width: size === 'sm' ? 2.5 : size === 'lg' ? 5 : 3.5,
            backgroundColor: color,
            minHeight: 2,
          }}
          animate={
            isPlaying
              ? {
                  height: [heights[i], heights[i] * 2.5, heights[i] * 0.5, heights[i] * 2, heights[i]],
                  opacity: [0.6, 1, 0.5, 0.8, 0.6],
                }
              : { height: heights[i], opacity: 0.3 }
          }
          transition={
            isPlaying
              ? {
                  duration: 0.5 + Math.random() * 0.3,
                  repeat: Infinity,
                  ease: 'easeInOut',
                  delay: i * 0.1,
                }
              : { duration: 0.3 }
          }
        />
      ))}
    </div>
  )
}

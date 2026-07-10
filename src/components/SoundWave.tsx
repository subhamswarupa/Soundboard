import { motion } from 'framer-motion'

interface SoundWaveProps {
  isPlaying: boolean
  color?: string
}

export function SoundWave({ isPlaying, color = '#FF6B9D' }: SoundWaveProps) {
  return (
    <div className="flex items-center justify-center gap-[3px] h-8" aria-hidden="true">
      {[1, 2, 3, 4, 5].map((_, i) => (
        <motion.div
          key={i}
          className="w-[3px] rounded-full"
          style={{
            backgroundColor: color,
            minHeight: 4,
            maxHeight: 32,
          }}
          animate={
            isPlaying
              ? {
                  height: [8, 24, 8, 16, 8, 24, 8],
                  opacity: [0.5, 1, 0.5, 0.8, 0.5, 1, 0.5],
                }
              : { height: 8, opacity: 0.2 }
          }
          transition={
            isPlaying
              ? {
                  duration: 0.8,
                  repeat: Infinity,
                  ease: 'easeInOut',
                  delay: i * 0.12,
                }
              : { duration: 0.3 }
          }
        />
      ))}
    </div>
  )
}

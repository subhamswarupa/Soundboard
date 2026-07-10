import { motion } from 'framer-motion'
import { Music } from 'lucide-react'

export function Mascot() {
  return (
    <motion.div
      className="relative select-none"
      aria-label="Soundy the music mascot"
      role="img"
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{ type: 'spring', stiffness: 260, damping: 20 }}
    >
      <motion.div
        className="relative"
        animate={{ y: [0, -8, 0] }}
        transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
      >
        <svg width="100" height="130" viewBox="0 0 100 130" fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Body */}
          <ellipse cx="50" cy="85" rx="30" ry="35" fill="#FF6B9D" />
          <ellipse cx="50" cy="85" rx="28" ry="33" fill="#FF8FB1" />
          {/* Head */}
          <circle cx="50" cy="45" r="28" fill="#FFE4B5" />
          <circle cx="50" cy="45" r="26" fill="#FFEEDD" />
          {/* Eyes */}
          <motion.circle
            cx="38" cy="42" r="6" fill="#333"
            animate={{ scaleY: [1, 0.1, 1] }}
            transition={{ duration: 4, repeat: Infinity, times: [0, 0.1, 0.2] }}
          />
          <motion.circle
            cx="62" cy="42" r="6" fill="#333"
            animate={{ scaleY: [1, 0.1, 1] }}
            transition={{ duration: 4, repeat: Infinity, times: [0, 0.1, 0.2], delay: 0.05 }}
          />
          {/* Eye highlights */}
          <circle cx="36" cy="40" r="2" fill="white" />
          <circle cx="60" cy="40" r="2" fill="white" />
          {/* Blush */}
          <ellipse cx="28" cy="52" rx="6" ry="3" fill="#FFB6C1" opacity="0.6" />
          <ellipse cx="72" cy="52" rx="6" ry="3" fill="#FFB6C1" opacity="0.6" />
          {/* Mouth */}
          <motion.path
            d="M 40 56 Q 50 64 60 56"
            stroke="#333"
            strokeWidth="2.5"
            fill="none"
            strokeLinecap="round"
            animate={{ d: ['M 40 56 Q 50 64 60 56', 'M 40 58 Q 50 68 60 58', 'M 40 56 Q 50 64 60 56'] }}
            transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
          />
          {/* Ears */}
          <ellipse cx="24" cy="28" rx="8" ry="12" fill="#FF8FB1" transform="rotate(-15 24 28)" />
          <ellipse cx="76" cy="28" rx="8" ry="12" fill="#FF8FB1" transform="rotate(15 76 28)" />
          {/* Arms holding music notes */}
          <motion.g
            animate={{ rotate: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          >
            <ellipse cx="20" cy="80" rx="10" ry="6" fill="#FF6B9D" transform="rotate(30 20 80)" />
          </motion.g>
          <motion.g
            animate={{ rotate: [0, -10, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut', delay: 0.2 }}
          >
            <ellipse cx="80" cy="80" rx="10" ry="6" fill="#FF6B9D" transform="rotate(-30 80 80)" />
          </motion.g>
          {/* Feet */}
          <ellipse cx="38" cy="118" rx="10" ry="6" fill="#FF6B9D" />
          <ellipse cx="62" cy="118" rx="10" ry="6" fill="#FF6B9D" />
          {/* Belly pattern */}
          <ellipse cx="50" cy="88" rx="14" ry="16" fill="#FFD1DC" opacity="0.5" />
          <motion.g
            animate={{ rotate: 360 }}
            transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
          >
            <Music size={10} x={45} y={83} color="#FF6B9D" />
          </motion.g>
        </svg>
        {/* Floating music notes */}
        {[0, 1, 2].map(i => (
          <motion.div
            key={i}
            className="absolute"
            style={{
              left: `${i === 0 ? -10 : i === 1 ? 85 : 50}%`,
              top: `${i === 0 ? -5 : i === 1 ? -10 : -15}%`,
            }}
            animate={{
              y: [0, -20, 0],
              opacity: [0, 1, 0],
              x: [0, i === 0 ? -15 : i === 1 ? 15 : 0, 0],
            }}
            transition={{
              duration: 2.5,
              delay: i * 0.8,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          >
            <Music size={14 + i * 4} className="text-pink-400 dark:text-pink-300" />
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  )
}

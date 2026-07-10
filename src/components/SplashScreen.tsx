import { motion, AnimatePresence } from 'framer-motion'
import { Music, Sparkles } from 'lucide-react'
import { Mascot } from './Mascot'

interface SplashScreenProps {
  onFinish: () => void
}

export function SplashScreen({ onFinish }: SplashScreenProps) {
  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-[100] flex flex-col items-center justify-center overflow-hidden"
        initial={{ opacity: 1 }}
        exit={{ opacity: 0, scale: 1.1 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        style={{
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%)',
        }}
      >
        {/* Animated background particles */}
        {Array.from({ length: 20 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full"
            style={{
              width: Math.random() * 6 + 2,
              height: Math.random() * 6 + 2,
              background: 'white',
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -30, 0],
              opacity: [0, 0.8, 0],
              scale: [0, 1, 0],
            }}
            transition={{
              duration: 2 + Math.random() * 2,
              delay: Math.random() * 2,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
        ))}

        <motion.div
          className="flex flex-col items-center gap-6"
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2, type: 'spring', stiffness: 100 }}
        >
          <Mascot />

          <motion.div
            className="text-center"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            <motion.h1
              className="text-5xl md:text-6xl font-bold text-white mb-3 tracking-tight"
              animate={{ textShadow: ['0 0 20px rgba(255,255,255,0.3)', '0 0 40px rgba(255,255,255,0.6)', '0 0 20px rgba(255,255,255,0.3)'] }}
              transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            >
              Soundboard
            </motion.h1>
            <motion.p className="text-white/70 text-lg md:text-xl font-light flex items-center justify-center gap-2">
              <Sparkles size={18} className="text-yellow-300" />
              Your playful audio mixer
              <Sparkles size={18} className="text-yellow-300" />
            </motion.p>
          </motion.div>

          <motion.div
            className="flex items-center gap-2 text-white/50 text-sm mt-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2 }}
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
            >
              <Music size={16} />
            </motion.div>
            <span>Click anywhere to start</span>
            <motion.div
              animate={{ rotate: -360 }}
              transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
            >
              <Music size={16} />
            </motion.div>
          </motion.div>
        </motion.div>

        <motion.div
          className="absolute bottom-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, y: [0, 8, 0] }}
          transition={{ delay: 1.5, y: { duration: 1.5, repeat: Infinity, ease: 'easeInOut' } }}
        >
          <div className="w-6 h-10 rounded-full border-2 border-white/30 flex items-start justify-center p-1.5">
            <motion.div
              className="w-1.5 h-1.5 rounded-full bg-white"
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
            />
          </div>
        </motion.div>

        <motion.button
          className="absolute inset-0 cursor-pointer"
          onClick={onFinish}
          aria-label="Enter Soundboard"
        />
      </motion.div>
    </AnimatePresence>
  )
}

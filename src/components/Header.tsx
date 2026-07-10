import { motion } from 'framer-motion'
import {
  Music, Volume2, VolumeX, Play, Square, Shuffle, Settings, Moon, Sun,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Mascot } from './Mascot'

interface HeaderProps {
  volume: number
  isMuted: boolean
  onVolumeChange: (v: number) => void
  onToggleMute: () => void
  onStopAll: () => void
  onPlayAll: () => void
  onRandom: () => void
  onOpenSettings: () => void
  darkMode: boolean
  onToggleDark: () => void
  isPlaying: boolean
}

export function Header({
  volume, isMuted, onVolumeChange, onToggleMute,
  onStopAll, onPlayAll, onRandom, onOpenSettings,
  darkMode, onToggleDark, isPlaying,
}: HeaderProps) {
  return (
    <motion.header
      className="sticky top-0 z-40 backdrop-blur-xl bg-white/60 dark:bg-gray-900/60 border-b border-white/30 dark:border-white/10"
      initial={{ y: -80 }}
      animate={{ y: 0 }}
      transition={{ type: 'spring', stiffness: 120, damping: 20 }}
    >
      <div className="max-w-7xl mx-auto px-4 py-3">
        <div className="flex items-center justify-between gap-4">
          {/* Logo area */}
          <motion.div
            className="flex items-center gap-2 shrink-0"
            whileHover={{ scale: 1.02 }}
          >
            <div className="w-10 h-10">
              <Mascot />
            </div>
            <div className="hidden sm:block">
              <h1 className="text-lg font-bold bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent leading-tight">
                Soundboard
              </h1>
              <p className="text-[10px] text-gray-400 dark:text-gray-500 leading-tight">Interactive Mixer</p>
            </div>
          </motion.div>

          {/* Controls */}
          <div className="flex items-center gap-2 md:gap-3 flex-wrap justify-end">
            {/* Volume */}
            <div className="flex items-center gap-1.5 bg-white/50 dark:bg-white/5 rounded-full px-3 py-1.5 backdrop-blur-sm">
              <motion.button
                whileTap={{ scale: 0.9 }}
                onClick={onToggleMute}
                className="p-1 rounded-full hover:bg-white/50 dark:hover:bg-white/10 transition-colors"
                aria-label={isMuted ? 'Unmute' : 'Mute'}
              >
                {isMuted || volume === 0 ? <VolumeX size={16} /> : <Volume2 size={16} />}
              </motion.button>
              <input
                type="range"
                min="0"
                max="1"
                step="0.01"
                value={isMuted ? 0 : volume}
                onChange={(e) => onVolumeChange(parseFloat(e.target.value))}
                className="w-20 md:w-24 h-1.5 rounded-full appearance-none cursor-pointer bg-gray-200 dark:bg-gray-700 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3.5 [&::-webkit-slider-thumb]:h-3.5 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-purple-500 [&::-webkit-slider-thumb]:shadow-md"
                aria-label="Volume slider"
              />
            </div>

            {/* Action buttons */}
            <Button variant="glass" size="icon-sm" onClick={onStopAll} aria-label="Stop all sounds">
              <Square size={14} />
            </Button>

            <Button
              variant="glass"
              size="sm"
              onClick={onPlayAll}
              className="hidden md:flex gap-1.5 text-xs"
              aria-label="Play all sounds demo"
            >
              <Play size={12} fill="currentColor" />
              Play All
            </Button>

            <Button variant="glass" size="icon-sm" onClick={onRandom} aria-label="Play random sound">
              <Shuffle size={14} />
            </Button>

            <Button
              variant="glass"
              size="icon-sm"
              onClick={onToggleDark}
              aria-label={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
            >
              {darkMode ? <Sun size={14} /> : <Moon size={14} />}
            </Button>

            <Button variant="glass" size="icon-sm" onClick={onOpenSettings} aria-label="Open settings">
              <Settings size={14} />
            </Button>
          </div>
        </div>
      </div>
    </motion.header>
  )
}

import { motion } from 'framer-motion'
import {
  Play, Square, Heart, Music, Dog, Cat, CloudRain, CloudLightning,
  Waves, Keyboard, Camera, Clapperboard, Smile, Drum,
} from 'lucide-react'
import { Sound } from '@/types'
import { SoundWave } from './SoundWave'
import { cn } from '@/utils/cn'

const iconMap: Record<string, typeof Music> = {
  Bell: Music, Dog, Cat, CloudRain, CloudLightning, Waves, Keyboard,
  Camera: Camera, Clapperboard, Smile, Music, Drum,
}

function getIcon(iconName: string) {
  const Icon = iconMap[iconName]
  return Icon ? <Icon size={28} /> : <Music size={28} />
}

function getCategoryLabel(cat: string): string {
  return cat.charAt(0).toUpperCase() + cat.slice(1)
}

interface SoundCardProps {
  sound: Sound
  isPlaying: boolean
  isFavorite: boolean
  onToggle: () => void
  onFavorite: () => void
  index: number
}

export function SoundCard({ sound, isPlaying, isFavorite, onToggle, onFavorite, index }: SoundCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{
        delay: index * 0.05,
        type: 'spring',
        stiffness: 200,
        damping: 20,
      }}
      whileHover={{ y: -4, scale: 1.02 }}
      className={cn(
        'group relative rounded-2xl border backdrop-blur-sm p-5 cursor-pointer transition-all duration-300',
        'bg-white/70 dark:bg-white/10',
        'border-white/50 dark:border-white/20',
        'shadow-lg hover:shadow-xl',
        isPlaying
          ? 'shadow-xl scale-[1.02]'
          : 'hover:shadow-xl'
      )}
      style={{
        boxShadow: isPlaying
          ? `0 8px 32px ${sound.color}33, 0 0 0 2px ${sound.color}44`
          : undefined,
        borderColor: isPlaying ? sound.color : undefined,
      }}
      onClick={onToggle}
      role="button"
      tabIndex={0}
      aria-label={`${sound.name}. ${isPlaying ? 'Currently playing' : 'Click to play'}. Shortcut key: ${sound.shortcut}`}
      aria-pressed={isPlaying}
      onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); onToggle() } }}
    >
      <div className="flex items-start justify-between mb-3">
        <motion.div
          className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl"
          style={{ backgroundColor: `${sound.color}22` }}
          animate={isPlaying ? { scale: [1, 1.1, 1] } : {}}
          transition={{ duration: 1.5, repeat: isPlaying ? Infinity : 0, ease: 'easeInOut' }}
        >
          {sound.emoji}
        </motion.div>
        <div className="flex gap-1">
          <motion.button
            whileHover={{ scale: 1.15 }}
            whileTap={{ scale: 0.9 }}
            onClick={(e) => { e.stopPropagation(); onFavorite() }}
            className="p-1.5 rounded-full hover:bg-white/50 dark:hover:bg-white/10 transition-colors"
            aria-label={isFavorite ? `Remove ${sound.name} from favorites` : `Add ${sound.name} to favorites`}
          >
            <Heart
              size={16}
              className={cn(
                'transition-colors',
                isFavorite ? 'fill-red-500 text-red-500' : 'text-gray-500 dark:text-gray-400'
              )}
            />
          </motion.button>
        </div>
      </div>

      <div className="mb-2">
        <div className="flex items-center justify-between">
          <h3 className="font-semibold text-sm text-gray-800 dark:text-gray-100">{sound.name}</h3>
          <span className="text-[10px] px-2 py-0.5 rounded-full bg-gray-200/60 dark:bg-white/10 text-gray-600 dark:text-gray-400">
            {sound.shortcut}
          </span>
        </div>
        <p className="text-[11px] text-gray-500 dark:text-gray-400 mt-0.5">{getCategoryLabel(sound.category)}</p>
      </div>

      <div className="flex items-center justify-between">
        <div className="flex gap-1.5">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={(e) => { e.stopPropagation(); onToggle() }}
            className={cn(
              'p-2 rounded-full transition-all duration-200',
              isPlaying
                ? 'bg-red-500 text-white shadow-lg shadow-red-500/30'
                : 'bg-primary text-primary-foreground shadow-lg shadow-primary/25 hover:shadow-primary/40'
            )}
            aria-label={isPlaying ? `Stop ${sound.name}` : `Play ${sound.name}`}
          >
            {isPlaying ? <Square size={14} fill="currentColor" /> : <Play size={14} fill="currentColor" />}
          </motion.button>
        </div>
        <SoundWave isPlaying={isPlaying} color={sound.color} />
      </div>

      {isPlaying && (
        <motion.div
          className="absolute inset-0 rounded-2xl pointer-events-none"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          style={{
            background: `radial-gradient(circle at 50% 50%, ${sound.color}11 0%, transparent 70%)`,
          }}
        />
      )}
    </motion.div>
  )
}

import { useState, useCallback, useMemo } from 'react'
import { motion } from 'framer-motion'
import { SoundCard } from '@/components/SoundCard'
import { SearchBar } from '@/components/SearchBar'
import { CategoryFilter } from '@/components/CategoryFilter'
import { Header } from '@/components/Header'
import { SettingsDrawer } from '@/components/SettingsDrawer'
import { Confetti } from '@/components/Confetti'
import { AnimatedBackground } from '@/components/AnimatedBackground'
import { FloatingCloud } from '@/components/FloatingCloud'
import { FloatingStars } from '@/components/FloatingStars'
import { sounds, searchSounds, getSoundsByCategory } from '@/utils/sounds'
import { Sound, AppSettings, RecentSound } from '@/types'

interface HomeProps {
  settings: AppSettings
  updateSetting: <K extends keyof AppSettings>(key: K, value: AppSettings[K]) => void
  favorites: Set<string>
  toggleFavorite: (id: string) => void
  recentSounds: RecentSound[]
  removeRecent: (id: string) => void
  activeSounds: Record<string, { isPlaying: boolean; startTime: number | null; duration: number }>
  isPlaying: (id: string) => boolean
  play: (id: string) => void
  stop: (id: string) => void
  stopAll: () => void
  playAll: () => void
  playRandom: () => void
  effectiveVolume: number
}

export function Home({
  settings, updateSetting, favorites, toggleFavorite,
  recentSounds, removeRecent, activeSounds, isPlaying,
  play, stop, stopAll, playAll, playRandom, effectiveVolume,
}: HomeProps) {
  const [searchQuery, setSearchQuery] = useState('')
  const [category, setCategory] = useState('all')
  const [settingsOpen, setSettingsOpen] = useState(false)
  const [confettiTrigger, setConfettiTrigger] = useState(0)

  const filteredSounds = useMemo(() => {
    if (searchQuery) return searchSounds(searchQuery)
    return getSoundsByCategory(category)
  }, [searchQuery, category])

  const handlePlayAll = useCallback(() => {
    playAll()
    setConfettiTrigger(prev => prev + 1)
  }, [playAll])

  const favoritesCount = favorites.size

  return (
    <div className="min-h-screen relative">
      <AnimatedBackground />
      <FloatingStars />
      <FloatingCloud x={5} y={15} size={40} delay={0} duration={7} opacity={0.12} />
      <FloatingCloud x={78} y={10} size={56} delay={2} duration={9} opacity={0.1} />
      <FloatingCloud x={85} y={65} size={48} delay={4} duration={8} opacity={0.08} />
      <FloatingCloud x={10} y={75} size={36} delay={1} duration={10} opacity={0.1} />

      <Confetti trigger={confettiTrigger} />

      <Header
        volume={settings.volume}
        isMuted={settings.isMuted}
        onVolumeChange={(v) => updateSetting('volume', v)}
        onToggleMute={() => updateSetting('isMuted', !settings.isMuted)}
        onStopAll={stopAll}
        onPlayAll={handlePlayAll}
        onRandom={playRandom}
        onOpenSettings={() => setSettingsOpen(true)}
        darkMode={settings.darkMode}
        onToggleDark={() => updateSetting('darkMode', !settings.darkMode)}
        isPlaying={Object.values(activeSounds).some(s => s.isPlaying)}
      />

      <SettingsDrawer
        open={settingsOpen}
        onClose={() => setSettingsOpen(false)}
        settings={settings}
        onUpdateSetting={updateSetting}
        recentSounds={recentSounds}
        onClearRecents={() => {
          recentSounds.forEach(r => removeRecent(r.id))
        }}
        favoritesCount={favoritesCount}
        onResetFavorites={() => {
          const allFavorites = Array.from(favorites)
          allFavorites.forEach(id => toggleFavorite(id))
        }}
      />

      <main className="relative z-10 max-w-7xl mx-auto px-4 py-6">
        {/* Controls bar */}
        <motion.div
          className="flex flex-col sm:flex-row sm:items-center gap-3 mb-6"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <SearchBar value={searchQuery} onChange={setSearchQuery} />
          <div className="flex-1 overflow-x-auto pb-1 scrollbar-none">
            <CategoryFilter selected={category} onSelect={setCategory} />
          </div>
        </motion.div>

        {/* Stats bar */}
        <motion.div
          className="flex items-center gap-3 mb-6 text-xs text-gray-500 dark:text-gray-400"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <span>{filteredSounds.length} sound{filteredSounds.length !== 1 ? 's' : ''}</span>
          {favoritesCount > 0 && <span>| {favoritesCount} favorite{favoritesCount !== 1 ? 's' : ''}</span>}
          {recentSounds.length > 0 && <span>| {recentSounds.length} recent</span>}
          <span>| Volume: {Math.round((settings.isMuted ? 0 : settings.volume) * 100)}%</span>
        </motion.div>

        {/* Sound grid */}
        {filteredSounds.length > 0 ? (
          <motion.div
            className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 md:gap-4"
            layout
          >
            {filteredSounds.map((sound, i) => (
              <SoundCard
                key={sound.id}
                sound={sound}
                isPlaying={isPlaying(sound.id)}
                isFavorite={favorites.has(sound.id)}
                onToggle={() => {
                  if (isPlaying(sound.id)) {
                    stop(sound.id)
                  } else {
                    play(sound.id)
                  }
                }}
                onFavorite={() => toggleFavorite(sound.id)}
                index={i}
              />
            ))}
          </motion.div>
        ) : (
          <motion.div
            className="flex flex-col items-center justify-center py-20 text-gray-400 dark:text-gray-500"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <p className="text-5xl mb-4">🔍</p>
            <p className="text-lg font-medium">No sounds found</p>
            <p className="text-sm mt-1">Try a different search or category</p>
          </motion.div>
        )}

        {/* Keyboard shortcuts hint */}
        <motion.div
          className="mt-8 text-center text-xs text-gray-500 dark:text-gray-400"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <p>
            Press keys{' '}
            {['1','2','3','4','5','6','7','8','9','Q','W','E'].map((k, i) => (
              <kbd key={i} className="px-1.5 py-0.5 bg-gray-200/60 dark:bg-white/10 rounded text-[10px] font-mono mx-0.5 text-gray-600 dark:text-gray-400">
                {k}
              </kbd>
            ))}{' '}
            to play sounds
          </p>
        </motion.div>
      </main>
    </div>
  )
}

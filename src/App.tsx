import { useSoundBoard } from '@/hooks/useSoundBoard'
import { SplashScreen } from '@/components/SplashScreen'
import { Home } from '@/pages/Home'
import { AnimatePresence, motion } from 'framer-motion'

export default function App() {
  const {
    settings,
    updateSetting,
    favorites,
    toggleFavorite,
    recentSounds,
    removeRecent,
    activeSounds,
    isPlaying,
    play,
    stop,
    stopAll,
    playAll,
    playRandom,
    showSplash,
    setShowSplash,
    effectiveVolume,
  } = useSoundBoard()

  return (
    <div
      className="min-h-screen transition-colors duration-500"
      style={{
        background: settings.darkMode
          ? 'linear-gradient(135deg, #0f0c29 0%, #1a1a3e 50%, #24243e 100%)'
          : 'linear-gradient(135deg, #f5f7fa 0%, #e8ecf1 50%, #f0e6ef 100%)',
      }}
    >
      <AnimatePresence mode="wait">
        {showSplash ? (
          <SplashScreen key="splash" onFinish={() => setShowSplash(false)} />
        ) : (
          <motion.div
            key="home"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <Home
              settings={settings}
              updateSetting={updateSetting}
              favorites={favorites}
              toggleFavorite={toggleFavorite}
              recentSounds={recentSounds}
              removeRecent={removeRecent}
              activeSounds={activeSounds}
              isPlaying={isPlaying}
              play={play}
              stop={stop}
              stopAll={stopAll}
              playAll={playAll}
              playRandom={playRandom}
              effectiveVolume={effectiveVolume}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

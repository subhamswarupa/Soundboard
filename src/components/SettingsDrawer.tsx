import { motion, AnimatePresence } from 'framer-motion'
import {
  X, Volume2, Sparkles, Moon, Sun, Heart, RotateCcw, Music,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Switch } from '@/components/ui/switch'
import { Slider } from '@/components/ui/slider'
import { AppSettings, RecentSound, Sound } from '@/types'
import { sounds } from '@/utils/sounds'

interface SettingsDrawerProps {
  open: boolean
  onClose: () => void
  settings: AppSettings
  onUpdateSetting: <K extends keyof AppSettings>(key: K, value: AppSettings[K]) => void
  recentSounds: RecentSound[]
  onClearRecents: () => void
  favoritesCount: number
  onResetFavorites: () => void
}

export function SettingsDrawer({
  open, onClose, settings, onUpdateSetting,
  recentSounds, onClearRecents, favoritesCount, onResetFavorites,
}: SettingsDrawerProps) {
  const recentSoundNames = recentSounds
    .slice(0, 10)
    .map(r => sounds.find(s => s.id === r.id))
    .filter(Boolean) as Sound[]

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            className="fixed inset-0 bg-black/30 backdrop-blur-sm z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />
          <motion.div
            className="fixed right-0 top-0 h-full w-80 max-w-[85vw] z-50 shadow-2xl"
            style={{
              background: 'linear-gradient(180deg, #f8f9ff 0%, #fff0f5 50%, #f0f4ff 100%)',
            }}
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            role="dialog"
            aria-label="Settings panel"
          >
            <div className="dark:hidden h-full overflow-y-auto">
              <div className="p-5">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-lg font-bold text-gray-800">Settings</h2>
                  <Button variant="ghost" size="icon" onClick={onClose} aria-label="Close settings">
                    <X size={18} />
                  </Button>
                </div>

                <div className="space-y-6">
                  {/* Volume */}
                  <div>
                    <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                      <Volume2 size={16} />
                      Volume
                    </label>
                    <Slider
                      value={[settings.volume]}
                      onValueChange={([v]) => onUpdateSetting('volume', v)}
                      max={1}
                      step={0.01}
                    />
                    <span className="text-xs text-gray-400 mt-1 block">
                      {Math.round(settings.volume * 100)}%
                    </span>
                  </div>

                  {/* Animations */}
                  <div className="flex items-center justify-between">
                    <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
                      <Sparkles size={16} />
                      Animations
                    </label>
                    <Switch
                      checked={settings.animationsEnabled}
                      onCheckedChange={(v) => onUpdateSetting('animationsEnabled', v)}
                    />
                  </div>

                  {/* Dark mode */}
                  <div className="flex items-center justify-between">
                    <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
                      {settings.darkMode ? <Moon size={16} /> : <Sun size={16} />}
                      Dark Mode
                    </label>
                    <Switch
                      checked={settings.darkMode}
                      onCheckedChange={(v) => onUpdateSetting('darkMode', v)}
                    />
                  </div>

                  {/* Favorites */}
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
                        <Heart size={16} />
                        Favorites
                      </label>
                      {favoritesCount > 0 && (
                        <Button variant="ghost" size="sm" onClick={onResetFavorites} className="text-xs h-7 gap-1">
                          <RotateCcw size={12} />
                          Reset
                        </Button>
                      )}
                    </div>
                    <p className="text-xs text-gray-400">
                      {favoritesCount} sound{favoritesCount !== 1 ? 's' : ''} favorited
                    </p>
                  </div>

                  {/* Recently Played */}
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
                        <Music size={16} />
                        Recently Played
                      </label>
                      {recentSounds.length > 0 && (
                        <Button variant="ghost" size="sm" onClick={onClearRecents} className="text-xs h-7 gap-1">
                          <RotateCcw size={12} />
                          Clear
                        </Button>
                      )}
                    </div>
                    {recentSoundNames.length > 0 ? (
                      <div className="space-y-1">
                        {recentSoundNames.map((s, i) => (
                          <div key={s.id + i} className="flex items-center gap-2 text-xs text-gray-500 bg-white/50 rounded-lg px-3 py-1.5">
                            <span>{s.emoji}</span>
                            <span>{s.name}</span>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="text-xs text-gray-400">No sounds played yet</p>
                    )}
                  </div>

                  {/* Keyboard Shortcuts */}
                  <div>
                    <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                      ⌨️ Shortcuts
                    </label>
                    <div className="grid grid-cols-2 gap-1 text-xs text-gray-500 bg-white/50 rounded-xl p-3">
                      {sounds.map(s => (
                        <div key={s.id} className="flex items-center gap-1.5">
                          <kbd className="px-1.5 py-0.5 bg-gray-100 rounded text-[10px] font-mono min-w-[18px] text-center">
                            {s.shortcut}
                          </kbd>
                          <span>{s.name}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Dark mode version - same content, dark styles */}
            <div className="hidden dark:block h-full overflow-y-auto bg-gray-900 text-gray-100">
              <div className="p-5">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-lg font-bold">Settings</h2>
                  <Button variant="ghost" size="icon" onClick={onClose} aria-label="Close settings" className="text-gray-300">
                    <X size={18} />
                  </Button>
                </div>

                <div className="space-y-6">
                  <div>
                    <label className="flex items-center gap-2 text-sm font-medium text-gray-300 mb-2">
                      <Volume2 size={16} />
                      Volume
                    </label>
                    <Slider
                      value={[settings.volume]}
                      onValueChange={([v]) => onUpdateSetting('volume', v)}
                      max={1}
                      step={0.01}
                    />
                    <span className="text-xs text-gray-500 mt-1 block">
                      {Math.round(settings.volume * 100)}%
                    </span>
                  </div>

                  <div className="flex items-center justify-between">
                    <label className="flex items-center gap-2 text-sm font-medium text-gray-300">
                      <Sparkles size={16} />
                      Animations
                    </label>
                    <Switch
                      checked={settings.animationsEnabled}
                      onCheckedChange={(v) => onUpdateSetting('animationsEnabled', v)}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <label className="flex items-center gap-2 text-sm font-medium text-gray-300">
                      {settings.darkMode ? <Moon size={16} /> : <Sun size={16} />}
                      Dark Mode
                    </label>
                    <Switch
                      checked={settings.darkMode}
                      onCheckedChange={(v) => onUpdateSetting('darkMode', v)}
                    />
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <label className="flex items-center gap-2 text-sm font-medium text-gray-300">
                        <Heart size={16} />
                        Favorites
                      </label>
                      {favoritesCount > 0 && (
                        <Button variant="ghost" size="sm" onClick={onResetFavorites} className="text-xs h-7 gap-1 text-gray-300">
                          <RotateCcw size={12} />
                          Reset
                        </Button>
                      )}
                    </div>
                    <p className="text-xs text-gray-500">
                      {favoritesCount} sound{favoritesCount !== 1 ? 's' : ''} favorited
                    </p>
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <label className="flex items-center gap-2 text-sm font-medium text-gray-300">
                        <Music size={16} />
                        Recently Played
                      </label>
                      {recentSounds.length > 0 && (
                        <Button variant="ghost" size="sm" onClick={onClearRecents} className="text-xs h-7 gap-1 text-gray-300">
                          <RotateCcw size={12} />
                          Clear
                        </Button>
                      )}
                    </div>
                    {recentSoundNames.length > 0 ? (
                      <div className="space-y-1">
                        {recentSoundNames.map((s, i) => (
                          <div key={s.id + i} className="flex items-center gap-2 text-xs text-gray-400 bg-gray-800/50 rounded-lg px-3 py-1.5">
                            <span>{s.emoji}</span>
                            <span>{s.name}</span>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="text-xs text-gray-500">No sounds played yet</p>
                    )}
                  </div>

                  <div>
                    <label className="flex items-center gap-2 text-sm font-medium text-gray-300 mb-2">
                      ⌨️ Shortcuts
                    </label>
                    <div className="grid grid-cols-2 gap-1 text-xs text-gray-400 bg-gray-800/50 rounded-xl p-3">
                      {sounds.map(s => (
                        <div key={s.id} className="flex items-center gap-1.5">
                          <kbd className="px-1.5 py-0.5 bg-gray-700 rounded text-[10px] font-mono min-w-[18px] text-center text-gray-300">
                            {s.shortcut}
                          </kbd>
                          <span>{s.name}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}

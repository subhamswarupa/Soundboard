import { useState, useCallback, useRef, useEffect } from 'react'
import { useLocalStorage } from './useLocalStorage'
import { useKeyboardShortcuts } from './useKeyboardShortcuts'
import { Sound, AppSettings, RecentSound, SoundState } from '@/types'
import { sounds } from '@/utils/sounds'
import { playSound, getSoundDuration } from '@/utils/soundEngine'

export function useSoundBoard() {
  const [settings, setSettings] = useLocalStorage<AppSettings>('soundboard-settings', {
    volume: 0.7,
    isMuted: false,
    animationsEnabled: true,
    darkMode: false,
  })

  const [favorites, setFavorites] = useLocalStorage<string[]>('soundboard-favorites', [])
  const [recentSounds, setRecentSounds] = useLocalStorage<RecentSound[]>('soundboard-recents', [])
  const [activeSounds, setActiveSounds] = useState<Record<string, SoundState>>({})
  const [showSplash, setShowSplash] = useState(true)
  const activeTimeouts = useRef<Map<string, number>>(new Map())

  const effectiveVolume = settings.isMuted ? 0 : settings.volume

  const updateSetting = useCallback(<K extends keyof AppSettings>(key: K, value: AppSettings[K]) => {
    setSettings(prev => ({ ...prev, [key]: value }))
  }, [setSettings])

  const toggleFavorite = useCallback((id: string) => {
    setFavorites(prev =>
      prev.includes(id) ? prev.filter(f => f !== id) : [...prev, id]
    )
  }, [setFavorites])

  const play = useCallback((id: string) => {
    if (activeTimeouts.current.has(id)) {
      clearTimeout(activeTimeouts.current.get(id))
    }
    playSound(id, effectiveVolume)
    const duration = getSoundDuration(id)
    const startTime = Date.now()
    setActiveSounds(prev => ({
      ...prev,
      [id]: { isPlaying: true, startTime, duration },
    }))
    const timeout = window.setTimeout(() => {
      setActiveSounds(prev => ({ ...prev, [id]: { isPlaying: false, startTime: null, duration } }))
      activeTimeouts.current.delete(id)
    }, duration * 1000)
    activeTimeouts.current.set(id, timeout)
    setRecentSounds(prev => {
      const filtered = prev.filter(r => r.id !== id)
      return [{ id, playedAt: Date.now() }, ...filtered].slice(0, 50)
    })
  }, [effectiveVolume, setRecentSounds])

  const stop = useCallback((id: string) => {
    if (activeTimeouts.current.has(id)) {
      clearTimeout(activeTimeouts.current.get(id))
      activeTimeouts.current.delete(id)
    }
    setActiveSounds(prev => ({
      ...prev,
      [id]: { isPlaying: false, startTime: null, duration: prev[id]?.duration ?? 1 },
    }))
  }, [])

  const stopAll = useCallback(() => {
    activeTimeouts.current.forEach(timeout => clearTimeout(timeout))
    activeTimeouts.current.clear()
    setActiveSounds(prev => {
      const next = { ...prev }
      Object.keys(next).forEach(key => {
        next[key] = { ...next[key], isPlaying: false, startTime: null }
      })
      return next
    })
  }, [])

  const playAll = useCallback(async () => {
    for (const s of sounds) {
      play(s.id)
      await new Promise(r => setTimeout(r, 300))
    }
  }, [play])

  const getRandomSound = useCallback(() => {
    const randomIndex = Math.floor(Math.random() * sounds.length)
    return sounds[randomIndex].id
  }, [])

  const playRandom = useCallback(() => {
    const id = getRandomSound()
    play(id)
  }, [getRandomSound, play])

  const removeRecent = useCallback((id: string) => {
    setRecentSounds(prev => prev.filter(r => r.id !== id))
  }, [setRecentSounds])

  const favoritesSet = new Set(favorites)

  const isPlaying = useCallback(
    (id: string) => activeSounds[id]?.isPlaying ?? false,
    [activeSounds]
  )

  const handlePlay = useCallback((id: string) => {
    if (isPlaying(id)) {
      stop(id)
    } else {
      play(id)
    }
  }, [isPlaying, play, stop])

  const onPlay = useCallback((id: string) => {
    play(id)
  }, [play])

  useKeyboardShortcuts(sounds, onPlay)

  useEffect(() => {
    document.documentElement.classList.toggle('dark', settings.darkMode)
  }, [settings.darkMode])

  return {
    settings,
    updateSetting,
    favorites: favoritesSet,
    toggleFavorite,
    recentSounds,
    removeRecent,
    activeSounds,
    isPlaying,
    play: handlePlay,
    stop,
    stopAll,
    playAll,
    playRandom,
    showSplash,
    setShowSplash,
    effectiveVolume,
  }
}

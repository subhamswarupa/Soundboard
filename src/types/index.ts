export interface Sound {
  id: string
  name: string
  emoji: string
  category: SoundCategory
  icon: string
  color: string
  shortcut: string
}

export type SoundCategory =
  | 'animals'
  | 'nature'
  | 'music'
  | 'comedy'
  | 'household'
  | 'effects'

export interface SoundState {
  isPlaying: boolean
  startTime: number | null
  duration: number
}

export interface AppSettings {
  volume: number
  isMuted: boolean
  animationsEnabled: boolean
  darkMode: boolean
}

export interface RecentSound {
  id: string
  playedAt: number
}

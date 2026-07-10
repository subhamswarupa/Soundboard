import { Sound } from '@/types'

export const sounds: Sound[] = [
  { id: 'bell', name: 'Bell', emoji: '🔔', category: 'music', icon: 'Bell', color: '#FFD700', shortcut: '1' },
  { id: 'dog', name: 'Dog Bark', emoji: '🐕', category: 'animals', icon: 'Dog', color: '#FF8C00', shortcut: '2' },
  { id: 'cat', name: 'Cat Meow', emoji: '🐱', category: 'animals', icon: 'Cat', color: '#FF69B4', shortcut: '3' },
  { id: 'rain', name: 'Rain', emoji: '🌧️', category: 'nature', icon: 'CloudRain', color: '#4FC3F7', shortcut: '4' },
  { id: 'thunder', name: 'Thunder', emoji: '⛈️', category: 'nature', icon: 'CloudLightning', color: '#7C4DFF', shortcut: '5' },
  { id: 'ocean', name: 'Ocean', emoji: '🌊', category: 'nature', icon: 'Waves', color: '#00BCD4', shortcut: '6' },
  { id: 'keyboard', name: 'Keyboard', emoji: '⌨️', category: 'household', icon: 'Keyboard', color: '#9E9E9E', shortcut: '7' },
  { id: 'camera', name: 'Camera', emoji: '📷', category: 'household', icon: 'Camera', color: '#607D8B', shortcut: '8' },
  { id: 'applause', name: 'Applause', emoji: '👏', category: 'comedy', icon: 'Clapperboard', color: '#E91E63', shortcut: '9' },
  { id: 'laugh', name: 'Laugh', emoji: '😂', category: 'comedy', icon: 'Smile', color: '#FF9800', shortcut: 'Q' },
  { id: 'whistle', name: 'Whistle', emoji: '🎵', category: 'music', icon: 'Music', color: '#4CAF50', shortcut: 'W' },
  { id: 'drum', name: 'Drum Beat', emoji: '🥁', category: 'music', icon: 'Drum', color: '#AB47BC', shortcut: 'E' },
]

export const categories = [
  { id: 'all', name: 'All', emoji: '🎶' },
  { id: 'animals', name: 'Animals', emoji: '🐾' },
  { id: 'nature', name: 'Nature', emoji: '🌿' },
  { id: 'music', name: 'Music', emoji: '🎵' },
  { id: 'comedy', name: 'Comedy', emoji: '😂' },
  { id: 'household', name: 'Household', emoji: '🏠' },
] as const

export function getSoundsByCategory(category: string): Sound[] {
  if (category === 'all') return sounds
  return sounds.filter(s => s.category === category)
}

export function searchSounds(query: string): Sound[] {
  const q = query.toLowerCase()
  return sounds.filter(
    s => s.name.toLowerCase().includes(q) || s.category.toLowerCase().includes(q)
  )
}

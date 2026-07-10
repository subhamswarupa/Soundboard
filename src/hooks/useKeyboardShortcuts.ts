import { useEffect } from 'react'
import { Sound } from '@/types'

export function useKeyboardShortcuts(
  sounds: Sound[],
  onPlay: (id: string) => void
) {
  useEffect(() => {
    const map: Record<string, string> = {}
    sounds.forEach(s => {
      map[s.shortcut.toLowerCase()] = s.id
    })

    const handler = (e: KeyboardEvent) => {
      if (
        e.target instanceof HTMLInputElement ||
        e.target instanceof HTMLTextAreaElement
      ) return

      const key = e.key.toLowerCase()
      if (map[key]) {
        e.preventDefault()
        onPlay(map[key])
      }
    }

    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [sounds, onPlay])
}

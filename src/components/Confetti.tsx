import { useEffect, useState, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface ConfettiPiece {
  id: number
  x: number
  color: string
  rotation: number
  scale: number
  shape: 'circle' | 'square' | 'triangle'
}

const COLORS = ['#FF6B9D', '#FFD700', '#4FC3F7', '#7C4DFF', '#FF9800', '#4CAF50', '#E91E63', '#00BCD4']

interface ConfettiProps {
  trigger: number
}

export function Confetti({ trigger }: ConfettiProps) {
  const [pieces, setPieces] = useState<ConfettiPiece[]>([])

  const fire = useCallback(() => {
    const newPieces: ConfettiPiece[] = Array.from({ length: 40 }, (_, i) => ({
      id: Date.now() + i,
      x: Math.random() * 100,
      color: COLORS[Math.floor(Math.random() * COLORS.length)],
      rotation: Math.random() * 720,
      scale: Math.random() * 0.5 + 0.5,
      shape: (['circle', 'square', 'triangle'] as const)[Math.floor(Math.random() * 3)],
    }))
    setPieces(prev => [...prev, ...newPieces])
    setTimeout(() => {
      setPieces(prev => prev.filter(p => !newPieces.find(np => np.id === p.id)))
    }, 3000)
  }, [])

  useEffect(() => {
    if (trigger > 0) fire()
  }, [trigger, fire])

  return (
    <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden" aria-hidden="true">
      <AnimatePresence>
        {pieces.map(piece => (
          <motion.div
            key={piece.id}
            className="absolute top-0"
            style={{ left: `${piece.x}%` }}
            initial={{
              y: -20,
              opacity: 1,
              rotate: 0,
              scale: piece.scale,
            }}
            animate={{
              y: '110vh',
              opacity: [1, 1, 0],
              rotate: piece.rotation,
            }}
            exit={{ opacity: 0 }}
            transition={{
              duration: 2.5 + Math.random() * 1.5,
              ease: [0.25, 0.46, 0.45, 0.94],
            }}
          >
            {piece.shape === 'circle' ? (
              <div
                className="rounded-full"
                style={{
                  width: 8,
                  height: 8,
                  backgroundColor: piece.color,
                }}
              />
            ) : piece.shape === 'square' ? (
              <div
                style={{
                  width: 8,
                  height: 8,
                  backgroundColor: piece.color,
                  borderRadius: 1,
                }}
              />
            ) : (
              <div
                style={{
                  width: 0,
                  height: 0,
                  borderLeft: '4px solid transparent',
                  borderRight: '4px solid transparent',
                  borderBottom: `8px solid ${piece.color}`,
                }}
              />
            )}
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  )
}

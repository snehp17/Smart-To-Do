import { useEffect, useState } from 'react'

const COLORS = [
  '#8b5cf6', '#a78bfa', '#c4b5fd', // purples
  '#22c55e', '#4ade80',             // greens
  '#f59e0b', '#fbbf24',             // ambers
  '#ef4444', '#f87171',             // reds
  '#3b82f6', '#60a5fa',             // blues
  '#ec4899', '#f472b6',             // pinks
]

function ConfettiPiece({ delay, left, color, duration }) {
  return (
    <div
      className="confetti-piece"
      style={{
        left: `${left}%`,
        backgroundColor: color,
        animationDelay: `${delay}s`,
        animationDuration: `${duration}s`,
        width: `${Math.random() * 6 + 4}px`,
        height: `${Math.random() * 6 + 4}px`,
        borderRadius: Math.random() > 0.5 ? '50%' : '2px',
        transform: `rotate(${Math.random() * 360}deg)`,
      }}
    />
  )
}

export default function Confetti() {
  const [pieces] = useState(() =>
    Array.from({ length: 50 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      delay: Math.random() * 0.5,
      color: COLORS[Math.floor(Math.random() * COLORS.length)],
      duration: Math.random() * 2 + 2,
    }))
  )

  return (
    <div className="fixed inset-0 pointer-events-none z-[9999]" aria-hidden="true">
      {pieces.map((p) => (
        <ConfettiPiece key={p.id} {...p} />
      ))}
    </div>
  )
}

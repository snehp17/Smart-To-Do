import { useMemo } from 'react'

export default function AnimatedBackground({ progress = 0, isCelebrating = false, isDark = false }) {
  // Determine intensity tier based on completion progress
  const tier = progress >= 100 ? 3 : progress >= 71 ? 2 : progress >= 31 ? 1 : 0

  // Particle counts & checkmark counts based on tier
  const particles = useMemo(() => {
    const count = tier === 0 ? 6 : tier === 1 ? 12 : 18
    return Array.from({ length: count }, (_, i) => ({
      id: i,
      left: `${(i * 17 + 7) % 94}%`,
      top: `${(i * 23 + 11) % 90}%`,
      size: (i % 3) + 2,
      duration: 18 + (i % 5) * 4,
      delay: (i * 1.7) % 8,
    }))
  }, [tier])

  const checkmarks = useMemo(() => {
    const count = tier === 0 ? 2 : tier === 1 ? 4 : 7
    return Array.from({ length: count }, (_, i) => ({
      id: i,
      left: `${(i * 29 + 13) % 90}%`,
      duration: 22 + (i % 4) * 3,
      delay: (i * 2.3) % 10,
      size: 14 + (i % 3) * 2,
    }))
  }, [tier])

  return (
    <div
      className="fixed inset-0 pointer-events-none overflow-hidden z-0 select-none"
      aria-hidden="true"
    >
      {/* 1. Subtle Background Grid Texture */}
      <div
        className={`absolute inset-0 transition-opacity duration-1000 ${
          isDark
            ? 'opacity-[0.035] [background-image:linear-gradient(to_right,#ffffff_1px,transparent_1px),linear-gradient(to_bottom,#ffffff_1px,transparent_1px)]'
            : 'opacity-[0.03] [background-image:linear-gradient(to_right,#000000_1px,transparent_1px),linear-gradient(to_bottom,#000000_1px,transparent_1px)]'
        } [background-size:32px_32px]`}
      />

      {/* 2. Soft Blurred Gradient Blobs */}
      <div
        className={`absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] rounded-full blur-[100px] transition-all duration-1000 animate-blob-1 ${
          isDark
            ? 'bg-gradient-to-br from-amber-600/10 via-amber-900/5 to-transparent'
            : 'bg-gradient-to-br from-amber-300/15 via-orange-200/10 to-transparent'
        }`}
      />
      <div
        className={`absolute bottom-[-10%] right-[-10%] w-[55vw] h-[55vw] rounded-full blur-[120px] transition-all duration-1000 animate-blob-2 ${
          isDark
            ? 'bg-gradient-to-tl from-yellow-700/8 via-amber-950/10 to-transparent'
            : 'bg-gradient-to-tl from-amber-200/20 via-yellow-100/15 to-transparent'
        }`}
      />
      <div
        className={`absolute top-[40%] right-[20%] w-[35vw] h-[35vw] rounded-full blur-[90px] transition-all duration-1000 animate-blob-3 ${
          isDark
            ? 'bg-gradient-to-r from-amber-500/5 to-transparent'
            : 'bg-gradient-to-r from-amber-100/25 to-transparent'
        }`}
      />

      {/* 3. Floating Particles / Ambient Dots */}
      {particles.map((p) => (
        <div
          key={p.id}
          className={`absolute rounded-full transition-opacity duration-1000 animate-float-drift ${
            isDark ? 'bg-amber-300/30 shadow-[0_0_8px_rgba(251,191,36,0.3)]' : 'bg-amber-500/25'
          }`}
          style={{
            left: p.left,
            top: p.top,
            width: `${p.size}px`,
            height: `${p.size}px`,
            animationDuration: `${p.duration}s`,
            animationDelay: `${p.delay}s`,
          }}
        />
      ))}

      {/* 4. Occasional Faint Checkmark Symbols Drifting Upward */}
      {checkmarks.map((c) => (
        <div
          key={c.id}
          className={`absolute animate-drift-up transition-opacity duration-1000 ${
            isDark ? 'text-amber-400/15' : 'text-amber-600/12'
          }`}
          style={{
            left: c.left,
            bottom: '-20px',
            animationDuration: `${c.duration}s`,
            animationDelay: `${c.delay}s`,
          }}
        >
          <svg
            width={c.size}
            height={c.size}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="20 6 9 17 4 12" />
          </svg>
        </div>
      ))}

      {/* 5. 100% Celebratory Radial Glow Burst */}
      {isCelebrating && (
        <div className="absolute inset-0 animate-celebration-burst bg-gradient-radial from-amber-400/20 via-yellow-500/10 to-transparent pointer-events-none" />
      )}
    </div>
  )
}

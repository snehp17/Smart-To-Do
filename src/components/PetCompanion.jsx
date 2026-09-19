import { useState, useEffect } from 'react'
import { DogSVG, CatSVG } from './PetSVG'

export default function PetCompanion({ pet, reaction, isDark, onPetClick, onSwitchPet }) {
  const [animClass, setAnimClass] = useState('animate-pet-breathe')

  useEffect(() => {
    if (!reaction) {
      setAnimClass('animate-pet-breathe')
      return
    }

    if (reaction.type === 'celebrate') {
      setAnimClass('animate-pet-celebrate')
    } else {
      setAnimClass('animate-pet-bounce')
    }

    const timer = setTimeout(() => {
      setAnimClass('animate-pet-breathe')
    }, reaction.type === 'celebrate' ? 2000 : 900)

    return () => clearTimeout(timer)
  }, [reaction])

  const PetComponent = pet === 'cat' ? CatSVG : DogSVG
  const isCelebrating = reaction?.type === 'celebrate'

  return (
    <div className="fixed bottom-5 right-5 sm:bottom-6 sm:right-8 z-40 flex items-end gap-3 pointer-events-auto">
      {/* Mini Pet Toggle Pill */}
      {onSwitchPet && (
        <div
          className="flex items-center gap-1 p-1 rounded-2xl border border-[var(--border-card)] bg-[var(--bg-card)] shadow-xl backdrop-blur-md transition-transform hover:scale-105"
          title="Switch companion pet"
        >
          <button
            onClick={() => onSwitchPet('dog')}
            className={`px-2.5 py-1.5 rounded-xl text-sm transition-all cursor-pointer ${
              pet === 'dog'
                ? 'bg-[var(--brand-tag-bg)] font-bold shadow-xs'
                : 'opacity-50 hover:opacity-100'
            }`}
            aria-label="Dog companion"
          >
            🐶
          </button>
          <button
            onClick={() => onSwitchPet('cat')}
            className={`px-2.5 py-1.5 rounded-xl text-sm transition-all cursor-pointer ${
              pet === 'cat'
                ? 'bg-[var(--brand-tag-bg)] font-bold shadow-xs'
                : 'opacity-50 hover:opacity-100'
            }`}
            aria-label="Cat companion"
          >
            🐱
          </button>
        </div>
      )}

      {/* Pet Interactive Button with Speech Bubble */}
      <div className="relative flex flex-col items-end">
        {/* Speech Bubble */}
        {reaction && (
          <div
            className={`absolute bottom-full mb-3 right-0 animate-bubble-in px-4 py-2.5 rounded-2xl rounded-br-none text-xs sm:text-sm font-bold max-w-[220px] text-center shadow-xl backdrop-blur-md transition-all whitespace-nowrap ${
              isDark
                ? 'bg-neutral-900/95 text-white border border-neutral-700'
                : 'bg-white/95 text-[#2B241E] border border-[#E8DFD5]'
            }`}
          >
            {reaction.message}
          </div>
        )}

        <button
          onClick={onPetClick}
          className={`${animClass} cursor-pointer p-1 rounded-2xl transition-transform hover:scale-110 active:scale-90 focus:outline-none`}
          aria-label={`Your ${pet} companion — click to change`}
          title="Click to customize companion"
        >
          <PetComponent size={68} isCelebrating={isCelebrating} />
        </button>
      </div>
    </div>
  )
}

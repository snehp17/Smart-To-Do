import { X } from 'lucide-react'
import { DogSVG, CatSVG } from './PetSVG'

const pets = [
  { key: 'dog', label: 'Dog', emoji: '🐶', Component: DogSVG },
  { key: 'cat', label: 'Cat', emoji: '🐱', Component: CatSVG },
]

export default function PetSelector({ currentPet, onSelect, onClose, isDark }) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 modal-overlay"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />

      <div
        className={`relative w-full max-w-sm rounded-2xl p-6 animate-scale-in border ${
          isDark ? 'bg-neutral-950 border-neutral-800 text-white' : 'bg-white shadow-2xl border-[#E8DFD5] text-[#2B241E]'
        }`}
        role="dialog"
        aria-label="Choose your companion"
      >
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-lg font-bold text-[#2B241E] dark:text-white">
            Choose Companion
          </h3>
          <button
            onClick={onClose}
            className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
              isDark ? 'hover:bg-neutral-800 text-neutral-400' : 'hover:bg-[#F3EAE0] text-[#74695E]'
            }`}
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <p className={`text-xs mb-5 font-medium ${isDark ? 'text-neutral-400' : 'text-[#74695E]'}`}>
          Your companion stays with you and celebrates every milestone!
        </p>

        <div className="grid grid-cols-2 gap-3">
          {pets.map(({ key, label, emoji, Component }) => {
            const isSelected = currentPet === key
            return (
              <button
                key={key}
                onClick={() => onSelect(key)}
                className={`rounded-2xl p-5 flex flex-col items-center gap-3 transition-all duration-200 border-2 cursor-pointer ${
                  isSelected
                    ? isDark
                      ? 'border-amber-500 bg-amber-500/10'
                      : 'border-[#8B5E34] bg-[#F3EAE0]'
                    : isDark
                    ? 'border-neutral-800 hover:border-neutral-700 bg-neutral-900/50'
                    : 'border-[#E8DFD5] hover:border-[#D6C6B5] bg-[#FAF6F0]'
                }`}
              >
                <Component size={60} isCelebrating={isSelected} />
                <span className={`text-sm font-bold ${isDark ? 'text-white' : 'text-[#2B241E]'}`}>
                  {emoji} {label}
                </span>
                {isSelected && (
                  <span className="text-[10px] font-bold text-[#8B5E34] dark:text-amber-400">
                    Active
                  </span>
                )}
              </button>
            )
          })}
        </div>
      </div>
    </div>
  )
}

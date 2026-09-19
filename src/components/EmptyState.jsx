import { ClipboardList, PartyPopper } from 'lucide-react'
import { DogSVG, CatSVG } from './PetSVG'

export default function EmptyState({ filter, allDone, pet, isDark }) {
  const PetComponent = pet === 'cat' ? CatSVG : DogSVG

  if (allDone && filter !== 'Active') {
    return (
      <div
        className={`rounded-2xl p-8 sm:p-10 text-center animate-scale-in border ${
          isDark
            ? 'bg-neutral-900/95 border-neutral-800 text-white shadow-sm'
            : 'bg-white border-[#E8DFD5] text-[#2B241E] shadow-sm'
        }`}
      >
        <div className="flex justify-center mb-3">
          <div className="animate-pet-bounce">
            <PetComponent size={68} isCelebrating={true} />
          </div>
        </div>
        <div className="flex justify-center mb-2">
          <PartyPopper className={`w-7 h-7 ${isDark ? 'text-amber-400' : 'text-[#8B5E34]'}`} />
        </div>
        <h3 className="text-lg font-bold text-[#2B241E] dark:text-white">
          All done for today! 🎉
        </h3>
        <p className={`mt-1 text-xs sm:text-sm font-medium ${isDark ? 'text-neutral-400' : 'text-[#74695E]'}`}>
          You've cleared your list. Phenomenal work!
        </p>
      </div>
    )
  }

  if (filter === 'Completed') {
    return (
      <div
        className={`rounded-2xl p-8 sm:p-10 text-center animate-scale-in border ${
          isDark
            ? 'bg-neutral-900/95 border-neutral-800 text-white shadow-sm'
            : 'bg-white border-[#E8DFD5] text-[#2B241E] shadow-sm'
        }`}
      >
        <ClipboardList className={`w-9 h-9 mx-auto mb-3 ${isDark ? 'text-neutral-600' : 'text-[#A8988B]'}`} />
        <h3 className="text-base sm:text-lg font-bold text-[#2B241E] dark:text-white">
          No completed tasks yet
        </h3>
        <p className={`mt-1 text-xs sm:text-sm font-medium ${isDark ? 'text-neutral-400' : 'text-[#74695E]'}`}>
          Complete a task and it will show up here.
        </p>
      </div>
    )
  }

  if (filter === 'Active') {
    return (
      <div
        className={`rounded-2xl p-8 sm:p-10 text-center animate-scale-in border ${
          isDark
            ? 'bg-neutral-900/95 border-neutral-800 text-white shadow-sm'
            : 'bg-white border-[#E8DFD5] text-[#2B241E] shadow-sm'
        }`}
      >
        <div className="flex justify-center mb-3">
          <PetComponent size={56} className="animate-pet-breathe" isCelebrating={true} />
        </div>
        <h3 className="text-base sm:text-lg font-bold text-[#2B241E] dark:text-white">
          All caught up! 🎉
        </h3>
        <p className={`mt-1 text-xs sm:text-sm font-medium ${isDark ? 'text-neutral-400' : 'text-[#74695E]'}`}>
          No active tasks remaining. Relax and recharge!
        </p>
      </div>
    )
  }

  // Truly empty
  return (
    <div
      className={`rounded-2xl p-8 sm:p-10 text-center animate-scale-in border ${
        isDark
          ? 'bg-neutral-900/95 border-neutral-800 text-white shadow-sm'
          : 'bg-white border-[#E8DFD5] text-[#2B241E] shadow-sm'
      }`}
    >
      <div className="flex justify-center mb-3">
        <PetComponent size={60} className="animate-pet-breathe" />
      </div>
      <h3 className="text-base sm:text-lg font-bold text-[#2B241E] dark:text-white">
        Nothing planned yet
      </h3>
      <p className={`mt-1 text-xs sm:text-sm font-medium ${isDark ? 'text-neutral-400' : 'text-[#74695E]'}`}>
        Add your first task above and let's get things done.
      </p>
    </div>
  )
}

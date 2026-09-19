import { Check, Sun, Moon, User } from 'lucide-react'

export default function Header({ theme, onToggleTheme }) {
  const isDark = theme === 'dark'

  return (
    <header className="w-full flex items-center justify-between pb-6 border-b border-[var(--border-card)]">
      {/* Brand Logo & Title */}
      <div className="flex items-center gap-3.5">
        <div className="w-12 h-12 rounded-2xl bg-[var(--brand-primary)] flex items-center justify-center text-white shadow-md transition-transform hover:scale-105">
          <Check className="w-6 h-6 stroke-[3]" />
        </div>
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl sm:text-2xl font-black tracking-wider text-[var(--text-main)] uppercase">
              Ticksy
            </h1>
            <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-[var(--brand-tag-bg)] text-[var(--brand-primary)] font-mono">
              v1.2
            </span>
          </div>
          <p className="text-xs sm:text-sm text-[var(--text-sub)] font-medium">
            Plan it. Do it. Check it off.
          </p>
        </div>
      </div>

      {/* Header Actions: Large & Comfortable */}
      <div className="flex items-center gap-3">
        {/* Brightness / Theme Toggle Button */}
        <button
          onClick={onToggleTheme}
          className="w-11 h-11 sm:w-12 sm:h-12 rounded-2xl border border-[var(--border-card)] bg-[var(--bg-card)] text-[var(--text-sub)] hover:text-[var(--text-main)] flex items-center justify-center transition-all cursor-pointer shadow-sm hover:scale-105 active:scale-95"
          aria-label={`Switch to ${isDark ? 'light' : 'dark'} mode`}
          title={`Switch to ${isDark ? 'light' : 'dark'} mode`}
        >
          {isDark ? <Sun className="w-5 h-5 sm:w-6 sm:h-6 text-amber-400" /> : <Moon className="w-5 h-5 sm:w-6 sm:h-6 text-[#74695E]" />}
        </button>

        {/* Ready Status Badge */}
        <div className="hidden sm:flex items-center gap-2.5 px-4 py-2.5 rounded-full text-xs sm:text-sm font-bold border border-[var(--border-card)] bg-[var(--bg-card)] text-[var(--text-sub)] shadow-sm">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
          <span>Ready</span>
        </div>

        {/* User Profile Button */}
        <button
          className="w-11 h-11 sm:w-12 sm:h-12 rounded-2xl border border-[var(--border-card)] bg-[var(--bg-card)] text-[var(--text-sub)] hover:text-[var(--text-main)] flex items-center justify-center transition-all cursor-pointer shadow-sm hover:scale-105 active:scale-95"
          aria-label="User Profile"
          title="User Profile"
        >
          <User className="w-5 h-5 sm:w-6 sm:h-6" />
        </button>
      </div>
    </header>
  )
}

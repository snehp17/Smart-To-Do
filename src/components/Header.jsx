import { Check, Sun, Moon, User } from 'lucide-react'

export default function Header({ theme, onToggleTheme, onOpenProfile, onOpenMetrics }) {
  const isDark = theme === 'dark'

  return (
    <header className="w-full flex items-center justify-between pb-4 border-b border-[var(--border-card)] select-none">
      {/* Brand Logo & Title */}
      <div className="flex items-center gap-3">
        <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-[var(--brand-primary)] flex items-center justify-center text-white shadow-xs transition-transform hover:scale-105">
          <Check className="w-5 h-5 stroke-[2.5]" />
        </div>
        <div>
          <div className="flex items-center gap-1.5">
            <h1 className="text-lg sm:text-xl font-black tracking-wider text-[var(--text-main)] uppercase">
              Ticksy
            </h1>
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[var(--brand-tag-bg)] text-[var(--brand-primary)] font-mono">
              v1.2
            </span>
          </div>
          <p className="text-xs text-[var(--text-sub)] font-medium">
            Plan it. Do it. Check it off.
          </p>
        </div>
      </div>

      {/* Header Actions */}
      <div className="flex items-center gap-2">
        {/* Brightness / Theme Toggle Button */}
        <button
          type="button"
          onClick={onToggleTheme}
          className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl border border-[var(--border-card)] bg-[var(--bg-card)] text-[var(--text-sub)] hover:text-[var(--text-main)] flex items-center justify-center transition-all cursor-pointer shadow-xs hover:scale-105 active:scale-95"
          aria-label={`Switch to ${isDark ? 'light' : 'dark'} mode`}
          title={`Switch to ${isDark ? 'light' : 'dark'} mode`}
        >
          {isDark ? <Sun className="w-4 h-4 sm:w-5 sm:h-5 text-amber-400" /> : <Moon className="w-4 h-4 sm:w-5 sm:h-5 text-[#74695E]" />}
        </button>

        {/* Ready Status Badge */}
        <button
          type="button"
          onClick={onOpenMetrics}
          className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-bold border border-[var(--border-card)] bg-[var(--bg-card)] text-[var(--text-sub)] hover:text-[var(--text-main)] hover:border-[var(--brand-primary)] shadow-xs cursor-pointer transition-all hover:scale-105"
          title="View Productivity Metrics"
        >
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span>Ready</span>
        </button>

        {/* User Profile Button */}
        <button
          type="button"
          onClick={onOpenProfile}
          className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl border border-[var(--border-card)] bg-[var(--bg-card)] text-[var(--text-sub)] hover:text-[var(--text-main)] hover:border-[var(--brand-primary)] flex items-center justify-center transition-all cursor-pointer shadow-xs hover:scale-105 active:scale-95"
          aria-label="User Profile & Preferences"
          title="User Profile & Preferences"
        >
          <User className="w-4 h-4 sm:w-5 sm:h-5" />
        </button>
      </div>
    </header>
  )
}

import { CheckCircle, Calendar, BarChart3, Settings, Sparkles } from 'lucide-react'

export default function BottomNav({ activeTab, onTabChange, onOpenPet, currentPet, onSwitchPet }) {
  const tabs = [
    { id: 'today', label: 'Today', icon: CheckCircle },
    { id: 'plan', label: 'Plan', icon: Calendar },
    { id: 'center', isCenter: true },
    { id: 'metrics', label: 'Metrics', icon: BarChart3 },
    { id: 'profile', label: 'Profile', icon: Settings },
  ]

  return (
    <div className="fixed bottom-5 left-1/2 -translate-x-1/2 z-30 pointer-events-auto select-none">
      {/* Floating Center Bottom Navigation Bar */}
      <nav
        className="flex items-center gap-1 sm:gap-1.5 px-2.5 sm:px-3.5 py-1.5 rounded-full border border-[var(--border-card)] bg-[var(--bg-card)]/95 shadow-xl backdrop-blur-xl transition-all"
        aria-label="App Navigation"
      >
        {tabs.map((tab) => {
          if (tab.isCenter) {
            return (
              <button
                key="center-btn"
                type="button"
                onClick={onOpenPet}
                className="w-10 h-10 mx-0.5 rounded-full bg-[var(--brand-primary)] hover:bg-[var(--brand-primary-hover)] active:scale-95 text-white flex items-center justify-center shadow-md cursor-pointer transition-all duration-200 hover:scale-105 flex-shrink-0"
                title="Companion Settings"
                aria-label="Companion Settings"
              >
                <Sparkles className="w-4 h-4 stroke-[2.5]" />
              </button>
            )
          }

          const isActive = activeTab === tab.id
          const Icon = tab.icon

          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => onTabChange(tab.id)}
              className={`flex flex-col items-center justify-center min-w-[50px] sm:min-w-[58px] px-2 sm:px-2.5 py-1 rounded-xl transition-all duration-200 cursor-pointer ${
                isActive
                  ? 'bg-[var(--brand-tag-bg)] text-[var(--brand-primary)] font-extrabold shadow-xs'
                  : 'text-[var(--text-sub)] hover:text-[var(--text-main)] hover:bg-[var(--bg-page)]/60 font-semibold'
              }`}
            >
              <Icon className={`w-4 h-4 ${isActive ? 'stroke-[2.5]' : 'stroke-[1.8]'}`} />
              <span className="text-[10px] sm:text-[11px] leading-tight mt-0.5 tracking-tight">{tab.label}</span>
            </button>
          )
        })}
      </nav>
    </div>
  )
}

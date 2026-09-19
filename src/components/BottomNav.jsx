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
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-30 pointer-events-auto">
      {/* Floating Center Bottom Navigation Bar */}
      <nav
        className="flex items-center gap-2 sm:gap-3 px-5 py-2.5 rounded-3xl border border-[var(--border-card)] bg-[var(--bg-card)] shadow-2xl backdrop-blur-md transition-all"
        aria-label="App Navigation"
      >
        {tabs.map((tab) => {
          if (tab.isCenter) {
            return (
              <button
                key="center-btn"
                onClick={onOpenPet}
                className="w-12 h-12 -my-2 mx-1.5 rounded-full bg-[var(--brand-primary)] hover:scale-105 active:scale-95 text-white flex items-center justify-center shadow-lg cursor-pointer transition-all"
                title="Companion settings"
                aria-label="Companion settings"
              >
                <Sparkles className="w-5 h-5 stroke-[2.5]" />
              </button>
            )
          }

          const isActive = activeTab === tab.id
          const Icon = tab.icon

          return (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={`flex flex-col items-center justify-center px-3.5 py-1.5 rounded-2xl text-xs font-bold transition-all cursor-pointer ${
                isActive
                  ? 'text-[var(--brand-primary)]'
                  : 'text-[var(--text-sub)] hover:text-[var(--text-main)]'
              }`}
            >
              <Icon className={`w-4 h-4 sm:w-5 sm:h-5 mb-0.5 ${isActive ? 'stroke-[2.5]' : 'stroke-[1.8]'}`} />
              <span>{tab.label}</span>
            </button>
          )
        })}
      </nav>
    </div>
  )
}

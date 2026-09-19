import { Sparkles } from 'lucide-react'

export default function TaskFilters({ filter, onFilterChange, onSweep, counts }) {
  const filters = [
    { key: 'All', label: 'All', count: counts.all },
    { key: 'Active', label: 'Active', count: counts.active },
    { key: 'Completed', label: 'Done', count: counts.completed },
  ]

  return (
    <div className="w-full flex items-center justify-between gap-4 pt-2 animate-slide-up" style={{ animationDelay: '0.2s' }}>
      {/* Filter Tabs Capsule */}
      <nav
        className="flex items-center gap-1.5 sm:gap-2 p-1.5 rounded-full border border-[var(--border-card)] bg-[var(--bg-card)] shadow-xs"
        role="tablist"
        aria-label="Task filters"
      >
        {filters.map((f) => {
          const isActive = filter === f.key
          return (
            <button
              key={f.key}
              onClick={() => onFilterChange(f.key)}
              role="tab"
              aria-selected={isActive}
              className={`whitespace-nowrap px-4 sm:px-5 py-2 sm:py-2.5 rounded-full text-sm sm:text-base font-bold transition-all flex items-center gap-2 cursor-pointer ${
                isActive
                  ? 'bg-[var(--brand-tag-bg)] text-[var(--brand-primary)] shadow-xs'
                  : 'text-[var(--text-sub)] hover:text-[var(--text-main)] hover:bg-[var(--bg-page)]'
              }`}
            >
              <span>{f.label}</span>
              <span
                className={`text-xs px-2.5 py-0.5 rounded-full font-bold transition-colors ${
                  isActive ? 'bg-[var(--brand-primary)] text-white' : 'bg-[var(--bg-page)] text-[var(--text-dim)]'
                }`}
              >
                {f.count}
              </span>
            </button>
          )
        })}
      </nav>

      {/* Sweep Action Button */}
      {counts.completed > 0 && (
        <button
          onClick={onSweep}
          className="flex items-center gap-2 text-sm sm:text-base font-bold px-5 py-2.5 rounded-full border border-[var(--border-card)] bg-[var(--bg-card)] text-[var(--text-sub)] hover:text-[var(--text-main)] shadow-xs hover:border-[var(--brand-primary)] transition-all cursor-pointer hover:scale-105 active:scale-95"
          title="Clear completed tasks"
        >
          <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 text-[var(--brand-primary)]" />
          <span>Sweep</span>
        </button>
      )}
    </div>
  )
}

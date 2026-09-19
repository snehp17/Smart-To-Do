import { Sparkles, FileText } from 'lucide-react'

export default function TaskFilters({ filter, onFilterChange, onSweep, onExportPDF, counts }) {
  const filters = [
    { key: 'All', label: 'All', count: counts.all },
    { key: 'Active', label: 'Active', count: counts.active },
    { key: 'Completed', label: 'Done', count: counts.completed },
  ]

  return (
    <div className="w-full flex items-center justify-between gap-2.5 pt-1 animate-slide-up" style={{ animationDelay: '0.2s' }}>
      {/* Filter Tabs Capsule */}
      <nav
        className="flex items-center gap-1 p-1 rounded-full border border-[var(--border-card)] bg-[var(--bg-card)] shadow-xs"
        role="tablist"
        aria-label="Task filters"
      >
        {filters.map((f) => {
          const isActive = filter === f.key
          return (
            <button
              key={f.key}
              type="button"
              onClick={() => onFilterChange(f.key)}
              role="tab"
              aria-selected={isActive}
              className={`whitespace-nowrap px-3 sm:px-4 py-1.5 rounded-full text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                isActive
                  ? 'bg-[var(--brand-tag-bg)] text-[var(--brand-primary)] shadow-xs'
                  : 'text-[var(--text-sub)] hover:text-[var(--text-main)] hover:bg-[var(--bg-page)]'
              }`}
            >
              <span>{f.label}</span>
              <span
                className={`text-[10px] px-1.5 py-0.2 rounded-full font-bold transition-colors ${
                  isActive ? 'bg-[var(--brand-primary)] text-white' : 'bg-[var(--bg-page)] text-[var(--text-dim)]'
                }`}
              >
                {f.count}
              </span>
            </button>
          )
        })}
      </nav>

      {/* Right Controls: Export PDF & Sweep Action */}
      <div className="flex items-center gap-1.5">
        {onExportPDF && (
          <button
            type="button"
            onClick={onExportPDF}
            className="flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 rounded-full border border-[var(--border-card)] bg-[var(--bg-card)] text-[var(--text-sub)] hover:text-[var(--text-main)] shadow-xs hover:border-[var(--brand-primary)] transition-all cursor-pointer hover:scale-105 active:scale-95 flex-shrink-0"
            title="Export tasks as PDF report"
          >
            <FileText className="w-3.5 h-3.5 text-[var(--brand-primary)]" />
            <span className="hidden sm:inline">Export PDF</span>
            <span className="sm:hidden">PDF</span>
          </button>
        )}

        {counts.completed > 0 && (
          <button
            type="button"
            onClick={onSweep}
            className="flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 rounded-full border border-[var(--border-card)] bg-[var(--bg-card)] text-[var(--text-sub)] hover:text-[var(--text-main)] shadow-xs hover:border-[var(--brand-primary)] transition-all cursor-pointer hover:scale-105 active:scale-95 flex-shrink-0"
            title="Clear completed tasks"
          >
            <Sparkles className="w-3.5 h-3.5 text-[var(--brand-primary)]" />
            <span>Sweep</span>
          </button>
        )}
      </div>
    </div>
  )
}

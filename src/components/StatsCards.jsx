import { ListFilter, CheckCircle2, ClipboardList } from 'lucide-react'

export default function StatsCards({ stats }) {
  const cards = [
    {
      title: 'TOTAL',
      value: stats.total,
      unit: 'tasks',
      icon: ListFilter,
    },
    {
      title: 'DONE',
      value: stats.completed,
      unit: 'ticks',
      icon: CheckCircle2,
    },
    {
      title: 'LEFT',
      value: stats.remaining,
      unit: 'left',
      icon: ClipboardList,
    },
  ]

  return (
    <section
      className="w-full grid grid-cols-3 gap-2.5 sm:gap-3.5 animate-slide-up"
      style={{ animationDelay: '0.05s' }}
    >
      {cards.map((card) => (
        <div
          key={card.title}
          className="p-3.5 sm:p-4 rounded-2xl border border-[var(--border-card)] bg-[var(--bg-card)] shadow-xs hover:shadow-sm transition-all flex flex-col justify-between"
        >
          {/* Top: Title & Icon */}
          <div className="flex items-center justify-between mb-2">
            <span className="text-[10px] sm:text-xs font-bold tracking-wider text-[var(--text-sub)] uppercase">
              {card.title}
            </span>
            <card.icon className="w-4 h-4 text-[var(--brand-primary)]" />
          </div>

          {/* Bottom: Number + Unit inline */}
          <div className="flex items-baseline gap-1.5">
            <span className="text-2xl sm:text-3xl font-black tracking-tight text-[var(--text-main)]">
              {String(card.value).padStart(2, '0')}
            </span>
            <span className="text-[11px] sm:text-xs font-semibold text-[var(--text-dim)]">
              {card.unit}
            </span>
          </div>
        </div>
      ))}
    </section>
  )
}

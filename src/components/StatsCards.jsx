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
      className="w-full grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 animate-slide-up"
      style={{ animationDelay: '0.05s' }}
    >
      {cards.map((card) => (
        <div
          key={card.title}
          className="p-6 sm:p-7 rounded-3xl border border-[var(--border-card)] bg-[var(--bg-card)] shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
        >
          {/* Top: Title & Icon */}
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs sm:text-sm font-bold tracking-widest text-[var(--text-sub)] uppercase">
              {card.title}
            </span>
            <card.icon className="w-5 h-5 sm:w-6 sm:h-6 text-[var(--brand-primary)]" />
          </div>

          {/* Bottom: Big Number + Unit inline */}
          <div className="flex items-baseline gap-2.5">
            <span className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-[var(--text-main)]">
              {String(card.value).padStart(2, '0')}
            </span>
            <span className="text-sm sm:text-base font-semibold text-[var(--text-dim)]">
              {card.unit}
            </span>
          </div>
        </div>
      ))}
    </section>
  )
}

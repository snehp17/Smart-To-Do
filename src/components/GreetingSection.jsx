import { getGreeting, getFormattedDate } from '../hooks'

export default function GreetingSection() {
  const greeting = getGreeting()
  const dateStr = getFormattedDate()

  return (
    <section className="w-full flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 animate-slide-up">
      <div>
        <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-[var(--text-main)] flex items-center gap-2">
          <span>{greeting.text}</span>
          <span>{greeting.emoji}</span>
        </h2>
        <p className="text-xs sm:text-sm mt-1 font-medium text-[var(--text-sub)]">
          Let's turn daily goals into calm momentum.
        </p>
      </div>

      {/* Date Pill Badge */}
      <div className="self-start sm:self-auto flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold border border-[var(--border-card)] bg-[var(--bg-card)] text-[var(--text-sub)] shadow-xs">
        <span className="w-2 h-2 rounded-full bg-[var(--brand-primary)]" />
        <span>{dateStr}</span>
      </div>
    </section>
  )
}

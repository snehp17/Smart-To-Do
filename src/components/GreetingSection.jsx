import { getGreeting, getFormattedDate } from '../hooks'

export default function GreetingSection() {
  const greeting = getGreeting()
  const dateStr = getFormattedDate()

  return (
    <section className="w-full flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 animate-slide-up">
      <div>
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-[var(--text-main)] flex items-center gap-3">
          <span>{greeting.text}</span>
          <span>{greeting.emoji}</span>
        </h2>
        <p className="text-base sm:text-lg mt-2 font-medium text-[var(--text-sub)]">
          Let's turn daily goals into calm momentum.
        </p>
      </div>

      {/* Date Pill Badge */}
      <div className="self-start sm:self-auto flex items-center gap-2.5 px-5 py-2.5 rounded-full text-sm font-bold border border-[var(--border-card)] bg-[var(--bg-card)] text-[var(--text-sub)] shadow-sm">
        <span className="w-2.5 h-2.5 rounded-full bg-[var(--brand-primary)]" />
        <span>{dateStr}</span>
      </div>
    </section>
  )
}

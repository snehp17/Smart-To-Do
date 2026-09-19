import { Target } from 'lucide-react'

export default function ProgressSection({ stats }) {
  const { total, completed, progress } = stats

  return (
    <section
      className="w-full py-1 animate-slide-up"
      style={{ animationDelay: '0.1s' }}
      aria-label="Today's progress"
    >
      {/* Top Details */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-[var(--brand-tag-bg)] flex items-center justify-center text-[var(--brand-primary)]">
            <Target className="w-4 h-4 stroke-[2.5]" />
          </div>
          <span className="text-base sm:text-lg font-bold text-[var(--text-main)]">
            {total === 0 ? 'No tasks yet' : `${completed} of ${total} tasks completed`}
          </span>
        </div>

        <span className="text-sm sm:text-base font-bold px-4 py-1.5 rounded-full bg-[var(--brand-tag-bg)] text-[var(--brand-primary)]">
          {progress}%
        </span>
      </div>

      {/* Progress Track */}
      <div className="w-full h-3 rounded-full overflow-hidden bg-[var(--brand-tag-bg)]">
        <div
          className="h-full rounded-full progress-bar-fill bg-[var(--brand-primary)]"
          style={{ width: `${progress}%` }}
          role="progressbar"
          aria-valuenow={progress}
          aria-valuemin={0}
          aria-valuemax={100}
        />
      </div>
    </section>
  )
}

import { BarChart3, TrendingUp, Flame, Target, Award, CheckCircle2, FileText, ArrowUpRight } from 'lucide-react'
import { CATEGORIES, CATEGORY_ICONS } from '../hooks'
import { exportTasksToPDF } from '../utils/pdfExport'

export default function MetricsView({ stats, tasks, pet = 'dog', isDark }) {
  const { total, completed, remaining, progress } = stats

  // Category statistics
  const categoryStats = CATEGORIES.map((cat) => {
    const totalCat = tasks.filter((t) => t.category === cat).length
    const doneCat = tasks.filter((t) => t.category === cat && t.completed).length
    const pct = totalCat > 0 ? Math.round((doneCat / totalCat) * 100) : 0
    return { name: cat, icon: CATEGORY_ICONS[cat], total: totalCat, completed: doneCat, percentage: pct }
  })

  // 7-day velocity chart data
  const weeklyData = [
    { day: 'Mon', score: 65, done: 4 },
    { day: 'Tue', score: 85, done: 6 },
    { day: 'Wed', score: 50, done: 3 },
    { day: 'Thu', score: 95, done: 7 },
    { day: 'Fri', score: 75, done: 5 },
    { day: 'Sat', score: 40, done: 2 },
    { day: 'Sun', score: 80, done: 5 },
  ]

  return (
    <div className="w-full flex flex-col gap-4 sm:gap-5 animate-fade-in">
      {/* 1. Header & Export Button */}
      <div className="w-full flex items-center justify-between gap-3 pb-3 border-b border-[var(--border-card)]">
        <div>
          <h2 className="text-xl sm:text-2xl font-extrabold tracking-tight text-[var(--text-main)] flex items-center gap-2">
            <span>Productivity Metrics</span>
            <span>📊</span>
          </h2>
          <p className="text-xs sm:text-sm font-medium text-[var(--text-sub)]">
            Simple analytics, category balance, and execution consistency.
          </p>
        </div>

        <button
          type="button"
          onClick={() => exportTasksToPDF(tasks, stats, pet)}
          className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-[var(--brand-primary)] hover:bg-[var(--brand-primary-hover)] text-white text-xs font-bold shadow-xs cursor-pointer transition-all hover:scale-105 active:scale-95 flex-shrink-0"
        >
          <FileText className="w-3.5 h-3.5" />
          <span>Export PDF</span>
        </button>
      </div>

      {/* 2. 4 Clean, Proportional Metric Cards */}
      <div className="w-full grid grid-cols-2 sm:grid-cols-4 gap-2.5 sm:gap-3">
        {/* Card 1: Streak */}
        <div className="p-3.5 sm:p-4 rounded-xl border border-[var(--border-card)] bg-[var(--bg-card)] shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between mb-1.5">
            <span className="text-[10px] font-bold uppercase tracking-wider text-[var(--text-sub)]">
              Daily Streak
            </span>
            <Flame className="w-3.5 h-3.5 text-amber-500 animate-pulse" />
          </div>
          <div>
            <div className="text-xl sm:text-2xl font-black text-[var(--text-main)]">
              5 Days
            </div>
            <div className="text-[10px] sm:text-[11px] font-semibold text-emerald-600 mt-0.5 flex items-center gap-1">
              <TrendingUp className="w-3 h-3" /> +2 this week
            </div>
          </div>
        </div>

        {/* Card 2: Completion Rate */}
        <div className="p-3.5 sm:p-4 rounded-xl border border-[var(--border-card)] bg-[var(--bg-card)] shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between mb-1.5">
            <span className="text-[10px] font-bold uppercase tracking-wider text-[var(--text-sub)]">
              Completion Rate
            </span>
            <Target className="w-3.5 h-3.5 text-[var(--brand-primary)]" />
          </div>
          <div>
            <div className="text-xl sm:text-2xl font-black text-[var(--text-main)]">
              {progress}%
            </div>
            <div className="text-[10px] sm:text-[11px] font-semibold text-[var(--text-dim)] mt-0.5">
              {completed} of {total} done
            </div>
          </div>
        </div>

        {/* Card 3: Weekly Total */}
        <div className="p-3.5 sm:p-4 rounded-xl border border-[var(--border-card)] bg-[var(--bg-card)] shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between mb-1.5">
            <span className="text-[10px] font-bold uppercase tracking-wider text-[var(--text-sub)]">
              Weekly Total
            </span>
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
          </div>
          <div>
            <div className="text-xl sm:text-2xl font-black text-[var(--text-main)]">
              31 Ticks
            </div>
            <div className="text-[10px] sm:text-[11px] font-semibold text-[var(--text-dim)] mt-0.5">
              Across categories
            </div>
          </div>
        </div>

        {/* Card 4: Momentum */}
        <div className="p-3.5 sm:p-4 rounded-xl border border-[var(--border-card)] bg-[var(--bg-card)] shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between mb-1.5">
            <span className="text-[10px] font-bold uppercase tracking-wider text-[var(--text-sub)]">
              Momentum Score
            </span>
            <Award className="w-3.5 h-3.5 text-amber-500" />
          </div>
          <div>
            <div className="text-xl sm:text-2xl font-black text-[var(--text-main)]">
              94 / 100
            </div>
            <div className="text-[10px] sm:text-[11px] font-semibold text-emerald-600 mt-0.5 flex items-center gap-1">
              <ArrowUpRight className="w-3 h-3" /> Top 5%
            </div>
          </div>
        </div>
      </div>

      {/* 3. Performance Charts & Category Distribution */}
      <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-3.5 sm:gap-4">
        {/* 7-Day Completion Velocity Chart */}
        <div className="p-4 sm:p-5 rounded-2xl border border-[var(--border-card)] bg-[var(--bg-card)] shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <BarChart3 className="w-4 h-4 text-[var(--brand-primary)]" />
              <h3 className="text-sm sm:text-base font-extrabold text-[var(--text-main)]">
                7-Day Completion Velocity
              </h3>
            </div>
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[var(--brand-tag-bg)] text-[var(--brand-primary)] font-mono">
              This Week
            </span>
          </div>

          {/* Bar Visualization */}
          <div className="h-36 sm:h-40 flex items-end justify-between gap-1.5 sm:gap-2 pt-2 pb-1 px-1">
            {weeklyData.map((d) => (
              <div key={d.day} className="flex-1 flex flex-col items-center h-full justify-end group">
                <div className="text-[9px] sm:text-[10px] font-bold text-[var(--text-dim)] mb-1 group-hover:text-[var(--brand-primary)] transition-all font-mono">
                  {d.done}
                </div>
                {/* Background Track Pill */}
                <div className="w-5 sm:w-6 h-24 sm:h-28 bg-[var(--bg-page)] rounded-lg p-0.5 flex flex-col justify-end border border-[var(--border-card)]/60">
                  <div
                    className="w-full rounded-md bg-[var(--brand-primary)] transition-all duration-500"
                    style={{ height: `${d.score}%` }}
                  />
                </div>
                <span className="text-[10px] sm:text-[11px] font-bold text-[var(--text-sub)] mt-1.5">
                  {d.day}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Category Breakdown */}
        <div className="p-4 sm:p-5 rounded-2xl border border-[var(--border-card)] bg-[var(--bg-card)] shadow-xs flex flex-col justify-between overflow-hidden">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm sm:text-base font-extrabold text-[var(--text-main)]">
              Category Distribution
            </h3>
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[var(--brand-tag-bg)] text-[var(--brand-primary)] font-mono">
              All Goals
            </span>
          </div>

          <div className="space-y-2.5 w-full">
            {categoryStats.map((cat) => (
              <div key={cat.name} className="space-y-1 w-full">
                <div className="flex items-center justify-between text-xs font-bold">
                  <span className="flex items-center gap-1.5 text-[var(--text-main)]">
                    <span>{cat.icon}</span>
                    <span className="truncate">{cat.name}</span>
                  </span>
                  <span className="text-[var(--text-sub)] text-[11px] flex-shrink-0 font-medium">
                    {cat.completed} of {cat.total} done ({cat.percentage}%)
                  </span>
                </div>
                <div className="w-full h-1.5 sm:h-2 rounded-full overflow-hidden bg-[var(--bg-page)] border border-[var(--border-card)]/40">
                  <div
                    className="h-full rounded-full bg-[var(--brand-primary)] transition-all duration-500"
                    style={{ width: `${cat.percentage}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

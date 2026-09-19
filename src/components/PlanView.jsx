import { useState } from 'react'
import { Calendar as CalendarIcon, Clock, Plus, CheckCircle2, ChevronLeft, ChevronRight, Trash2, Edit3, Sparkles, FileText } from 'lucide-react'
import { CATEGORIES, CATEGORY_ICONS, PRIORITIES, formatTime, getTodayDateString } from '../hooks'
import { exportTasksToPDF } from '../utils/pdfExport'

export default function PlanView({ tasks, onToggleTask, onAddTask, onEditTask, onDeleteTask, isDark }) {
  const [selectedDayOffset, setSelectedDayOffset] = useState(0) // 0 = today, 1 = tomorrow, etc.
  const [quickTitle, setQuickTitle] = useState('')
  const [quickCategory, setQuickCategory] = useState('Work')
  const [quickPriority, setQuickPriority] = useState('Medium')
  const [quickTime, setQuickTime] = useState('10:00')

  // Generate the 7 days of the week starting from today
  const todayStr = getTodayDateString(0)
  const days = Array.from({ length: 7 }, (_, i) => {
    const d = new Date()
    d.setDate(d.getDate() + i)
    const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
    const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
    const dateStr = getTodayDateString(i)
    return {
      offset: i,
      dateStr,
      dayName: i === 0 ? 'Today' : i === 1 ? 'Tomorrow' : dayNames[d.getDay()],
      fullDate: `${monthNames[d.getMonth()]} ${d.getDate()}`,
      dayNum: d.getDate(),
      isToday: i === 0,
    }
  })

  const currentDay = days[selectedDayOffset] || days[0]

  // Filter tasks for the selected day
  const dayTasks = tasks.filter((t) => {
    const taskDate = t.date || todayStr
    return taskDate === currentDay.dateStr
  })

  const handleQuickAdd = (e) => {
    e.preventDefault()
    if (!quickTitle.trim()) return
    onAddTask({
      title: quickTitle.trim(),
      category: quickCategory,
      priority: quickPriority,
      dueTime: quickTime,
      date: currentDay.dateStr,
    })
    setQuickTitle('')
  }

  // Group current day's tasks by time slots
  const morningTasks = dayTasks.filter((t) => {
    if (!t.dueTime) return false
    const h = parseInt(t.dueTime.split(':')[0], 10)
    return !isNaN(h) && h < 12
  })

  const afternoonTasks = dayTasks.filter((t) => {
    if (!t.dueTime) return false
    const h = parseInt(t.dueTime.split(':')[0], 10)
    return !isNaN(h) && h >= 12 && h < 17
  })

  const eveningTasks = dayTasks.filter((t) => {
    if (!t.dueTime) return false
    const h = parseInt(t.dueTime.split(':')[0], 10)
    return !isNaN(h) && h >= 17
  })

  const anytimeTasks = dayTasks.filter((t) => !t.dueTime)

  const completedCount = dayTasks.filter((t) => t.completed).length
  const totalCount = dayTasks.length
  const dayPct = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0

  return (
    <div className="w-full flex flex-col gap-5 sm:gap-6 animate-fade-in">
      {/* 1. Header & Day Switcher */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 pb-2 border-b border-[var(--border-card)]">
        <div>
          <h2 className="text-xl sm:text-2xl font-extrabold tracking-tight text-[var(--text-main)] flex items-center gap-2">
            <span>Planner & Schedule</span>
            <span>🗓️</span>
          </h2>
          <p className="text-xs sm:text-sm font-medium text-[var(--text-sub)]">
            Plan ahead, assign milestone time slots, and keep your week organized.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2 self-start sm:self-auto">
          <button
            type="button"
            onClick={() => exportTasksToPDF(tasks, { total: tasks.length, completed: tasks.filter((t) => t.completed).length, remaining: tasks.filter((t) => !t.completed).length, progress: dayPct })}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[var(--brand-primary)] hover:bg-[var(--brand-primary-hover)] text-white text-xs font-bold shadow-xs cursor-pointer transition-all hover:scale-105 active:scale-95"
            title="Export Planner Schedule to PDF"
          >
            <FileText className="w-3.5 h-3.5" />
            <span>Export PDF</span>
          </button>
          <button
            type="button"
            onClick={() => setSelectedDayOffset((prev) => Math.max(0, prev - 1))}
            disabled={selectedDayOffset === 0}
            className="p-2 rounded-xl border border-[var(--border-card)] bg-[var(--bg-card)] text-[var(--text-sub)] hover:text-[var(--text-main)] disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer shadow-xs transition-all hover:scale-105 active:scale-95"
            aria-label="Previous Day"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <div className="px-3 py-1.5 rounded-xl border border-[var(--border-card)] bg-[var(--bg-card)] text-xs font-bold text-[var(--text-main)]">
            {currentDay.dayName} ({currentDay.fullDate})
          </div>
          <button
            type="button"
            onClick={() => setSelectedDayOffset((prev) => Math.min(6, prev + 1))}
            disabled={selectedDayOffset === 6}
            className="p-2 rounded-xl border border-[var(--border-card)] bg-[var(--bg-card)] text-[var(--text-sub)] hover:text-[var(--text-main)] disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer shadow-xs transition-all hover:scale-105 active:scale-95"
            aria-label="Next Day"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* 2. 7-Day Interactive Day Strip */}
      <div className="grid grid-cols-4 sm:grid-cols-7 gap-2">
        {days.map((day) => {
          const isSelected = selectedDayOffset === day.offset
          const countOnDay = tasks.filter((t) => (t.date || todayStr) === day.dateStr).length
          const doneOnDay = tasks.filter((t) => (t.date || todayStr) === day.dateStr && t.completed).length

          return (
            <button
              key={day.offset}
              type="button"
              onClick={() => setSelectedDayOffset(day.offset)}
              className={`p-2.5 rounded-2xl border text-center transition-all duration-200 cursor-pointer flex flex-col items-center justify-between gap-1 ${
                isSelected
                  ? 'bg-[var(--brand-primary)] border-[var(--brand-primary)] text-white shadow-md scale-[1.02]'
                  : 'bg-[var(--bg-card)] border-[var(--border-card)] text-[var(--text-sub)] hover:border-[var(--brand-primary)] hover:text-[var(--text-main)]'
              }`}
            >
              <span className={`text-[10px] font-bold uppercase tracking-wider ${isSelected ? 'text-white/90' : 'text-[var(--text-dim)]'}`}>
                {day.dayName}
              </span>
              <span className={`text-xl sm:text-2xl font-black ${isSelected ? 'text-white' : 'text-[var(--text-main)]'}`}>
                {day.dayNum}
              </span>
              <span className={`text-[9px] font-bold px-1.5 py-0.2 rounded-full ${isSelected ? 'bg-white/25 text-white' : 'bg-[var(--brand-tag-bg)] text-[var(--brand-primary)]'}`}>
                {countOnDay > 0 ? `${doneOnDay}/${countOnDay}` : day.fullDate}
              </span>
            </button>
          )
        })}
      </div>

      {/* 3. Day Summary Card */}
      <div className="p-4 sm:p-5 rounded-2xl border border-[var(--border-card)] bg-[var(--bg-card)] shadow-xs flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-[var(--brand-tag-bg)] text-[var(--brand-primary)] flex items-center justify-center font-bold text-lg">
            {currentDay.isToday ? '🎯' : '📅'}
          </div>
          <div>
            <h3 className="text-base font-extrabold text-[var(--text-main)]">
              {currentDay.dayName}’s Schedule Overview
            </h3>
            <p className="text-xs font-medium text-[var(--text-sub)]">
              {totalCount === 0
                ? 'No milestones scheduled yet for this day.'
                : `${completedCount} of ${totalCount} goals completed (${dayPct}%)`}
            </p>
          </div>
        </div>

        {totalCount > 0 && (
          <div className="w-full sm:w-40 flex items-center gap-2.5">
            <div className="flex-1 h-2 rounded-full bg-[var(--bg-page)] overflow-hidden">
              <div
                className="h-full bg-[var(--brand-primary)] rounded-full transition-all duration-500"
                style={{ width: `${dayPct}%` }}
              />
            </div>
            <span className="text-xs font-black text-[var(--text-main)] min-w-[32px]">
              {dayPct}%
            </span>
          </div>
        )}
      </div>

      {/* 4. Quick Schedule Input Form */}
      <form
        onSubmit={handleQuickAdd}
        className="w-full p-3 sm:p-3.5 rounded-2xl border border-[var(--border-card)] bg-[var(--bg-card)] shadow-xs flex flex-col md:flex-row items-stretch md:items-center gap-2.5"
      >
        <div className="flex items-center gap-2 flex-1 min-w-0 pl-1.5">
          <CalendarIcon className="w-4 h-4 text-[var(--brand-primary)] flex-shrink-0" />
          <input
            type="text"
            value={quickTitle}
            onChange={(e) => setQuickTitle(e.target.value)}
            placeholder={`Schedule goal for ${currentDay.dayName}...`}
            className="w-full text-xs sm:text-sm font-medium outline-none bg-transparent text-[var(--text-main)] placeholder:text-[var(--text-dim)]"
          />
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <select
            value={quickCategory}
            onChange={(e) => setQuickCategory(e.target.value)}
            className="px-2.5 py-1.5 rounded-xl border border-[var(--border-card)] bg-[var(--bg-page)] text-xs font-bold text-[var(--text-main)] outline-none cursor-pointer"
          >
            {CATEGORIES.map((c) => (
              <option key={c} value={c}>
                {CATEGORY_ICONS[c]} {c}
              </option>
            ))}
          </select>

          <select
            value={quickPriority}
            onChange={(e) => setQuickPriority(e.target.value)}
            className="px-2.5 py-1.5 rounded-xl border border-[var(--border-card)] bg-[var(--bg-page)] text-xs font-bold text-[var(--text-main)] outline-none cursor-pointer"
          >
            <option value="Low">🟢 Low</option>
            <option value="Medium">🟡 Med</option>
            <option value="High">🔴 High</option>
          </select>

          <input
            type="time"
            value={quickTime}
            onChange={(e) => setQuickTime(e.target.value)}
            className="px-2.5 py-1 rounded-xl border border-[var(--border-card)] bg-[var(--bg-page)] text-xs font-bold text-[var(--text-main)] outline-none"
          />

          <button
            type="submit"
            disabled={!quickTitle.trim()}
            className="flex items-center justify-center gap-1.5 px-4 py-1.5 rounded-xl bg-[var(--brand-primary)] hover:bg-[var(--brand-primary-hover)] text-white text-xs font-bold shadow-xs transition-all disabled:opacity-40 cursor-pointer flex-shrink-0 hover:scale-105 active:scale-95"
          >
            <Plus className="w-3.5 h-3.5 stroke-[3]" />
            <span>Schedule</span>
          </button>
        </div>
      </form>

      {/* 5. Time Blocks Timeline */}
      <div className="space-y-4">
        {/* Morning Block */}
        <div className="p-4 sm:p-5 rounded-2xl border border-[var(--border-card)] bg-[var(--bg-card)] shadow-xs">
          <div className="flex items-center justify-between pb-3 mb-3 border-b border-[var(--border-card)]">
            <div className="flex items-center gap-2">
              <span className="text-lg">🌅</span>
              <h3 className="text-sm sm:text-base font-extrabold text-[var(--text-main)]">
                Morning Focus (Before 12:00 PM)
              </h3>
            </div>
            <span className="text-[10px] sm:text-xs font-bold px-2.5 py-0.5 rounded-full bg-[var(--brand-tag-bg)] text-[var(--brand-primary)] font-mono">
              {morningTasks.length} {morningTasks.length === 1 ? 'task' : 'tasks'}
            </span>
          </div>

          {morningTasks.length === 0 ? (
            <p className="text-xs font-medium text-[var(--text-dim)] py-1">
              No morning tasks scheduled for {currentDay.dayName}.
            </p>
          ) : (
            <div className="space-y-2">
              {morningTasks.map((t) => (
                <PlanTaskCard
                  key={t.id}
                  task={t}
                  onToggle={onToggleTask}
                  onEdit={onEditTask}
                  onDelete={onDeleteTask}
                />
              ))}
            </div>
          )}
        </div>

        {/* Afternoon Block */}
        <div className="p-4 sm:p-5 rounded-2xl border border-[var(--border-card)] bg-[var(--bg-card)] shadow-xs">
          <div className="flex items-center justify-between pb-3 mb-3 border-b border-[var(--border-card)]">
            <div className="flex items-center gap-2">
              <span className="text-lg">☀️</span>
              <h3 className="text-sm sm:text-base font-extrabold text-[var(--text-main)]">
                Afternoon Execution (12:00 PM – 5:00 PM)
              </h3>
            </div>
            <span className="text-[10px] sm:text-xs font-bold px-2.5 py-0.5 rounded-full bg-[var(--brand-tag-bg)] text-[var(--brand-primary)] font-mono">
              {afternoonTasks.length} {afternoonTasks.length === 1 ? 'task' : 'tasks'}
            </span>
          </div>

          {afternoonTasks.length === 0 ? (
            <p className="text-xs font-medium text-[var(--text-dim)] py-1">
              No afternoon tasks scheduled for {currentDay.dayName}.
            </p>
          ) : (
            <div className="space-y-2">
              {afternoonTasks.map((t) => (
                <PlanTaskCard
                  key={t.id}
                  task={t}
                  onToggle={onToggleTask}
                  onEdit={onEditTask}
                  onDelete={onDeleteTask}
                />
              ))}
            </div>
          )}
        </div>

        {/* Evening Block */}
        <div className="p-4 sm:p-5 rounded-2xl border border-[var(--border-card)] bg-[var(--bg-card)] shadow-xs">
          <div className="flex items-center justify-between pb-3 mb-3 border-b border-[var(--border-card)]">
            <div className="flex items-center gap-2">
              <span className="text-lg">🌙</span>
              <h3 className="text-sm sm:text-base font-extrabold text-[var(--text-main)]">
                Evening Wrap-up (After 5:00 PM)
              </h3>
            </div>
            <span className="text-[10px] sm:text-xs font-bold px-2.5 py-0.5 rounded-full bg-[var(--brand-tag-bg)] text-[var(--brand-primary)] font-mono">
              {eveningTasks.length} {eveningTasks.length === 1 ? 'task' : 'tasks'}
            </span>
          </div>

          {eveningTasks.length === 0 ? (
            <p className="text-xs font-medium text-[var(--text-dim)] py-1">
              No evening wrap-up tasks scheduled.
            </p>
          ) : (
            <div className="space-y-2">
              {eveningTasks.map((t) => (
                <PlanTaskCard
                  key={t.id}
                  task={t}
                  onToggle={onToggleTask}
                  onEdit={onEditTask}
                  onDelete={onDeleteTask}
                />
              ))}
            </div>
          )}
        </div>

        {/* Flexible / Anytime Block */}
        {anytimeTasks.length > 0 && (
          <div className="p-4 sm:p-5 rounded-2xl border border-[var(--border-card)] bg-[var(--bg-card)] shadow-xs">
            <div className="flex items-center justify-between pb-3 mb-3 border-b border-[var(--border-card)]">
              <div className="flex items-center gap-2">
                <span className="text-lg">⚡</span>
                <h3 className="text-sm sm:text-base font-extrabold text-[var(--text-main)]">
                  Flexible / Anytime Tasks
                </h3>
              </div>
              <span className="text-[10px] sm:text-xs font-bold px-2.5 py-0.5 rounded-full bg-[var(--brand-tag-bg)] text-[var(--brand-primary)] font-mono">
                {anytimeTasks.length} tasks
              </span>
            </div>

            <div className="space-y-2">
              {anytimeTasks.map((t) => (
                <PlanTaskCard
                  key={t.id}
                  task={t}
                  onToggle={onToggleTask}
                  onEdit={onEditTask}
                  onDelete={onDeleteTask}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

function PlanTaskCard({ task, onToggle, onEdit, onDelete }) {
  const prio = PRIORITIES[task.priority] || PRIORITIES.Medium

  return (
    <div className="flex items-center justify-between p-3 rounded-xl bg-[var(--bg-page)] border border-[var(--border-card)] gap-2.5 hover:border-[var(--brand-primary)] transition-all">
      <div className="flex items-center gap-2.5 min-w-0 flex-1">
        <button
          type="button"
          onClick={() => onToggle(task.id)}
          className={`w-5 h-5 rounded-lg border-2 flex items-center justify-center cursor-pointer transition-all flex-shrink-0 ${
            task.completed
              ? 'bg-[var(--brand-primary)] border-[var(--brand-primary)] text-white'
              : 'border-[var(--border-card)] bg-[var(--bg-card)] hover:border-[var(--brand-primary)]'
          }`}
          aria-label={task.completed ? 'Mark task incomplete' : 'Mark task complete'}
        >
          {task.completed && <CheckCircle2 className="w-3.5 h-3.5 text-white" />}
        </button>

        <div className="min-w-0 flex-1">
          <p className={`text-xs sm:text-sm font-semibold truncate ${task.completed ? 'line-through text-[var(--text-dim)]' : 'text-[var(--text-main)]'}`}>
            {task.title}
          </p>
          <div className="flex items-center gap-1.5 mt-0.5">
            <span className="text-[10px] font-bold text-[var(--text-sub)]">
              {CATEGORY_ICONS[task.category] || '📌'} {task.category}
            </span>
            <span className={`text-[9px] font-bold px-1.5 py-0.2 rounded-full ${prio.color}`}>
              {task.priority}
            </span>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-1.5 flex-shrink-0">
        <span className="text-[11px] font-bold px-2 py-0.5 rounded-lg bg-[var(--bg-card)] text-[var(--text-sub)] border border-[var(--border-card)]">
          {task.dueTime ? formatTime(task.dueTime, task.date) : 'Flexible'}
        </span>
        <button
          type="button"
          onClick={() => onEdit(task)}
          className="p-1 rounded-lg text-[var(--text-sub)] hover:text-[var(--text-main)] hover:bg-[var(--bg-card)] cursor-pointer transition-colors"
          title="Edit task"
          aria-label="Edit task"
        >
          <Edit3 className="w-3.5 h-3.5" />
        </button>
        <button
          type="button"
          onClick={() => onDelete(task.id)}
          className="p-1 rounded-lg text-[var(--text-sub)] hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-950/40 cursor-pointer transition-colors"
          title="Delete task"
          aria-label="Delete task"
        >
          <Trash2 className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  )
}

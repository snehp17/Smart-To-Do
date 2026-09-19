import { useState } from 'react'
import { Check, Pencil, Trash2, Clock } from 'lucide-react'
import { formatTime } from '../hooks'

const CATEGORY_STYLES = {
  Work: 'bg-[#FFEADB] text-[#9A5016] dark:bg-amber-950/50 dark:text-amber-300',
  Study: 'bg-[#F3EFEA] text-[#7A6B5D] dark:bg-neutral-800 dark:text-neutral-300',
  Health: 'bg-[#FEF5D8] text-[#8C6D15] dark:bg-yellow-950/50 dark:text-yellow-300',
  Personal: 'bg-[#F3EFEA] text-[#7A6B5D] dark:bg-neutral-800 dark:text-neutral-300',
  Other: 'bg-[#F3EFEA] text-[#7A6B5D] dark:bg-neutral-800 dark:text-neutral-300',
}

const PRIORITY_STYLES = {
  High: 'bg-[#FFE2E2] text-[#B91C1C] dark:bg-red-950/60 dark:text-red-300',
  Medium: 'bg-[#FEF3E2] text-[#B45309] dark:bg-amber-950/60 dark:text-amber-300',
  Low: 'bg-[#EAF5EC] text-[#15803D] dark:bg-emerald-950/60 dark:text-emerald-300',
}

export default function TaskItem({ task, onToggle, onEdit, onDelete, index }) {
  const [isRemoving, setIsRemoving] = useState(false)

  const handleDelete = () => {
    setIsRemoving(true)
    setTimeout(() => onDelete(), 200)
  }

  const catStyle = CATEGORY_STYLES[task.category] || CATEGORY_STYLES.Other
  const priStyle = PRIORITY_STYLES[task.priority] || PRIORITY_STYLES.Medium

  return (
    <div
      className={`w-full group rounded-3xl p-5 sm:p-6 flex items-center justify-between gap-5 transition-all duration-200 border border-[var(--border-card)] bg-[var(--bg-card)] shadow-xs hover:shadow-md mb-4 ${
        isRemoving ? 'opacity-0 scale-95 -translate-x-3' : 'opacity-100'
      }`}
      style={{ animationDelay: `${0.03 * index}s` }}
    >
      {/* 1. Large Rounded Square Checkbox */}
      <button
        onClick={onToggle}
        className={`w-7 h-7 rounded-xl border-2 flex items-center justify-center flex-shrink-0 cursor-pointer transition-all ${
          task.completed
            ? 'bg-[var(--brand-primary)] border-[var(--brand-primary)] text-white shadow-xs'
            : 'border-[var(--border-card)] bg-[var(--bg-page)] hover:border-[var(--brand-primary)]'
        }`}
        aria-label={task.completed ? 'Mark as incomplete' : 'Mark as complete'}
      >
        {task.completed && (
          <Check className="w-4 h-4 stroke-[3.5] animate-checkmark" />
        )}
      </button>

      {/* 2. Task Details */}
      <div className="flex-1 min-w-0 pr-3">
        <p
          className={`text-base sm:text-lg font-bold leading-snug transition-colors truncate ${
            task.completed
              ? 'line-through text-[var(--text-dim)]'
              : 'text-[var(--text-main)]'
          }`}
        >
          {task.title}
        </p>

        {/* Tags Row */}
        <div className="flex items-center gap-2.5 mt-2 flex-wrap">
          {/* Category Tag */}
          <span className={`text-xs sm:text-sm font-bold px-3.5 py-1 rounded-full ${catStyle}`}>
            {task.category}
          </span>

          {/* Priority Tag */}
          <span className={`text-xs sm:text-sm font-bold px-3.5 py-1 rounded-full ${priStyle}`}>
            {task.priority}
          </span>

          {/* Time Tag */}
          {task.dueTime && (
            <span className="text-xs sm:text-sm font-semibold px-3.5 py-1 rounded-full flex items-center gap-2 bg-[#F7F4F0] dark:bg-neutral-800 text-[var(--text-sub)]">
              <Clock className="w-3.5 h-3.5 text-[var(--text-dim)]" />
              <span>{formatTime(task.dueTime)}</span>
            </span>
          )}
        </div>
      </div>

      {/* 3. Action Buttons */}
      <div className="flex items-center justify-end gap-1.5 w-20 flex-shrink-0 opacity-80 group-hover:opacity-100 transition-opacity">
        <button
          onClick={onEdit}
          className="p-2.5 rounded-2xl transition-colors cursor-pointer text-[var(--text-sub)] hover:text-[var(--text-main)] hover:bg-[var(--brand-tag-bg)]"
          aria-label={`Edit "${task.title}"`}
          title="Edit task"
        >
          <Pencil className="w-4 h-4 sm:w-5 sm:h-5" />
        </button>
        <button
          onClick={handleDelete}
          className="p-2.5 rounded-2xl transition-colors cursor-pointer text-[var(--text-sub)] hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-950/40"
          aria-label={`Delete "${task.title}"`}
          title="Delete task"
        >
          <Trash2 className="w-4 h-4 sm:w-5 sm:h-5" />
        </button>
      </div>
    </div>
  )
}

import { useState } from 'react'
import { Plus, Sparkles, ChevronDown } from 'lucide-react'
import { CATEGORIES, CATEGORY_ICONS } from '../hooks'

export default function TaskInput({ onAdd }) {
  const [title, setTitle] = useState('')
  const [expanded, setExpanded] = useState(false)
  const [category, setCategory] = useState('Work')
  const [priority, setPriority] = useState('Medium')
  const [dueTime, setDueTime] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    const trimmed = title.trim()
    if (!trimmed) return

    onAdd({ title: trimmed, category, priority, dueTime })
    setTitle('')
    setCategory('Work')
    setPriority('Medium')
    setDueTime('')
    setExpanded(false)
  }

  return (
    <section
      className="w-full rounded-2xl transition-all duration-200 border border-[var(--border-card)] bg-[var(--bg-card)] shadow-xs animate-slide-up overflow-hidden"
      style={{ animationDelay: '0.15s' }}
    >
      <form onSubmit={handleSubmit}>
        {/* Main Input Row */}
        <div className="flex items-center justify-between gap-2.5 p-2 sm:p-2.5">
          <div className="flex items-center gap-2.5 flex-1 min-w-0 pl-2.5 sm:pl-3">
            <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 text-[var(--brand-primary)] flex-shrink-0" />
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="What needs to be done?"
              className="w-full text-sm sm:text-base font-medium outline-none bg-transparent text-[var(--text-main)] placeholder:text-[var(--text-dim)]"
              aria-label="Task title"
              onFocus={() => !expanded && setExpanded(true)}
            />
          </div>
          <button
            type="button"
            onClick={() => (title.trim() && expanded ? handleSubmit({ preventDefault: () => {} }) : setExpanded(!expanded))}
            className="flex-shrink-0 whitespace-nowrap flex items-center justify-center gap-1.5 px-4 sm:px-6 py-2 sm:py-2.5 rounded-xl bg-[var(--brand-primary)] hover:bg-[var(--brand-primary-hover)] text-white text-xs sm:text-sm font-bold shadow-xs transition-all hover:scale-[1.02] active:scale-95 cursor-pointer"
            aria-label="Add task"
          >
            <Plus className="w-4 h-4 stroke-[3]" />
            <span>Add</span>
          </button>
        </div>

        {/* Expandable Drawer */}
        {expanded && (
          <div className="px-4 pb-4 pt-2.5 border-t border-[var(--border-card)] animate-scale-in">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-1.5">
              {/* Category */}
              <div>
                <label className="block text-xs font-bold mb-1.5 text-[var(--text-sub)]">
                  Category
                </label>
                <div className="relative">
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full appearance-none text-xs sm:text-sm font-medium rounded-xl px-3 py-2 pr-8 outline-none border border-[var(--border-card)] bg-[var(--bg-page)] text-[var(--text-main)] transition-colors"
                  >
                    {CATEGORIES.map((c) => (
                      <option key={c} value={c}>
                        {CATEGORY_ICONS[c]} {c}
                      </option>
                    ))}
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 pointer-events-none text-[var(--text-dim)]" />
                </div>
              </div>

              {/* Priority */}
              <div>
                <label className="block text-xs font-bold mb-1.5 text-[var(--text-sub)]">
                  Priority
                </label>
                <div className="flex gap-1.5">
                  {['Low', 'Medium', 'High'].map((p) => (
                    <button
                      key={p}
                      type="button"
                      onClick={() => setPriority(p)}
                      className={`flex-1 text-xs font-bold py-2 rounded-xl transition-all cursor-pointer ${
                        priority === p
                          ? p === 'High'
                            ? 'bg-red-500 text-white shadow-xs'
                            : p === 'Medium'
                            ? 'bg-[var(--brand-primary)] text-white shadow-xs'
                            : 'bg-emerald-600 text-white shadow-xs'
                          : 'bg-[var(--bg-page)] text-[var(--text-sub)] hover:bg-[var(--border-card)]'
                      }`}
                    >
                      {p}
                    </button>
                  ))}
                </div>
              </div>

              {/* Due Time */}
              <div>
                <label className="block text-xs font-bold mb-1.5 text-[var(--text-sub)]">
                  Due Time
                </label>
                <input
                  type="time"
                  value={dueTime}
                  onChange={(e) => setDueTime(e.target.value)}
                  className="w-full text-xs sm:text-sm font-medium rounded-xl px-3 py-2 outline-none border border-[var(--border-card)] bg-[var(--bg-page)] text-[var(--text-main)] transition-colors"
                />
              </div>
            </div>

            {/* Actions */}
            <div className="flex justify-end gap-2 mt-3.5">
              <button
                type="button"
                onClick={() => setExpanded(false)}
                className="px-3.5 py-1.5 rounded-xl text-xs font-semibold text-[var(--text-sub)] hover:text-[var(--text-main)] cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={!title.trim()}
                className="px-5 py-1.5 rounded-xl bg-[var(--brand-primary)] hover:bg-[var(--brand-primary-hover)] text-white text-xs font-bold shadow-xs transition-all cursor-pointer"
              >
                Add Task
              </button>
            </div>
          </div>
        )}
      </form>
    </section>
  )
}

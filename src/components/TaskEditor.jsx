import { useState } from 'react'
import { X, ChevronDown } from 'lucide-react'
import { CATEGORIES, CATEGORY_ICONS } from '../hooks'

export default function TaskEditor({ task, onSave, onClose, isDark }) {
  const [title, setTitle] = useState(task.title)
  const [category, setCategory] = useState(task.category)
  const [priority, setPriority] = useState(task.priority)
  const [dueTime, setDueTime] = useState(task.dueTime || '')

  const handleSave = (e) => {
    e.preventDefault()
    const trimmed = title.trim()
    if (!trimmed) return
    onSave({ title: trimmed, category, priority, dueTime })
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 modal-overlay"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />

      {/* Modal Content */}
      <div
        className={`relative w-full max-w-md rounded-2xl p-6 animate-scale-in border ${
          isDark ? 'bg-neutral-950 border-neutral-800 text-white' : 'bg-white shadow-2xl border-[#E8DFD5] text-[#2B241E]'
        }`}
        role="dialog"
        aria-label="Edit task"
      >
        <div className="flex items-center justify-between mb-5">
          <h3 className="text-lg font-bold text-[#2B241E] dark:text-white">
            Edit Task
          </h3>
          <button
            onClick={onClose}
            className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
              isDark ? 'hover:bg-neutral-800 text-neutral-400' : 'hover:bg-[#F3EAE0] text-[#74695E]'
            }`}
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSave} className="space-y-4">
          {/* Title */}
          <div>
            <label className={`block text-xs font-semibold mb-1.5 ${isDark ? 'text-neutral-400' : 'text-[#74695E]'}`}>
              Title
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className={`w-full text-sm font-medium rounded-xl px-3 py-2.5 outline-none border transition-colors ${
                isDark
                  ? 'bg-neutral-900 border-neutral-700 text-white focus:border-amber-400'
                  : 'bg-[#FAF6F0] border-[#E8DFD5] text-[#2B241E] focus:border-[#8B5E34]'
              }`}
              autoFocus
            />
          </div>

          {/* Category */}
          <div>
            <label className={`block text-xs font-semibold mb-1.5 ${isDark ? 'text-neutral-400' : 'text-[#74695E]'}`}>
              Category
            </label>
            <div className="relative">
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className={`w-full appearance-none text-sm font-medium rounded-xl px-3 py-2.5 pr-8 outline-none border transition-colors ${
                  isDark
                    ? 'bg-neutral-900 border-neutral-700 text-white focus:border-amber-400'
                    : 'bg-[#FAF6F0] border-[#E8DFD5] text-[#2B241E] focus:border-[#8B5E34]'
                }`}
              >
                {CATEGORIES.map((c) => (
                  <option key={c} value={c}>
                    {CATEGORY_ICONS[c]} {c}
                  </option>
                ))}
              </select>
              <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 pointer-events-none text-neutral-400" />
            </div>
          </div>

          {/* Priority */}
          <div>
            <label className={`block text-xs font-semibold mb-1.5 ${isDark ? 'text-neutral-400' : 'text-[#74695E]'}`}>
              Priority
            </label>
            <div className="flex gap-2">
              {['Low', 'Medium', 'High'].map((p) => (
                <button
                  key={p}
                  type="button"
                  onClick={() => setPriority(p)}
                  className={`flex-1 text-xs font-bold py-2.5 rounded-xl transition-all ${
                    priority === p
                      ? p === 'High'
                        ? 'bg-red-500 text-white shadow-sm'
                        : p === 'Medium'
                        ? 'bg-[#8B5E34] text-white shadow-sm'
                        : 'bg-emerald-600 text-white shadow-sm'
                      : isDark
                      ? 'bg-neutral-900 text-neutral-400 hover:bg-neutral-800'
                      : 'bg-[#FAF6F0] text-[#74695E] hover:bg-[#F3EAE0]'
                  }`}
                >
                  {p}
                </button>
              ))}
            </div>
          </div>

          {/* Due time */}
          <div>
            <label className={`block text-xs font-semibold mb-1.5 ${isDark ? 'text-neutral-400' : 'text-[#74695E]'}`}>
              Due Time
            </label>
            <input
              type="time"
              value={dueTime}
              onChange={(e) => setDueTime(e.target.value)}
              className={`w-full text-sm rounded-xl px-3 py-2.5 outline-none border transition-colors ${
                isDark
                  ? 'bg-neutral-900 border-neutral-700 text-white focus:border-amber-400'
                  : 'bg-[#FAF6F0] border-[#E8DFD5] text-[#2B241E] focus:border-[#8B5E34]'
              }`}
            />
          </div>

          {/* Actions */}
          <div className="flex gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className={`flex-1 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-colors cursor-pointer ${
                isDark
                  ? 'bg-neutral-900 text-neutral-300 hover:bg-neutral-800'
                  : 'bg-[#FAF6F0] text-[#74695E] hover:bg-[#F3EAE0]'
              }`}
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={!title.trim()}
              className="flex-1 py-2.5 rounded-xl bg-[#8B5E34] dark:bg-amber-500 hover:bg-[#714A27] text-white dark:text-neutral-950 text-xs sm:text-sm font-bold shadow-sm transition-all cursor-pointer"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

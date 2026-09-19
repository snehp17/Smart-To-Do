import { useState, useEffect, useCallback } from 'react'

// ─── localStorage helpers ───
function loadFromStorage(key, fallback) {
  try {
    const raw = localStorage.getItem(key)
    return raw !== null ? JSON.parse(raw) : fallback
  } catch {
    return fallback
  }
}

function saveToStorage(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value))
  } catch {
    // storage full – silent fail
  }
}

// ─── Sample tasks matching user target design ───
const SAMPLE_TASKS = [
  {
    id: crypto.randomUUID(),
    title: 'Complete hackathon project',
    category: 'Work',
    priority: 'High',
    dueTime: '16:00',
    date: getTodayDateString(0),
    completed: false,
    createdAt: Date.now(),
  },
  {
    id: crypto.randomUUID(),
    title: 'Review presentation slides',
    category: 'Study',
    priority: 'Medium',
    dueTime: '18:00',
    date: getTodayDateString(0),
    completed: false,
    createdAt: Date.now() - 1000,
  },
  {
    id: crypto.randomUUID(),
    title: 'Go for a 30-minute walk',
    category: 'Health',
    priority: 'Low',
    dueTime: '19:30',
    date: getTodayDateString(0),
    completed: true,
    createdAt: Date.now() - 2000,
  },
  {
    id: crypto.randomUUID(),
    title: 'Reply to urgent messages',
    category: 'Personal',
    priority: 'Medium',
    dueTime: '20:00',
    date: getTodayDateString(0),
    completed: false,
    createdAt: Date.now() - 3000,
  },
]

const STORAGE_KEYS = {
  TASKS: 'ticksy-tasks',
  PET: 'ticksy-pet',
  THEME: 'ticksy-theme',
  INITIALIZED: 'ticksy-initialized-v2',
}

// ─── useTasks hook ───
export function useTasks() {
  const [tasks, setTasks] = useState(() => {
    const initialized = loadFromStorage(STORAGE_KEYS.INITIALIZED, false)
    if (!initialized) {
      saveToStorage(STORAGE_KEYS.TASKS, SAMPLE_TASKS)
      saveToStorage(STORAGE_KEYS.INITIALIZED, true)
      return SAMPLE_TASKS
    }
    return loadFromStorage(STORAGE_KEYS.TASKS, SAMPLE_TASKS)
  })

  useEffect(() => {
    saveToStorage(STORAGE_KEYS.TASKS, tasks)
  }, [tasks])

  const addTask = useCallback((task) => {
    const newTask = {
      id: crypto.randomUUID(),
      ...task,
      completed: false,
      createdAt: Date.now(),
    }
    setTasks((prev) => [newTask, ...prev])
    return newTask
  }, [])

  const toggleTask = useCallback((id) => {
    setTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t))
    )
  }, [])

  const updateTask = useCallback((id, updates) => {
    setTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, ...updates } : t))
    )
  }, [])

  const deleteTask = useCallback((id) => {
    setTasks((prev) => prev.filter((t) => t.id !== id))
  }, [])

  const sweepCompleted = useCallback(() => {
    setTasks((prev) => prev.filter((t) => !t.completed))
  }, [])

  const total = tasks.length
  const completed = tasks.filter((t) => t.completed).length
  const remaining = total - completed
  const progress = total > 0 ? Math.round((completed / total) * 100) : 0

  return {
    tasks,
    addTask,
    toggleTask,
    updateTask,
    deleteTask,
    sweepCompleted,
    stats: { total, completed, remaining, progress },
  }
}

// ─── usePet hook ───
export function usePet() {
  const [pet, setPetState] = useState(() => loadFromStorage(STORAGE_KEYS.PET, 'dog'))

  const setPet = useCallback((type) => {
    setPetState(type)
    saveToStorage(STORAGE_KEYS.PET, type)
  }, [])

  return { pet, setPet }
}

// ─── useTheme hook ───
export function useTheme() {
  const [theme, setThemeState] = useState(() => loadFromStorage(STORAGE_KEYS.THEME, 'light'))

  useEffect(() => {
    const root = document.documentElement
    if (theme === 'dark') {
      root.classList.add('dark')
    } else {
      root.classList.remove('dark')
    }
    saveToStorage(STORAGE_KEYS.THEME, theme)
  }, [theme])

  const toggleTheme = useCallback(() => {
    setThemeState((prev) => (prev === 'light' ? 'dark' : 'light'))
  }, [])

  return { theme, toggleTheme }
}

// ─── Greeting & Date helpers ───
export function getGreeting() {
  const hour = new Date().getHours()
  if (hour < 12) return { text: 'Good Morning', emoji: '👋' }
  if (hour < 17) return { text: 'Good Afternoon', emoji: '☀️' }
  return { text: 'Good Evening', emoji: '🌙' }
}

export function getTodayDateString(offsetDays = 0) {
  const d = new Date()
  if (offsetDays !== 0) {
    d.setDate(d.getDate() + offsetDays)
  }
  const year = d.getFullYear()
  const month = String(d.getMonth() + 1).padStart(2, '0')
  const day = String(d.getDate()).padStart(2, '0')
  return `${year}-${month}-${day}`
}

export function getFormattedDate() {
  const now = new Date()
  const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec']
  return `${days[now.getDay()]}, ${now.getDate()} ${months[now.getMonth()]}`
}

// ─── Time formatter ───
export function formatTime(time24, dateStr = null) {
  if (!time24) return ''
  const parts = time24.split(':')
  if (parts.length < 2) return time24
  const h = parseInt(parts[0], 10)
  const m = parseInt(parts[1], 10)
  if (isNaN(h) || isNaN(m)) return time24
  const ampm = h >= 12 ? 'PM' : 'AM'
  const h12 = h % 12 || 12
  const formattedTime = `${h12}:${String(m).padStart(2, '0')} ${ampm}`

  if (!dateStr) return formattedTime

  const todayStr = getTodayDateString(0)
  const tomorrowStr = getTodayDateString(1)

  if (dateStr === todayStr) {
    return `Today ${formattedTime}`
  } else if (dateStr === tomorrowStr) {
    return `Tomorrow ${formattedTime}`
  } else {
    try {
      const parts = dateStr.split('-')
      if (parts.length === 3) {
        const d = new Date(parts[0], parts[1] - 1, parts[2])
        const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
        return `${dayNames[d.getDay()]} ${formattedTime}`
      }
    } catch {
      // fallback
    }
    return formattedTime
  }
}

// ─── Priorities & Categories ───
export const PRIORITIES = {
  High: {
    color: 'bg-[#FEE2E2] text-[#991B1B] dark:bg-red-950/60 dark:text-red-300 dark:border dark:border-red-800/40',
  },
  Medium: {
    color: 'bg-[#FEF3C7] text-[#92400E] dark:bg-amber-950/60 dark:text-amber-300 dark:border dark:border-amber-800/40',
  },
  Low: {
    color: 'bg-[#DCFCE7] text-[#166534] dark:bg-emerald-950/60 dark:text-emerald-300 dark:border dark:border-emerald-800/40',
  },
}

export const CATEGORIES = ['Work', 'Study', 'Personal', 'Health', 'Other']

export const CATEGORY_ICONS = {
  Work: '💼',
  Study: '📚',
  Personal: '🏠',
  Health: '💪',
  Other: '📌',
}

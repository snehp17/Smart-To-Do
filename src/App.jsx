import { useState, useCallback } from 'react'
import { useTasks, usePet, useTheme } from './hooks'
import Header from './components/Header'
import GreetingSection from './components/GreetingSection'
import StatsCards from './components/StatsCards'
import ProgressSection from './components/ProgressSection'
import TaskInput from './components/TaskInput'
import TaskFilters from './components/TaskFilters'
import TaskList from './components/TaskList'
import TaskEditor from './components/TaskEditor'
import PetCompanion from './components/PetCompanion'
import PetSelector from './components/PetSelector'
import EmptyState from './components/EmptyState'
import Confetti from './components/Confetti'
import AnimatedBackground from './components/AnimatedBackground'
import BottomNav from './components/BottomNav'

export default function App() {
  const { tasks, addTask, toggleTask, updateTask, deleteTask, sweepCompleted, stats } = useTasks()
  const { pet, setPet } = usePet()
  const { theme, toggleTheme } = useTheme()

  const [filter, setFilter] = useState('All')
  const [activeTab, setActiveTab] = useState('today')
  const [editingTask, setEditingTask] = useState(null)
  const [petReaction, setPetReaction] = useState(null)
  const [showConfetti, setShowConfetti] = useState(false)
  const [showPetSelector, setShowPetSelector] = useState(false)

  // Speech bubble helper
  const triggerPetReaction = useCallback((message, type = 'normal') => {
    setPetReaction({ message, type })
    const duration = type === 'celebrate' ? 4000 : 2500
    setTimeout(() => setPetReaction(null), duration)
  }, [])

  // Task add
  const handleAddTask = useCallback((task) => {
    addTask(task)
    triggerPetReaction('Goal added to list! 🐾', 'excited')
  }, [addTask, triggerPetReaction])

  // Task toggle with celebration triggers
  const handleToggleTask = useCallback((id) => {
    const task = tasks.find((t) => t.id === id)
    if (!task) return

    toggleTask(id)

    if (!task.completed) {
      const newCompleted = stats.completed + 1
      const newTotal = stats.total

      if (newCompleted === newTotal && newTotal > 0) {
        triggerPetReaction('You finished everything today! 🥳✨', 'celebrate')
        setShowConfetti(true)
        setTimeout(() => setShowConfetti(false), 4000)
      } else if (newCompleted === Math.ceil(newTotal / 2) && newTotal > 1) {
        triggerPetReaction('Halfway there! Keep it up! 💪', 'excited')
      } else {
        triggerPetReaction('Done! One tick closer! 🎉', 'happy')
      }
    }
  }, [tasks, stats, toggleTask, triggerPetReaction])

  // Filter tasks
  const filteredTasks = tasks.filter((t) => {
    if (filter === 'Active') return !t.completed
    if (filter === 'Completed') return t.completed
    return true
  })

  const isDark = theme === 'dark'

  return (
    <div className="min-h-[100dvh] w-full relative flex flex-col items-center transition-colors duration-300 bg-[var(--bg-page)] text-[var(--text-main)] overflow-x-hidden">
      {/* 1. Full Viewport Animated Background */}
      <AnimatedBackground
        progress={stats.progress}
        isCelebrating={showConfetti}
        isDark={isDark}
      />

      {/* 2. Main Full-Scale Open Web Layout */}
      <div className="w-full max-w-5xl lg:max-w-6xl mx-auto px-6 sm:px-10 lg:px-12 py-8 pb-36 relative z-10 flex flex-col space-y-8">
        {/* Top Header */}
        <Header
          theme={theme}
          onToggleTheme={toggleTheme}
        />

        {/* Main Dashboard Content */}
        <main className="flex flex-col space-y-7">
          {/* Greeting & Date */}
          <GreetingSection />

          {/* Stats Cards: 3 Spacious Blocks */}
          <StatsCards stats={stats} />

          {/* Progress Bar */}
          <ProgressSection stats={stats} />

          {/* Task Input Field */}
          <TaskInput onAdd={handleAddTask} />

          {/* Task Filters & Sweep */}
          <TaskFilters
            filter={filter}
            onFilterChange={setFilter}
            onSweep={sweepCompleted}
            counts={{
              all: tasks.length,
              active: tasks.filter((t) => !t.completed).length,
              completed: tasks.filter((t) => t.completed).length,
            }}
          />

          {/* Task List or Empty State */}
          <div className="w-full">
            {filteredTasks.length === 0 ? (
              <EmptyState
                filter={filter}
                allDone={stats.total > 0 && stats.completed === stats.total}
                pet={pet}
                isDark={isDark}
              />
            ) : (
              <TaskList
                tasks={filteredTasks}
                onToggle={handleToggleTask}
                onEdit={setEditingTask}
                onDelete={deleteTask}
                isDark={isDark}
              />
            )}
          </div>
        </main>
      </div>

      {/* Floating Bottom Nav */}
      <BottomNav
        activeTab={activeTab}
        onTabChange={setActiveTab}
        onOpenPet={() => setShowPetSelector(true)}
        currentPet={pet}
        onSwitchPet={setPet}
      />

      {/* Floating Pet Companion */}
      <PetCompanion
        pet={pet}
        reaction={petReaction}
        isDark={isDark}
        onPetClick={() => setShowPetSelector(true)}
        onSwitchPet={setPet}
      />

      {/* Edit Task Modal */}
      {editingTask && (
        <TaskEditor
          task={editingTask}
          onSave={(updates) => {
            updateTask(editingTask.id, updates)
            setEditingTask(null)
          }}
          onClose={() => setEditingTask(null)}
          isDark={isDark}
        />
      )}

      {/* Pet Selection Modal */}
      {showPetSelector && (
        <PetSelector
          currentPet={pet}
          onSelect={(p) => {
            setPet(p)
            setShowPetSelector(false)
          }}
          onClose={() => setShowPetSelector(false)}
          isDark={isDark}
        />
      )}

      {/* 100% Celebration Confetti */}
      {showConfetti && <Confetti />}
    </div>
  )
}

import TaskItem from './TaskItem'

export default function TaskList({ tasks, onToggle, onEdit, onDelete, isDark }) {
  return (
    <section
      className="w-full space-y-2.5 sm:space-y-3 animate-slide-up"
      style={{ animationDelay: '0.25s' }}
      aria-label="Task list"
    >
      {tasks.map((task, i) => (
        <TaskItem
          key={task.id}
          task={task}
          onToggle={() => onToggle(task.id)}
          onEdit={() => onEdit(task)}
          onDelete={() => onDelete(task.id)}
          isDark={isDark}
          index={i}
        />
      ))}
    </section>
  )
}

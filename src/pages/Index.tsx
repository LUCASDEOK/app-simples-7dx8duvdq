import { useState, useRef } from 'react'
import { useTasksStore } from '@/stores/tasks-store'
import { TaskItem } from '@/components/TaskItem'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { ListTodo } from 'lucide-react'

const Index = () => {
  const { tasks, addTask, removeTask, updateTask, toggleTask } = useTasksStore()
  const [newTaskText, setNewTaskText] = useState('')
  const inputRef = useRef<HTMLInputElement>(null)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (newTaskText.trim()) {
      addTask(newTaskText)
      setNewTaskText('')
    }
  }

  return (
    <div className="container mx-auto max-w-2xl px-4">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col md:flex-row items-center gap-2 my-8"
      >
        <Input
          ref={inputRef}
          type="text"
          placeholder="Add a new task..."
          value={newTaskText}
          onChange={(e) => setNewTaskText(e.target.value)}
          className="h-12 text-lg flex-1 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-2"
        />
        <Button
          type="submit"
          className="h-12 px-8 text-base font-semibold w-full md:w-auto hover:bg-primary/90 transition-transform active:scale-95 hover:scale-[1.02]"
        >
          Add Task
        </Button>
      </form>

      <div className="space-y-3">
        {tasks.length > 0 ? (
          tasks.map((task) => (
            <TaskItem
              key={task.id}
              task={task}
              onToggle={toggleTask}
              onUpdate={updateTask}
              onRemove={removeTask}
            />
          ))
        ) : (
          <div className="text-center py-16 flex flex-col items-center gap-4">
            <ListTodo className="size-20 text-border" />
            <p className="text-muted-foreground">
              You have no tasks! Start by adding one above.
            </p>
          </div>
        )}
      </div>
    </div>
  )
}

export default Index

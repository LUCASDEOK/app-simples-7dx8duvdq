import { useLocalStorage } from '@/hooks/use-local-storage'
import { toast } from 'sonner'

export interface Task {
  id: string
  text: string
  completed: boolean
  createdAt: number
}

export const useTasksStore = () => {
  const [tasks, setTasks] = useLocalStorage<Task[]>('tasks', [])

  const addTask = (text: string) => {
    if (!text.trim()) {
      toast.error('Task cannot be empty.')
      return
    }
    const newTask: Task = {
      id: crypto.randomUUID(),
      text,
      completed: false,
      createdAt: Date.now(),
    }
    setTasks((prevTasks) => [newTask, ...prevTasks])
    toast.success('Task added!')
  }

  const removeTask = (id: string) => {
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id))
    toast.success('Task deleted!')
  }

  const updateTask = (id: string, text: string) => {
    if (!text.trim()) {
      toast.error('Task cannot be empty.')
      return false
    }
    setTasks((prevTasks) =>
      prevTasks.map((task) => (task.id === id ? { ...task, text } : task)),
    )
    toast.success('Task updated!')
    return true
  }

  const toggleTask = (id: string) => {
    let taskStatus = ''
    setTasks((prevTasks) =>
      prevTasks.map((task) => {
        if (task.id === id) {
          taskStatus = !task.completed ? 'completed' : 'reopened'
          return { ...task, completed: !task.completed }
        }
        return task
      }),
    )
    if (taskStatus === 'completed') toast.success('Task completed!')
    if (taskStatus === 'reopened') toast.success('Task reopened!')
  }

  const sortedTasks = [...tasks].sort((a, b) => b.createdAt - a.createdAt)

  return {
    tasks: sortedTasks,
    addTask,
    removeTask,
    updateTask,
    toggleTask,
  }
}

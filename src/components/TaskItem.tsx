import { useState, useRef, useEffect } from 'react'
import { Task } from '@/stores/tasks-store'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Input } from '@/components/ui/input'
import { cn } from '@/lib/utils'
import { Pencil, Trash2, Check as CheckIcon } from 'lucide-react'

interface TaskItemProps {
  task: Task
  onToggle: (id: string) => void
  onUpdate: (id: string, text: string) => boolean
  onRemove: (id: string) => void
}

export const TaskItem = ({
  task,
  onToggle,
  onUpdate,
  onRemove,
}: TaskItemProps) => {
  const [isEditing, setIsEditing] = useState(false)
  const [editText, setEditText] = useState(task.text)
  const [isDeleting, setIsDeleting] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (isEditing) {
      inputRef.current?.focus()
    }
  }, [isEditing])

  const handleSave = () => {
    if (onUpdate(task.id, editText)) {
      setIsEditing(false)
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSave()
    }
    if (e.key === 'Escape') {
      setEditText(task.text)
      setIsEditing(false)
    }
  }

  const handleRemove = () => {
    setIsDeleting(true)
  }

  return (
    <div
      onAnimationEnd={() => {
        if (isDeleting) {
          onRemove(task.id)
        }
      }}
      className={cn(
        'flex items-center gap-4 p-4 bg-white rounded-md shadow-subtle',
        isDeleting ? 'animate-fade-out-up' : 'animate-fade-in-down',
      )}
    >
      <Checkbox
        id={`task-${task.id}`}
        checked={task.completed}
        onCheckedChange={() => onToggle(task.id)}
        className="size-6 rounded-full data-[state=checked]:bg-primary data-[state=checked]:border-primary"
      />
      <div className="flex-1">
        {isEditing ? (
          <Input
            ref={inputRef}
            value={editText}
            onChange={(e) => setEditText(e.target.value)}
            onKeyDown={handleKeyDown}
            onBlur={handleSave}
            className="h-8 p-1 border-dashed bg-transparent"
          />
        ) : (
          <label
            htmlFor={`task-${task.id}`}
            className={cn(
              'font-medium text-slate-800 cursor-pointer transition-colors duration-200',
              task.completed && 'line-through text-slate-500',
            )}
          >
            {task.text}
          </label>
        )}
      </div>
      <div className="flex items-center gap-1">
        {isEditing ? (
          <Button
            variant="ghost"
            size="icon"
            className="rounded-full size-8"
            onClick={handleSave}
          >
            <CheckIcon className="size-4 text-green-500" />
          </Button>
        ) : (
          <Button
            variant="ghost"
            size="icon"
            className="rounded-full size-8 hover:bg-slate-50"
            onClick={() => setIsEditing(true)}
          >
            <Pencil className="size-4 text-slate-500 transition-colors group-hover:text-primary" />
          </Button>
        )}
        <Button
          variant="ghost"
          size="icon"
          className="rounded-full size-8 hover:bg-slate-50"
          onClick={handleRemove}
        >
          <Trash2 className="size-4 text-slate-500 transition-colors group-hover:text-destructive" />
        </Button>
      </div>
    </div>
  )
}

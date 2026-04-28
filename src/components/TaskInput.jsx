import { useState } from 'react'

function TaskInput({ onAddTask }) {
  const [taskText, setTaskText] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault() // Prevents the page from refreshing on submit
    if (taskText.trim()) {
      onAddTask(taskText) // Sending the task up to the parent component
      setTaskText('') // Clearing the input field
    }
  }

  return (
    <form className="task-input-form" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Add a new task..."
        value={taskText}
        onChange={(e) => setTaskText(e.target.value)}
      />
      <button type="submit">Add Task</button>
    </form>
  )
}

export default TaskInput

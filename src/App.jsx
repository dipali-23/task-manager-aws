import { useState } from 'react'
import TaskInput from './components/TaskInput'
import TaskList from './components/TaskList'
import { useTasks } from './hooks/useTasks'
import { filterTasks } from './utils/filters'
import './styles/App.css'

function App() {
  const { tasks, addTask, toggleTask, deleteTask } = useTasks()
  const [filter, setFilter] = useState('all')

  const filteredTasks = filterTasks(tasks, filter)

  return (
    <div className="app-container">
      <h1>Task Manager</h1>
      
      <TaskInput onAddTask={addTask} />

      <div className="filter-controls">
        <button 
          className={filter === 'all' ? 'active' : ''} 
          onClick={() => setFilter('all')}
        >
          All
        </button>
        <button 
          className={filter === 'pending' ? 'active' : ''} 
          onClick={() => setFilter('pending')}
        >
          Pending
        </button>
        <button 
          className={filter === 'completed' ? 'active' : ''} 
          onClick={() => setFilter('completed')}
        >
          Completed
        </button>
      </div>

      <TaskList 
        tasks={filteredTasks} 
        onToggle={toggleTask} 
        onDelete={deleteTask} 
      />
      
      <div className="task-stats">
        <p>{tasks.length} total tasks</p>
      </div>
    </div>
  )
}

export default App

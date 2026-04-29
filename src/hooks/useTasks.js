import { useState, useEffect } from 'react'

const API_URL = 'http://34.228.77.168:5001/tasks'

export function useTasks() {
  const [tasks, setTasks] = useState([])

  // 1. FETCH all tasks when the app loads
  useEffect(() => {
    fetch(API_URL)
      .then(res => res.json())
      .then(data => setTasks(data))
      .catch(err => console.error("Error fetching tasks:", err))
  }, [])

  // 2. ADD task to the backend
  const addTask = async (text) => {
    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text })
      })
      const newTask = await response.json()
      setTasks((prevTasks) => [...prevTasks, newTask])
    } catch (err) {
      console.error("Error adding task:", err)
    }
  }

  // 3. TOGGLE task completion on the backend
  const toggleTask = async (id) => {
    try {
      await fetch(`${API_URL}/${id}`, { method: 'PUT' })
      setTasks((prevTasks) =>
        prevTasks.map((task) =>
          task.id === id ? { ...task, completed: !task.completed } : task
        )
      )
    } catch (err) {
      console.error("Error toggling task:", err)
    }
  }

  // 4. DELETE task from the backend
  const deleteTask = async (id) => {
    try {
      await fetch(`${API_URL}/${id}`, { method: 'DELETE' })
      setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id))
    } catch (err) {
      console.error("Error deleting task:", err)
    }
  }

  return {
    tasks,
    addTask,
    toggleTask,
    deleteTask,
  }
}

import { useState, useEffect } from 'react'

const LOCAL_STORAGE_KEY = 'task-manager-tasks'

export function useTasks() {
  const [tasks, setTasks] = useState(() => {
    // Initialize state from localStorage if available
    const savedTasks = localStorage.getItem(LOCAL_STORAGE_KEY)
    return savedTasks ? JSON.parse(savedTasks) : []
  })

  // Save tasks to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(tasks))
  }, [tasks])

  const addTask = (text) => {
    const newTask = {
      id: Date.now(), // Modern way to get a unique simple ID
      text,
      completed: false,
    }
    setTasks((prevTasks) => [...prevTasks, newTask])
  }

  const toggleTask = (id) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    )
  }

  const deleteTask = (id) => {
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id))
  }

  return {
    tasks,
    addTask,
    toggleTask,
    deleteTask,
  }
}

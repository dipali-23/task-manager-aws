/**
 * Filters tasks based on their completion status.
 * 
 * @param {Array} tasks - Array of task objects
 * @param {String} filter - One of 'all', 'completed', or 'pending'
 * @returns {Array} - The filtered list of tasks
 */
export const filterTasks = (tasks, filter) => {
  switch (filter) {
    case 'completed':
      return tasks.filter((task) => task.completed)
    case 'pending':
      return tasks.filter((task) => !task.completed)
    default:
      return tasks // 'all'
  }
}

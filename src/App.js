import React, { useState, useRef, useEffect } from 'react';
import TodoList from './TodoList'
import { v4 as uuidv4 } from 'uuid'

const LOCAL_STORAGE_KEY = 'todoApp.tasks'

function App() {
  const [tasks, setTasks] = useState([])
  // Get user input
  const taskNameRef = useRef()

  /* A todolist save that will not disappear when page is reloaded
  Load our todo list once: when the App component is rendered
  To load it only once, we pass it an empty array of dependencies which will never change */
  useEffect(() => {
    const storedTasks = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY))
    if (storedTasks) setTasks(storedTasks)
  }, [])
  
  // A todolist save that will disappear when page is reloaded
  useEffect(() => {
    // Each time the todo list changes, we persist it by storing it in local storage
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(tasks))
  }, [tasks])

  function toggleTask(id) {
    // Always create copy to then change state
    const newTasks = [...tasks]
    const task = newTasks.find(task => task.id === id)
    task.complete = !task.complete
    setTasks(newTasks)
  }

  function handleAddTask(e) {
    const name = taskNameRef.current.value
    if (name === '') return
    setTasks(prevTasks => {
      // Use uuidv4 to generate a random id for each new task
      return [...prevTasks, { id: uuidv4(), name: name, complete: false}]
    })
    taskNameRef.current.value = null
  }

  function handleClearTasks() {
    const newTasks = tasks.filter(task => !task.complete)
    setTasks(newTasks)
  }

  return (
    <>
      <TodoList tasks={tasks} toggleTask={toggleTask} />
      <input ref={taskNameRef} type="text" />
      <button onClick={handleAddTask}>Add a task</button>
      <button onClick={handleClearTasks}>Clear all completed tasks</button>
      <div>{tasks.filter(task => !task.complete).length} left to do</div>
    </>
  )
}

export default App;
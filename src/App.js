import React, { useState } from 'react';
import TodoList from './TodoList';

function App() {
  useState([])
  return (
    <>
      <TodoList />
      <input type="text" />
      <button>Add a task</button>
      <button>Clear completed tasks</button>
      <div>0 left to do</div>
    </>
  )
}

export default App;

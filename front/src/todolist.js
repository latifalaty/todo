import React, { useEffect, useState } from 'react';
import axios from 'axios';

const App = () => {
  const [todos, setTodos] = useState([]);
  const [title, setTitle] = useState('');

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    const response = await axios.get('http://localhost:5000/todos');
    setTodos(response.data);
  };

  const addTodo = async () => {
    if (title.trim() !== '') {
      const response = await axios.post('http://localhost:5000/todos', {
        title,
        completed: false,
      });
      setTodos([...todos, response.data]);
      setTitle('');
    }
    window.alert("You can do it!")
  };

  const updateTodo = async (id, completed) => {
    await axios.put(`http://localhost:5000/todos/${id}`, { completed });
    const updatedTodos = todos.map((todo) => {
      if (todo._id === id) {
        todo.completed = completed;
      }
      return todo;
    });
    setTodos(updatedTodos);
  };

  const deleteTodo = async (id) => {
    await axios.delete(`http://localhost:5000/todos/${id}`);
    const updatedTodos = todos.filter((todo) => todo._id !== id);
    setTodos(updatedTodos);
  };

  return (
    <div className="row g-3">
      <h1>Todo List</h1>
      <input 
        
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Enter a todo"
        className="form-control"
      />
      <button className="btn btn-light" onClick={addTodo}>Add Todo</button>
      <ul>
        {todos.map((todo) => (
          <li className="input-group-text" key={todo._id}>
            <input
            class="form-check-input mt-0" 
              type="checkbox"
              checked={todo.completed}
              onChange={(e) => updateTodo(todo._id, e.target.checked)}
            />
            {todo.title}
           { /*espace entre le text et le bouton dans la meme ligne */}
            &nbsp;&nbsp;&nbsp;
            <button class="btn btn-danger" onClick={() => deleteTodo(todo._id)}>Delete</button>
          </li>
        ))}
      </ul>
      <br></br>
    </div>
  );
};

export default App;

import React, { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [text, setText] = useState("");
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/todos")
      .then((res) => setTodos(res.data));
  }, []);

  const addTodo = () => {
    axios
      .post("http://localhost:5000/api/todos", { text })
      .then((res) => setTodos([...todos, res.data]));
    setText("");
  };

  const deleteTodo = (id) => {
    axios
      .delete(`http://localhost:5000/api/todos/${id}`)
      .then(() => setTodos(todos.filter((todo) => todo._id !== id)));
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>To-Do List</h2>
      <input
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Enter task"
      />
      <button onClick={addTodo}>Add</button>
      <ul>
        {todos.map((todo) => (
          <li key={todo._id}>
            {todo.text}
            <button onClick={() => deleteTodo(todo._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;

import React, { useState, useEffect } from 'react';
function App() {
  const [todos, setTodos] = useState([]);
  const [text, setText] = useState("");

  useEffect(() => {
    fetch("/api/todos").then(res => res.json()).then(setTodos);
  }, []);

  const addTodo = async () => {
    const res = await fetch("/api/todos", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text })
    });
    const todo = await res.json();
    setTodos([...todos, todo]);
    setText("");
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Todo App</h1>
      <input value={text} onChange={e => setText(e.target.value)} />
      <button onClick={addTodo}>Add</button>
      <ul>{todos.map(t => <li key={t._id}>{t.text}</li>)}</ul>
    </div>
  );
}
export default App;

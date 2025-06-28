import React, { useState, useRef } from 'react';
import './App.css';

/**
 * Color scheme:
 * --primary:   #1976d2  (main blue)
 * --secondary: #424242  (dark gray)
 * --accent:    #ff9800  (orange)
 * Additionally using a very light background and minimal container shadow.
 */

// PUBLIC_INTERFACE
function App() {
  const [todos, setTodos] = useState([
    // Example default; you may start with an empty list if preferred.
    // { id: 1, text: 'Example todo', completed: false },
  ]);
  const [input, setInput] = useState('');
  const [editID, setEditID] = useState(null);
  const [editValue, setEditValue] = useState('');
  const inputRef = useRef(null);

  // PUBLIC_INTERFACE
  /** Add a new todo */
  const handleAddTodo = (e) => {
    e.preventDefault();
    const trimmed = input.trim();
    if (trimmed.length === 0) return;
    setTodos([
      ...todos,
      { id: Date.now(), text: trimmed, completed: false },
    ]);
    setInput('');
    inputRef.current && inputRef.current.focus();
  };

  // PUBLIC_INTERFACE
  /** Delete a todo by id */
  const handleDelete = (id) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  // PUBLIC_INTERFACE
  /** Start editing a todo */
  const handleEdit = (id, text) => {
    setEditID(id);
    setEditValue(text);
  };

  // PUBLIC_INTERFACE
  /** Save an edited todo */
  const handleEditSave = (e) => {
    e.preventDefault();
    const trimmed = editValue.trim();
    if (trimmed.length === 0) return;
    setTodos(
      todos.map(todo =>
        todo.id === editID ? { ...todo, text: trimmed } : todo
      )
    );
    setEditID(null);
    setEditValue('');
  };

  // PUBLIC_INTERFACE
  /** Mark a todo as completed/uncompleted */
  const handleToggleCompleted = (id) => {
    setTodos(
      todos.map(todo =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  // PUBLIC_INTERFACE
  /** Handle pressing Enter to save edited todo */
  const handleEditInputKey = (e) => {
    if (e.key === 'Enter') {
      handleEditSave(e);
    } else if (e.key === 'Escape') {
      setEditID(null);
      setEditValue('');
    }
  };

  return (
    <div className="todo-root">
      <header className="todo-header">
        <h1>Minimal Todo</h1>
      </header>

      <main>
        <form className="todo-form" onSubmit={handleAddTodo}>
          <input
            type="text"
            placeholder="Add a new todo…"
            value={input}
            onChange={e => setInput(e.target.value)}
            ref={inputRef}
            className="todo-input"
            aria-label="Add new todo"
            maxLength={120}
            autoFocus
          />
          <button
            type="submit"
            className="todo-add-btn"
            aria-label="Add todo"
            disabled={input.trim().length === 0}
          >
            +
          </button>
        </form>

        <ul className="todo-list">
          {todos.length === 0 && (
            <li className="empty-state">No todos yet.</li>
          )}
          {todos.map(todo => (
            <li
              key={todo.id}
              className={`todo-item${todo.completed ? ' completed' : ''}`}
            >
              {editID === todo.id ? (
                <form
                  className="edit-form"
                  onSubmit={handleEditSave}
                  style={{ width: '100%' }}
                >
                  <input
                    type="text"
                    value={editValue}
                    onChange={e => setEditValue(e.target.value)}
                    onKeyDown={handleEditInputKey}
                    className="edit-input"
                    maxLength={120}
                    autoFocus
                  />
                  <button
                    type="submit"
                    className="icon-btn save-btn"
                    aria-label="Save"
                    title="Save"
                  >
                    ✓
                  </button>
                  <button
                    type="button"
                    className="icon-btn cancel-btn"
                    aria-label="Cancel"
                    title="Cancel"
                    onClick={() => {
                      setEditID(null);
                      setEditValue('');
                    }}
                  >
                    ×
                  </button>
                </form>
              ) : (
                <>
                  <button
                    className="icon-btn checkbox"
                    aria-label={
                      todo.completed ? 'Mark as not completed' : 'Mark as completed'
                    }
                    onClick={() => handleToggleCompleted(todo.id)}
                    tabIndex={0}
                    style={{
                      color: todo.completed ? 'var(--accent)' : 'var(--secondary)'
                    }}
                  >
                    {todo.completed ? '✔' : '○'}
                  </button>
                  <span
                    className="todo-text"
                    style={{
                      textDecoration: todo.completed ? 'line-through' : 'none',
                      color: todo.completed
                        ? 'var(--secondary)'
                        : 'var(--primary)'
                    }}
                  >
                    {todo.text}
                  </span>
                  <div className="actions">
                    <button
                      className="icon-btn edit-btn"
                      aria-label="Edit"
                      title="Edit"
                      onClick={() => handleEdit(todo.id, todo.text)}
                    >
                      ✎
                    </button>
                    <button
                      className="icon-btn delete-btn"
                      aria-label="Delete"
                      title="Delete"
                      onClick={() => handleDelete(todo.id)}
                    >
                      🗑
                    </button>
                  </div>
                </>
              )}
            </li>
          ))}
        </ul>
      </main>

      <footer className="todo-footer">
        <small>
          <span style={{ color: 'var(--secondary)' }}>Light, minimal todo &mdash; React</span>
        </small>
      </footer>
    </div>
  );
}

export default App;

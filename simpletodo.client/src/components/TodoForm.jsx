import React, { useState, useEffect } from "react";

const TodoForm = ({ addTodo }) => {
  const [todoText, setTodoText] = useState("");

  const [priorities, setPriorities] = useState([]);
  const [selectedPriority, setSelectedPriority] = useState("");

  useEffect(() => {
    // Метод для загрузки приоритетов
    async function fetchPriorities() {
      const URL = "api/ToDo/priorities";
      const options = {
        method: "GET",
        headers: new Headers(),
      };
      try {
        const response = await fetch(URL, options);
        if (!response.ok) {
          throw new Error("Ошибка при загрузке приоритетов");
        }
        const data = await response.json();
        setPriorities(data);
      } catch (error) {
        console.error(error.message);
      }
    }

    fetchPriorities();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!todoText.trim()) return;
    addTodo(todoText);
    setTodoText("");
  };

  return (
    <div class="todo-form">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={todoText}
          onChange={(e) => setTodoText(e.target.value)}
          placeholder="Enter a new todo..."
        />
        <button type="submit">Add Todo</button>
      </form>
      <p class="todo-form-title">Create todo</p>

      <div class="todo-title">
        <p class="todo-form-label">Task title</p>
        <input
          id="todo-title-id"
          class="inputTodoCreation"
          type="text"
          placeholder="Enter title..."
        />
      </div>

      <div class="todo-priority">
        <p class="todo-form-label">Task priority</p>
        <select
          id="todo-priority-id"
          class="selectTodoCreation"
          value={selectedPriority}
          onChange={(e) => setSelectedPriority(e.target.value)}
        >
          <option value="">Select priority</option>
          {priorities.map((priority, index) => (
            <option key={index} value={priority.value}>
              {priority.name}
            </option>
          ))}
        </select>
      </div>

      <div class="todo-description">
        <p class="todo-form-label">Task description</p>
        <textarea
          id="todo-description-id"
          class="textareaTodoCreation"
          placeholder="Enter text..."
        />
      </div>

      <button onClick={() => addTodo()}>Add task</button>
    </div>
  );
};

export default TodoForm;

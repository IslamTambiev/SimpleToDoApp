import React, { useState, useEffect } from "react";
import { todoService } from "../../services/todo_service";

const TodoForm = ({ addTodo }) => {
  const [priorities, setPriorities] = useState([]);
  const [selectedPriority, setSelectedPriority] = useState("1");

  // Метод для загрузки приоритетов
  async function fetchPriorities() {
    const data = await todoService.getPriorities();
    setPriorities(data);
  }

  useEffect(() => {
    fetchPriorities();
  }, []);

  return (
    <div className="todo-form">
      <p className="todo-form-title">Create todo</p>

      <div className="todo-title">
        <p className="todo-form-label">Task title</p>
        <input
          id="todo-title-id"
          className="inputTodoCreation"
          type="text"
          placeholder="Enter title..."
        />
      </div>

      <div className="todo-priority">
        <p className="todo-form-label">Task complexity</p>
        <select
          id="todo-priority-id"
          className="selectTodoCreation"
          title="Выберите приоритет"
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

      <div className="todo-description">
        <p className="todo-form-label">Task description</p>
        <textarea
          id="todo-description-id"
          className="textareaTodoCreation"
          placeholder="Enter text..."
        />
      </div>

      <button onClick={() => addTodo()}>Add task</button>
    </div>
  );
};

export default TodoForm;

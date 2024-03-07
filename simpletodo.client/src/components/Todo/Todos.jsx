import React, { useState, useEffect } from "react";
import TodoForm from "./TodoForm";
import TodoList from "./TodoList";
import TodoTable from "./TodoTable";
import { todoService } from "../../services/todo_service";

const TodoApp = () => {
  const [todos, setTodos] = useState([]);
  const [pending, setPending] = useState(true);

  useEffect(() => {
    getTodos();
  }, []);

  const getTodos = async () => {
    const data = await todoService.getTodos();
    setTodos(data.data);
    setPending(false);
  };

  const addTodo = async () => {
    const todoTitleElement = document.querySelector("#todo-title-id");
    const todoPriorityElement = document.querySelector("#todo-priority-id");
    const todoDescriptionElement = document.querySelector(
      "#todo-description-id"
    );
    const todoTitle = todoTitleElement.value;
    const todoPriority = parseInt(todoPriorityElement.value);
    const todoDescription = todoDescriptionElement.value;

    const todoItemRaw = {
      name: todoTitle,
      priority: todoPriority,
      description: todoDescription,
    };
    const todoItem = JSON.stringify(todoItemRaw);

    const response = await todoService.createTodo(todoItem);
    if (response)
      if (response.status !== 200) {
        console.log("error not created todo");
        console.log(response.data.description);
      } else {
        console.log("created todo");
        console.log(response.data.description);

        // Очистка полей
        todoTitleElement.value = "";
        todoPriorityElement.value = "1";
        todoDescriptionElement.value = "";
        // todos.push(todoItem);
        // setTodos(todos.slice());
        // setTodos([...todos, todoItemRaw]);
        // console.log(todos);
        getTodos();
      }
  };

  const deleteTodo = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  return (
    <div>
      <h1>Todo App</h1>
      <TodoForm addTodo={addTodo} />
      <br />
      {/* <TodoList todos={todos} deleteTodo={deleteTodo} /> */}
      <TodoTable data={todos} pending={pending} />
    </div>
  );
};

export default TodoApp;
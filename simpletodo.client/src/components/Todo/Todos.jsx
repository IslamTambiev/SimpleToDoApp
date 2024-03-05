import React, { useState, useEffect } from "react";
import TodoForm from "./TodoForm";
import TodoList from "./TodoList";
import TodoTable from "./TodoTable";

const URL = "api/ToDo";

const TodoApp = () => {
  const [todos, setTodos] = useState([]);

  // useEffect(() => {
  //   fetch(URL)
  //     .then((response) => response.json())
  //     .then((data) => setTodos(data))
  //     .catch((error) => console.error("Error fetching todos:", error));
  // }, []);

  const adddf = (text) => {
    const newTodo = { id: Date.now(), text };
    setTodos([...todos, newTodo]);
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

    const headers = new Headers();
    headers.set("Content-Type", "application/json");

    const todoItem = JSON.stringify({
      name: todoTitle,
      priority: todoPriority,
      description: todoDescription,
    });

    const options = {
      method: "Post",
      headers: headers,
      body: todoItem,
    };
    const response = await fetch(URL, options)
      .then((response) => {
        if (response.ok) {
          console.log("created todo");
          // Clear the fields
          todoTitleElement.value = "";
          todoPriorityElement.value = "1";
          todoDescriptionElement.value = "";

          // todos.push(todoItem);
          // setTodos(todos.slice());
        } else {
          console.log("error not created todo");
          // throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        const description = data.description;
        console.log(description);
      })
      .catch((error) => {
        console.error("There was a problem with the fetch operation:", error);
      });
  };

  const deleteTodo = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  return (
    <div>
      <h1>Todo App</h1>
      <TodoForm addTodo={addTodo} />
      <TodoList todos={todos} deleteTodo={deleteTodo} />
      <TodoTable />
    </div>
  );
};

export default TodoApp;

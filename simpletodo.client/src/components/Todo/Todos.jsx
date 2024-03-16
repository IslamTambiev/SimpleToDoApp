import React, { useState, useEffect } from "react";
import TodoForm from "./TodoForm";
import TodoList from "./TodoList";
import TodoTable from "./TodoTable";
import { todoService } from "../../services/todo_service";
import { Toast } from "../../services/notifications";

// MySwal.fire({
//   title: <p>Hello World</p>,
//   didOpen: () => {
//     // `MySwal` is a subclass of `Swal` with all the same instance & static methods
//     MySwal.showLoading();
//   },
// }).then(() => {
//   return MySwal.fire(<p>Shorthand works too</p>);
// });

const TodoApp = () => {
  const [todos, setTodos] = useState([]);
  const [pending, setPending] = useState(true);

  useEffect(() => {
    getTodos();
  }, []);

  const getTodos = async () => {
    const todoTitleElement = document.querySelector("#get-todo-title-id");
    const todoPriorityElement = document.querySelector("#get-todo-priority-id");

    const todoTitle = todoTitleElement.value;
    const todoPriority = parseInt(todoPriorityElement.value);

    const todoItemRaw = {
      name: todoTitle,
      priority: todoPriority,
    };
    const todoSearchData = JSON.stringify(todoItemRaw);

    const data = await todoService.getTodos(todoSearchData);
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
        await Toast.fire({
          icon: "error",
          title: response.data.description,
        });
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
        await Toast.fire({
          icon: "success",
          title: response.data.description,
        });
      }
  };

  // const deleteTodo = (id) => {
  //   setTodos(todos.filter((todo) => todo.id !== id));
  // };

  return (
    <div className="m-3">
      <h1>Todo App</h1>
      <div className="row">
        <div className="col">
          <TodoForm addTodo={addTodo} />
        </div>
        <div className="col">
          <TodoList todos={todos} />
        </div>
        <div className="col">
          <TodoTable data={todos} pending={pending} getTodos={getTodos} />
        </div>
      </div>
    </div>
  );
};

export default TodoApp;

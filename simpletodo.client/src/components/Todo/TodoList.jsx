import React, { useEffect } from "react";
import { todoService } from "../../services/todo_service";

const TodoList = ({ todos }) => {
  useEffect(() => {
    todoService.getCompletedTodos().then((todos) => {
      document.querySelector("#countOfCompletedTasks").innerHTML =
        todos.data.length;
      document.querySelector("#listOfCompletedTasks").innerHTML = todos.data
        .map(
          (d) =>
            `<li class="list-group-item d-flex justify-content-between lh-condensed" style="background-color: #479c3e;">
            <div>
              <h6 class="my-0">${d.name}</h6>
              <small class="text-muted">${d.description}</small>
            </div>
          </li>`
        )
        .join("");
      console.log(todos);
    });

    // document.querySelector("#countOfCompletedTasks").innerHTML = todos.filter(
    //   (d) => d.isDone === "Выполнено"
    // ).length;
    // document.querySelector("#listOfCompletedTasks").innerHTML = todos
    //   .filter((d) => d.isDone === "Выполнено")
    //   .map(
    //     (d) =>
    //       `<li class="list-group-item d-flex justify-content-between lh-condensed" style="background-color: #479c3e;">
    //         <div>
    //           <h6 class="my-0">${d.name}</h6>
    //           <small class="text-muted">${d.description}</small>
    //         </div>
    //       </li>`
    //   )
    //   .join("");
  });

  return (
    <>
      <h4 className="d-flex justify-content-between align-items-center mb-3">
        <span className="text-muted">Выполненные задачи</span>
        <span
          className="badge badge-secondary badge-pill text-muted"
          id="countOfCompletedTasks"
        ></span>
      </h4>
      <ul className="list-group mb-3" id="listOfCompletedTasks"></ul>
      <form>
        <div className="card col-md-12">
          <button type="submit" className="btn btn-secondary ">
            Закончить день
          </button>
        </div>
      </form>
      <br />
      <div className="form-group">
        <label>Заметки для себя</label>
        <textarea className="form-control " cols="30" rows="10"></textarea>
      </div>
    </>
  );
};

export default TodoList;

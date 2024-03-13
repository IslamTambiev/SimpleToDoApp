import React, { useState, useEffect } from "react";

import DataTable from "react-data-table-component";
import { CustomLoader, customStyles } from "./tableStyles";
import { todoService } from "../../services/todo_service";

const TodoTable = ({ data, pending, getTodos }) => {
  const [priorities, setPriorities] = useState([]);
  const [selectedPriority, setSelectedPriority] = useState("");

  // Метод для загрузки приоритетов
  async function fetchPriorities() {
    const data = await todoService.getPriorities();
    setPriorities(data);
  }

  useEffect(() => {
    fetchPriorities();
  }, []);

  const columns = [
    // {
    //   name: "ID",
    //   selector: (row) => row.id,
    //   sortable: true,
    //   // center: "true",
    //   width: "70px",
    // },
    {
      name: "Название",
      selector: (row) => row.name,
      sortable: true,
    },
    {
      name: "Статус",
      selector: (row) => row.isDone,
      sortable: true,
      center: "true",
    },
    {
      name: "Приоритет",
      selector: (row) => row.priority,
      sortable: true,
      center: "true",
    },
    {
      name: "Описание",
      selector: (row) => row.description,
      sortable: true,
    },
    // {
    //   name: "Дата создания",
    //   selector: (row) => row.created,
    //   sortable: true,
    // },
    {
      name: "Действие",
      cell: (row) => (
        <button
          className="btn btn-success"
          onClick={() => {
            todoService.completeTodo(row.id);
          }}
        >
          Выполнить
        </button>
      ),
      center: "true",
    },
  ];

  return (
    <div>
      <div className="row m-2">
        <div className="form-group col-sm-6">
          <label className="col-form-label">Название</label>
          <input
            type="text"
            name="nameTask"
            id="get-todo-title-id"
            className="form-control"
            onChange={() => {
              getTodos();
            }}
          />
        </div>
        <div className="form-group col-sm-6">
          <label className="col-form-label">Приоритет</label>
          <select
            id="get-todo-priority-id"
            className="form-control"
            value={selectedPriority}
            onChange={(e) => {
              setSelectedPriority(e.target.value);
              getTodos();
            }}
          >
            <option value="">Select priority</option>
            {priorities.map((priority, index) => (
              <option key={index} value={priority.value}>
                {priority.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      <br />

      <DataTable
        title="Список задач"
        columns={columns}
        data={data}
        highlightOnHover
        pagination
        responsive
        striped
        customStyles={customStyles}
        theme="dark"
        progressComponent={<CustomLoader />}
        progressPending={pending}
      />
    </div>
  );
};

export default TodoTable;

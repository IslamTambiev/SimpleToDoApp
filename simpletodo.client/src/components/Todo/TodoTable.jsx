import React, { useState, useEffect } from "react";

import DataTable from "react-data-table-component";
import { CustomLoader, customStyles } from "./tableStyles";
import { todoService } from "../../services/todo_service";
import { Toast, swalWithBootstrapButtons } from "../../services/notifications";

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

  const handleComplete = async (id) => {
    swalWithBootstrapButtons.fire().then(async (result) => {
      if (result.isConfirmed) {
        const response = await todoService.completeTodo(id);
        if (response)
          if (response.status !== 200) {
            await Toast.fire({
              icon: "error",
              title: response.data.description,
            });
          } else {
            getTodos();
            await Toast.fire({
              icon: "success",
              title: response.data.description,
            });
          }
      }
    });
  };

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
            handleComplete(row.id);
          }}
        >
          Выполнить
        </button>
      ),
      center: "true",
    },
  ];

  // const conditionalRowStyles = [
  //   {
  //     when: (row) => row.isDone === "Выполнено",
  //     style: {
  //       visibility: "hidden",
  //     },
  //   },
  // ];

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
            placeholder="Введите название задачи"
          />
        </div>
        <div className="form-group col-sm-6">
          <label className="col-form-label">Приоритет</label>
          <select
            id="get-todo-priority-id"
            className="form-control"
            title="Выберите приоритет"
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
        data={data.filter((d) => d.isDone === "Не выполнено")}
        highlightOnHover
        pagination
        responsive
        striped
        customStyles={customStyles}
        // conditionalRowStyles={conditionalRowStyles}
        theme="dark"
        progressComponent={<CustomLoader />}
        progressPending={pending}
      />
    </div>
  );
};

export default TodoTable;

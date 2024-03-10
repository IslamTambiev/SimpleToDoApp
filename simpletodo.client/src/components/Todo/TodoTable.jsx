import React, { useState, useEffect } from "react";

import DataTable from "react-data-table-component";
import { CustomLoader, customStyles } from "./tableStyles";
import { todoService } from "../../services/todo_service";
import { FormControl, FormGroup, FormLabel, Row } from "react-bootstrap";

const TodoTable = ({ data, pending }) => {
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
  ];

  return (
    <div>
      <div className="row m-2">
        <div className="form-group col-sm-6">
          <label className="col-form-label">Название</label>
          <input type="text" name="nameTask" id="" className="form-control" />
        </div>
        <div className="form-group col-sm-6">
          <label className="col-form-label">Приоритет</label>
          <select
            id="search-priority-id"
            className="form-control"
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
      </div>
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

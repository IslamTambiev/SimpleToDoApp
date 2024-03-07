import React, { useState, useEffect } from "react";

import DataTable from "react-data-table-component";
import { CustomLoader, customStyles } from "./tableStyles";

const URL = "api/ToDo";

const TodoTable = ({ data, pending }) => {
  const columns = [
    {
      name: "ID",
      selector: (row) => row.id,
      sortable: true,
      // center: "true",
      width: "70px",
    },
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
    {
      name: "Дата создания",
      selector: (row) => row.created,
      sortable: true,
    },
  ];

  return (
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
  );
};

export default TodoTable;

import axios from "axios";
import React, { useState, useEffect } from "react";
import styled, { keyframes } from "styled-components";
import DataTable from "react-data-table-component";

const URL = "api/ToDo";

const rotate360 = keyframes`
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
`;

const Spinner = styled.div`
  margin: 16px;
  animation: ${rotate360} 1s linear infinite;
  transform: translateZ(0);
  border-top: 2px solid grey;
  border-right: 2px solid grey;
  border-bottom: 2px solid grey;
  border-left: 4px solid black;
  background: transparent;
  width: 40px;
  height: 40px;
  border-radius: 50%;
`;
const CustomLoader = () => (
  <div style={{ padding: "24px" }}>
    <Spinner />
    <div>Loading...</div>
  </div>
);

const TodoTable = () => {
  const [pending, setPending] = useState(true);
  const [data, setData] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get(URL);
      setData(response.data.data);
      setPending(false);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const columns = [
    {
      name: "ID",
      selector: (row) => row.id,
      sortable: true,
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
    },
    {
      name: "Приоритет",
      selector: (row) => row.priority,
      sortable: true,
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
  const customStyles = {
    headRow: {
      style: {
        border: "none",
      },
    },
    headCells: {
      style: {
        color: "#202124",
        fontSize: "14px",
      },
    },
    rows: {
      highlightOnHoverStyle: {
        backgroundColor: "rgb(40, 40, 40)",
        borderBottomColor: "#FFFFFF",
        borderRadius: "25px",
        outline: "1px solid #FFFFFF",
      },
    },
    pagination: {
      style: {
        border: "none",
      },
    },
  };

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

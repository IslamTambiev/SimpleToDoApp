import styled, { keyframes } from "styled-components";

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

const customStyles = {
  table: {
    style: {
      padding: "0px 10px 0px 10px",
    },
  },
  header: {
    style: {
      borderRadius: "10px 10px 0px 0px",
    },
  },
  headRow: {
    style: {
      border: "none",
    },
  },
  headCells: {
    style: {
      fontSize: "16px",
    },
  },
  rows: {
    style: {
      borderRadius: "10px",
    },
    highlightOnHoverStyle: {
      backgroundColor: "rgb(40, 40, 40)",
      borderBottomColor: "#FFFFFF",
      borderRadius: "10px",
      outline: "1px solid #FFFFFF",
    },
  },
  pagination: {
    style: {
      borderRadius: "0px 0px 10px 10px",
      border: "none",
    },
  },
};

export { customStyles, CustomLoader };

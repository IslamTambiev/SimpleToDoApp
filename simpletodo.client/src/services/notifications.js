import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const MySwal = withReactContent(Swal);

const Toast = MySwal.mixin({
  toast: true,
  position: "top-end",
  iconColor: "white",
  //   width: "300px",
  padding: "7px",
  customClass: {
    popup: "colored-toast",
  },
  showConfirmButton: false,
  timer: 2000,
  timerProgressBar: true,
  didOpen: (toast) => {
    toast.onmouseenter = MySwal.stopTimer;
    toast.onmouseleave = MySwal.resumeTimer;
  },
});

const swalWithBootstrapButtons = MySwal.mixin({
  customClass: {
    confirmButton: "btn btn-success ",
  },
  buttonsStyling: false,
  background: "#222",
  color: "#fff",
  title: "Вы уверены?",
  icon: "warning",
  confirmButtonText: "Да!",
});

// (async () => {
//   await Toast.fire({
//     icon: "success",
//     title: "Задача добавлена",
//   });
//   await Toast.fire({
//     icon: "error",
//     title: "Задача не добавлена",
//   });
// })();

export { MySwal, Toast, swalWithBootstrapButtons };

import "./App.css";
import { BrowserRouter, useRoutes, Link } from "react-router-dom";
import Posts from "./components/Posts";
import Wheather from "./components/Weather";
import TodoApp from "./components/Todo/Todos";

function AppRoutes() {
  const element = useRoutes([
    {
      path: "/todos",
      element: <TodoApp />,
    },
    {
      path: "/",
      element: <Wheather />,
    },
    {
      path: "/posts",
      element: <Posts />,
    },
  ]);
  return element;
}

function App() {
  return (
    <BrowserRouter>
      <nav style={{ margin: 10 }}>
        <ul>
          <li>
            <Link to="/todos" style={{ padding: 5 }}>
              Todos
            </Link>
          </li>
          <li>
            <Link to="/" style={{ padding: 5 }}>
              Wheather
            </Link>
          </li>
          <li>
            <Link to="/posts" style={{ padding: 5 }}>
              Posts
            </Link>
          </li>
        </ul>
      </nav>
      <AppRoutes />
    </BrowserRouter>
  );
}

export default App;

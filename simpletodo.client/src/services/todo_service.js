import axios from "axios";

const URL = "api/ToDo";

class TodoService {
  async getAllTodos() {
    try {
      const response = await axios.get(URL);
      if (response.status !== 200) {
        throw new Error("Ошибка при загрузке задач");
      }
      return response.data;
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }

  async getTodos(data) {
    try {
      const response = await axios.post(URL + "/task-handler", data, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (response.status !== 200) {
        throw new Error("Ошибка при загрузке задач");
      }
      return response.data;
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }

  async createTodo(todoItem) {
    try {
      const response = await axios
        .post(URL, todoItem, {
          headers: {
            "Content-Type": "application/json",
          },
        })
        .catch((error) => {
          return error.response;
        });
      return response;
    } catch (error) {
      console.error("Error creating todo:", error);
    }
  }

  async getPriorities() {
    try {
      const response = await axios.get(URL + "/priorities");
      if (response.status !== 200) {
        throw new Error("Ошибка при загрузке приоритетов");
      }
      return response.data;
    } catch (error) {
      console.error("Error fetching priorities:", error);
    }
  }

  async completeTodo(id) {
    try {
      const response = await axios
        .post(URL + "/complete-task", null, {
          params: { id: id },
          headers: {
            "Content-Type": "application/json",
          },
        })
        .catch((error) => {
          return error.response;
        });
      return response;
    } catch (error) {
      console.error("Error completing todo:", error);
    }
  }
}
export const todoService = new TodoService();

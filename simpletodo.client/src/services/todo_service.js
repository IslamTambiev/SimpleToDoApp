import axios from "axios";

const URL = "api/ToDo";

class TodoService {
  async getTodos() {
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
}
export const todoService = new TodoService();

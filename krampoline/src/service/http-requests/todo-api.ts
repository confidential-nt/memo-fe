import axios from "axios";
import { TodoApiRoute } from "../../common/route";

export async function getTodos() {
  return axios
    .get(TodoApiRoute.TO_DOS)
    .then((res) => res.data)
    .catch(console.log);
}

export async function getTodo(todoId: string) {
  return axios
    .get(TodoApiRoute.TO_DO(todoId))
    .then((res) => res.data)
    .catch(console.log);
}
export async function getTodosInProgress() {
  return axios
    .get(TodoApiRoute.TO_DO_IN_PROGRESS)
    .then((res) => res.data)
    .catch(console.log);
}

export async function addTodo() {
  return axios.post(TodoApiRoute.TO_DOS, {});
}

export async function deleteTodo(todoId: string) {
  return axios.delete(TodoApiRoute.TO_DO(todoId));
}
export async function updateTodo(todoId: string) {
  return axios.patch(TodoApiRoute.TO_DO(todoId));
}

export async function addQuickInputTodo(todo: string) {
  return axios.post(TodoApiRoute.TO_DO_QUICK_INPUT, todo);
}

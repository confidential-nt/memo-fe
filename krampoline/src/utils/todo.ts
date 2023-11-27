type TodoFromServer = {
  id: number;
  content: " 밥먹기";
  startTime: string;
  endTime: string;
  status: string;
  createdAt: string;
  updatedAt: string;
};

export function transformData(todos: TodoFromServer[]) {
  return todos.map((todo) => ({
    id: String(todo.id),
    title: todo.content,
    start: new Date(todo.startTime),
    end: new Date(todo.endTime),
    status: todo.status,
  }));
}

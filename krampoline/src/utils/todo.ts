type TodoFromServer = {
  id: number;
  content: " 밥먹기";
  startTime: string;
  endTime: string;
  status: string;
  createdAt: string;
  updatedAt: string;
};

export function transformData(todos: TodoFromServer[], IdNumber?: boolean) {
  if (!todos) return [];
  return todos.map((todo) => ({
    id: IdNumber ? todo.id : String(todo.id),
    title: todo.content,
    start: new Date(todo.startTime),
    end: new Date(todo.endTime),
    status: todo.status,
  }));
}

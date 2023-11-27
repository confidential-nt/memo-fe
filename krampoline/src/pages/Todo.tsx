import { useState, useEffect } from "react";
import Tasks from "../components/todo/Tasks";
import useTodo from "../hooks/useTodo";
import { transformData } from "../utils/todo";

export type TodoItem = {
  id: number;
  title: string;
  status: string;
  start: Date;
  end: Date;
};

function Todo() {
  const [todos, setTodos] = useState<TodoItem[]>([]);
  const { todoQuery } = useTodo();

  useEffect(() => {
    const initialTodosJSON = localStorage.getItem("eventsData");
    if (initialTodosJSON) {
      const initialTodos = JSON.parse(initialTodosJSON) as TodoItem[];
      const todosWithDatesConverted = initialTodos.map((todo) => ({
        ...todo,
        start: new Date(todo.start),
        end: new Date(todo.end),
      }));
      console.log(todoQuery.data);
      setTodos([
        ...todosWithDatesConverted,
        ...(transformData(todoQuery.data, true) as TodoItem[]),
      ]);
    } else {
      setTodos([]);
    }
  }, [todoQuery.data]);
  console.log(todos);
  const today = new Date();

  const todayTodos = todos.filter(
    (todo) =>
      todo.start.toDateString() === today.toDateString() &&
      todo.end.toDateString() === today.toDateString()
  );

  const inProgressTodos = todos.filter(
    (todo) =>
      todo.start < today &&
      todo.end > today &&
      !todayTodos.some((todayTodo) => todayTodo.id === todo.id)
  );

  const handleUpdate = (updated: TodoItem) => {
    const updatedTodos = todos.map((t) => (t.id === updated.id ? updated : t));
    updateAndStoreTodos(updatedTodos);
  };

  const handleDelete = (deleted: TodoItem) => {
    const deletedTodos = todos.filter((t) => t.id !== deleted.id);
    updateAndStoreTodos(deletedTodos);
  };

  const updateAndStoreTodos = (updatedTodos: TodoItem[]) => {
    setTodos(updatedTodos);
    localStorage.setItem("eventsData", JSON.stringify(updatedTodos));
  };

  return (
    <div className="pb-16 md:flex flex-row justify-between mx-4">
      <div className="flex flex-col m-4 pb-6 md:w-1/2">
        <label className="w-32 h-10 shrink-0 bg-amber-400 border-black border-2 rounded-full flex items-center font-bold justify-center my-2">
          오늘 할 일
        </label>
        <Tasks
          todos={todayTodos}
          onDelete={handleDelete}
          onUpdate={handleUpdate}
        />
      </div>
      <div className="flex flex-col m-4 md:w-1/2">
        <label className="w-32 h-10 shrink-0 bg-amber-500 border-black border-2 rounded-full flex items-center font-bold justify-center my-2">
          진행 중 할 일
        </label>
        <Tasks
          todos={inProgressTodos}
          onDelete={handleDelete}
          onUpdate={handleUpdate}
        />
      </div>
    </div>
  );
}

export default Todo;

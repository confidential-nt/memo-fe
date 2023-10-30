import { useState, useEffect } from "react";
import Tasks from "../components/Tasks";

export type TodoItem = {
  id: string;
  content: string;
  status: string;
};

function Todo() {
  const [todos, setTodos] = useState<TodoItem[]>([]);

  useEffect(() => {
    fetch(`data/todos.json`)
      .then((res) => res.json())
      .then((data) => {
        setTodos(data);
      });
  }, []);

  const handleUpdate = (updated: TodoItem) => {
    setTodos(todos.map((t) => (t.id === updated.id ? updated : t)));
  };

  const handleDelete = (deleted: TodoItem) => {
    setTodos(todos.filter((t) => t.id !== deleted.id));
  };

  return (
    <div className="pb-16">
      <div className="flex flex-col m-4">
        <label className="w-32 h-10 shrink-0 bg-amber-400 border-black border-2 rounded-full flex items-center font-bold justify-center my-2">
          오늘 할 일
        </label>
        <Tasks todos={todos} onDelete={handleDelete} onUpdate={handleUpdate} />
      </div>
      <div className="flex flex-col m-4">
        <label className="w-32 h-10 shrink-0 bg-amber-500 border-black border-2 rounded-full flex items-center font-bold justify-center my-2">
          진행 중 할 일
        </label>
        <Tasks todos={todos} onDelete={handleDelete} onUpdate={handleUpdate} />
      </div>
    </div>
  );
}

export default Todo;

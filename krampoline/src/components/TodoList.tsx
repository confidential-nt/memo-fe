import React, { useState, useEffect } from "react";
import Task from "../components/Task";

function Todo() {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    fetch(`data/todos.json`)
      .then((res) => res.json())
      .then((data) => {
        setTodos(data);
      });

    return () => {
      console.log("cleanup");
    };
  }, []);

  // useEffect(() => {
  //   localStrage.setItem("todos", JSON.stringify(todos));
  // }, [todos]);

  const handleUpdate = (updated) => {
    setTodos(todos.map((t) => (t.id === updated.id ? updated : t)));
  };

  const handleDelete = (deleted) => {
    setTodos(todos.filter((t) => t.id !== deleted.id));
  };

  return (
    <div>
      <button className="w-28 h-10 shrink-0 bg-amber-400 border-black border-2 rounded-full flex items-center font-bold justify-center my-4">
        오늘
      </button>
      <ul>
        {todos.map((item) => (
          <Task
            key={item.id}
            todo={item}
            onUpdate={handleUpdate}
            onDelete={handleDelete}
          />
        ))}
      </ul>
    </div>
  );
}

// function readTodos() {
//   const todos = localStrage.getItem("todos");
//   return todos ? JSON.parse(todos) : [];
// }

export default Todo;

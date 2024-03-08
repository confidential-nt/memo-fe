import { useState, ChangeEvent, useEffect } from "react";
import TaskContent from "./TaskContent";

import { TodoItem } from "../../pages/Todo";
import TaskForm from "./TaskForm";

type Props = {
  todo: TodoItem;
  onUpdate: (todo: TodoItem) => void;
  onDelete: (todo: TodoItem) => void;
};

function Task({ todo, onUpdate, onDelete }: Props) {
  const { id, title } = todo;
  const [isEditing, setIsEditing] = useState(false);
  const [editedContent, setEditedContent] = useState(title);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const updatedStatus = e.target.checked ? "completed" : "active";
    onUpdate({ ...todo, status: updatedStatus });

    const updatedTodo = { ...todo, status: updatedStatus };
    localStorage.setItem(`todo_${id}`, JSON.stringify(updatedTodo));
  };

  const handleDelete = () => onDelete(todo);

  const handleEditChange = (e: ChangeEvent<HTMLInputElement>) => {
    setEditedContent(e.target.value);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const updatedTodo = { ...todo, title: editedContent };
    localStorage.setItem(`todo_${id}`, JSON.stringify(updatedTodo));
    onUpdate(updatedTodo);
    setIsEditing(false);
  };

  useEffect(() => {
    const savedTodo = localStorage.getItem(`todo_${id}`);
    if (savedTodo) {
      const parsedTodo = JSON.parse(savedTodo);
      setEditedContent(parsedTodo.title);
    }
  }, [id]);

  return (
    <li className="flex justify-between items-center w-30 h-12 shrink-0 border-black border-2 rounded-[15px] shadow-standard bg-white my-4">
      {isEditing ? (
        <TaskForm
          onEditChange={handleEditChange}
          onSubmit={handleSubmit}
          onChangeEditState={() => setIsEditing(false)}
          editedContent={editedContent}
        />
      ) : (
        <TaskContent
          {...todo}
          onChange={handleChange}
          onChangeEditState={() => setIsEditing(true)}
          onDelete={handleDelete}
        />
      )}
    </li>
  );
}

export default Task;

import { useState, ChangeEvent, useEffect } from "react";
import Checkbox from "@mui/material/Checkbox";
import { MdOutlineCreate, MdOutlineSaveAlt } from "react-icons/md";
import { HiOutlineBackspace, HiOutlineTrash } from "react-icons/hi";
import { TodoItem } from "../../pages/Todo";

type Props = {
  todo: TodoItem;
  onUpdate: (todo: TodoItem) => void;
  onDelete: (todo: TodoItem) => void;
};

function Task({ todo, onUpdate, onDelete }: Props) {
  const { id, title, status } = todo;
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

  if (isEditing) {
    return (
      <li className="flex justify-between items-center w-30 h-12 shrink-0 border-black border-2 rounded-[15px] shadow-standard bg-white my-4">
        <div className="w-full justify-left mx-4 items-center">
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              value={editedContent}
              onChange={handleEditChange}
              className="w-full h-[2rem] flex p-1 border-none text-gray-400"
            />
          </form>
        </div>
        <span className="flex justify-right items-center">
          <MdOutlineSaveAlt
            type="submit"
            onClick={handleSubmit}
            className="w-6 h-6 shrink-0 mx-1 cursor-pointer"
          />
          <HiOutlineBackspace
            onClick={() => setIsEditing(false)}
            className="w-6 h-6 shrink-0 mx-1 cursor-pointer"
          />
        </span>
      </li>
    );
  }
  return (
    <li className="flex justify-between items-center w-30 h-12 shrink-0 border-black border-2 rounded-[15px] shadow-standard bg-white my-4">
      <div className="flex justify-left items-center">
        <Checkbox
          id={id.toString()}
          checked={status === "completed"}
          onChange={handleChange}
          color="secondary"
          className="cursor-pointer"
        />
        <label
          htmlFor={id.toString()}
          className="flex justify-left items-center"
          style={{
            textDecoration: status === "completed" ? "line-through" : "none",
          }}
        >
          {title}
        </label>
      </div>
      <span className="flex justify-right items-center">
        <MdOutlineCreate
          onClick={() => setIsEditing(true)}
          className="w-6 h-6 shrink-0 mx-1 cursor-pointer"
        />
        <HiOutlineTrash
          onClick={handleDelete}
          className="w-6 h-6 shrink-0 mx-1 cursor-pointer"
        />
      </span>
    </li>
  );
}

export default Task;

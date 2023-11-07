import { useState, ChangeEvent } from "react";
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
  const { id, content, status } = todo;
  const [isEditing, setIsEditing] = useState(false);
  const [editedContent, setEditedContent] = useState(content);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    onUpdate({ ...todo, status: e.target.checked ? "completed" : "active" });
  };

  const handleDelete = () => onDelete(todo);

  const handleEditChange = (e: ChangeEvent<HTMLInputElement>) => {
    setEditedContent(e.target.value);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onUpdate({ ...todo, content: editedContent });
    setIsEditing(false);
  };

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
          id={id}
          checked={status === "completed"}
          onChange={handleChange}
          color="secondary"
          className="cursor-pointer"
        />
        <label
          htmlFor={id}
          className="flex justify-left items-center"
          style={{
            textDecoration: status === "completed" ? "line-through" : "none",
          }}
        >
          {content}
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

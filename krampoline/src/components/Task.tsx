import React from "react";
import Checkbox from "@mui/material/Checkbox";
import { PiTrashLight, PiPencilLight } from "react-icons/pi";

function Task({ todo, onUpdate, onDelete }) {
  const { id, title, status } = todo;

  const handleChange = (e) => {
    onUpdate({ ...todo, status: e.target.checked ? "completed" : "active" });
  };

  const handleDelete = () => onDelete(todo);

  return (
    <li className="flex justify-between items-center w-30 h-12 shrink-0 border-black border-2 rounded-[15px] shadow-standard bg-white my-4">
      <div className="flex justify-left items-center">
        <Checkbox
          type="checkbox"
          id={id}
          checked={status === "completed"}
          onChange={handleChange}
          defaultChecked
          color="secondary"
          className="cursor-pointer"
        />
        <label htmlFor={id} className="flex justify-left items-center">
          {title}
        </label>
      </div>
      <span className="flex justify-right items-center">
        <PiPencilLight className="w-6 h-6 shrink-0 mx-1 cursor-pointer" />
        <PiTrashLight
          onClick={handleDelete}
          className="w-6 h-6 shrink-0 mx-1 cursor-pointer"
        />
      </span>
    </li>
  );
}

export default Task;

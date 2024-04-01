import { ChangeEvent } from "react";
import Checkbox from "@mui/material/Checkbox";
import { MdOutlineCreate } from "react-icons/md";
import { HiOutlineTrash } from "react-icons/hi";
import { TodoItem } from "../../types/Todo.types";

export default function TaskContent({
  id,
  status,
  title,
  onChange,
  onChangeEditState,
  onDelete,
}: TodoItem & {
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onChangeEditState: () => void;
  onDelete: () => void;
}) {
  return (
    <>
      <div className="flex justify-left items-center">
        <Checkbox
          id={id.toString()}
          checked={status === "completed"}
          onChange={onChange}
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
        <button aria-label="수정 버튼" onClick={onChangeEditState}>
          <MdOutlineCreate className="w-6 h-6 shrink-0 mx-1 cursor-pointer" />
        </button>
        <button
          aria-label="삭제 버튼"
          className="w-6 h-6 shrink-0 mx-1 cursor-pointer"
          onClick={onDelete}
        >
          <HiOutlineTrash />
        </button>
      </span>
    </>
  );
}

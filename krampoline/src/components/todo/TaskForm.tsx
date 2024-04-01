import React, { ChangeEvent } from "react";
import { HiOutlineBackspace } from "react-icons/hi";
import { MdOutlineSaveAlt } from "react-icons/md";

export default function TaskForm({
  onSubmit,
  onEditChange,
  onChangeEditState,
  editedContent,
}: {
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  onEditChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onChangeEditState: () => void;
  editedContent: string;
}) {
  return (
    <form
      onSubmit={onSubmit}
      className="flex justify-between items-center flex-grow"
    >
      <div className="w-full justify-left mx-4 items-center">
        <input
          type="text"
          value={editedContent}
          onChange={onEditChange}
          className="w-full h-[2rem] flex p-1 border-none text-gray-400"
        />
      </div>
      <span className="flex justify-right items-center">
        <button aria-label="수정 완료 버튼" type="submit">
          <MdOutlineSaveAlt className="w-6 h-6 shrink-0 mx-1 cursor-pointer" />
        </button>
        <button aria-label="수정 취소 버튼" onClick={onChangeEditState}>
          <HiOutlineBackspace className="w-6 h-6 shrink-0 mx-1 cursor-pointer" />
        </button>
      </span>
    </form>
  );
}

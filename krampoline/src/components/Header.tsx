import { FormEvent, useEffect, useState } from "react";
import { AiOutlinePlus } from "react-icons/ai";
import { useLocation } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext";
import { addQuickInputTodo } from "../service/http-requests/todo-api";

export default function Header() {
  const { pathname } = useLocation();
  const { user } = useAuthContext();
  const [value, setValue] = useState("");

  useEffect(() => {}, [pathname]);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    addQuickInputTodo(value).then(() => alert("성공! 새로고침 해주세요!"));
  };

  return (
    <header className="bg-main-mint border-b-2 border-black px-4 pt-4 pb-1 fixed top-0 left-0 w-full z-10 md:px-40 lg:px-60">
      <form className="flex items-center mb-2" onSubmit={handleSubmit}>
        <input
          type="text"
          className="w-full h-[2rem] block border-2 border-black rounded-[15px] shadow-standard mr-5 p-1 disabled:cursor-not-allowed"
          placeholder="ex)#todo 내일까지 과제하기(로그인 후 사용가능)"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          disabled={!user}
        />
        <button
          disabled={!user}
          type="submit"
          className="rounded-full bg-white w-[2.8rem] h-[2.5rem] flex justify-center items-center border-2 border-black shadow-standard active:shadow-none active:translate-x-1 active:translate-y-1 disabled:active:shadow-standard disabled:active:translate-x-0 disabled:active:translate-y-0 disabled:cursor-not-allowed disabled:bg-transparent"
        >
          <AiOutlinePlus className="text-3xl" />
        </button>
      </form>
      <h1 className="text-center capitalize font-bold">
        {pathname === "/" ? "Todo" : pathname.substring(1)}
      </h1>
    </header>
  );
}

import React, { useEffect } from "react";
import { AiOutlinePlus } from "react-icons/ai";
import { useLocation } from "react-router-dom";

export default function Header() {
  const { pathname } = useLocation();

  useEffect(() => {}, [pathname]);

  return (
    <header className="bg-main-mint border-b-2 border-black px-4 pt-4 pb-1 fixed top-0 left-0 w-full">
      <form className="flex items-center mb-2">
        <input
          type="text"
          className="w-full h-[2rem] block border-2 border-black rounded-[15px] shadow-standard mr-5 p-1"
          placeholder="ex)#todo 내일까지 과제하기 or #memo 사과는 맛있다."
        />
        <button className="rounded-full bg-white w-[2.8rem] h-[2.5rem] flex justify-center items-center border-2 border-black shadow-standard">
          <AiOutlinePlus className="text-3xl" />
        </button>
      </form>
      <h1 className="text-center capitalize font-bold">
        {pathname.substring(1)}
      </h1>
    </header>
  );
}

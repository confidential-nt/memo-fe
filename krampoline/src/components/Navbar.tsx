import React from "react";
import { Link, useLocation } from "react-router-dom";
import { PiStackSimple, PiNotePencilLight } from "react-icons/pi";
import { LiaCalendarCheckSolid } from "react-icons/lia";

export default function Navbar() {
  const { pathname } = useLocation();
  return (
    <nav className="fixed left-0 bottom-0 w-full bg-main-mint border-t-2 border-black flex justify-between px-10 py-2">
      <Link to="/todo" className="flex flex-col items-center">
        <PiStackSimple className="text-3xl" />
        <span className={pathname === "/todo" ? "border-b border-black" : ""}>
          Todo
        </span>
      </Link>
      <Link to="/calendar" className="flex flex-col items-center">
        <LiaCalendarCheckSolid className="text-3xl" />
        <span
          className={pathname === "/calendar" ? "border-b border-black" : ""}
        >
          Calendar
        </span>
      </Link>
      <Link to="/memo" className="flex flex-col items-center">
        <PiNotePencilLight className="text-3xl" />
        <span className={pathname === "/memo" ? "border-b border-black" : ""}>
          Memo
        </span>
      </Link>
    </nav>
  );
}

import { Link, useLocation } from "react-router-dom";
import { PiStackSimple, PiNotePencilLight } from "react-icons/pi";
import { LiaCalendarCheckSolid } from "react-icons/lia";
import { useAuthContext } from "../context/AuthContext";
import { KAKAO_AUTH_URL } from "../common/kakao";
import { RiKakaoTalkFill } from "react-icons/ri";

export default function Navbar() {
  const { pathname } = useLocation();
  const { user, isInitializing } = useAuthContext();

  const notUserLoggedIn = !user && !isInitializing;
  return (
    <nav className="fixed left-0 bottom-0 w-full bg-main-mint border-t-2 border-black flex justify-between px-10 py-2 z-10 md:flex-col md:w-auto md:h-[calc(99%-94px)] md:px-2 md:py-20 md:rounded-md md:border-2">
      {notUserLoggedIn ? (
        <a
          href={KAKAO_AUTH_URL}
          className="bg-kakao-yellow flex flex-col items-center rounded-lg border-black border-2"
        >
          <RiKakaoTalkFill className="text-3xl" />
          <span>Sign Up</span>
        </a>
      ) : null}
      <Link to="/today" className="flex flex-col items-center">
        <PiStackSimple className="text-3xl" />
        <span className={pathname === "/today" ? "border-b border-black" : ""}>
          Today
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

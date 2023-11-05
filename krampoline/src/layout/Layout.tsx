import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import Navbar from "../components/Navbar";
import { UserContextProvider } from "../context/UserContext";

export default function Layout() {
  return (
    <UserContextProvider>
      <div className="h-screen flex flex-col">
        <Header />
        <main className="grow bg-main-purple pt-[6.25rem] px-2 overflow-y-scroll md:pl-24">
          <Outlet />
        </main>
        <Navbar />
      </div>
    </UserContextProvider>
  );
}

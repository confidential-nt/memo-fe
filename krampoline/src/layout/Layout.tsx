import React from "react";
import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import Navbar from "../components/Navbar";

export default function Layout() {
  return (
    <div className="h-screen flex flex-col">
      <Header />
      <main className="grow bg-main-purple pt-[6.25rem] px-2 overflow-y-scroll">
        <Outlet />
      </main>
      <Navbar />
    </div>
  );
}

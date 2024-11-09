import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";

export default function Layout() {
  return (
    <div className="bg-white-100 h-screen overflow-hidden flex justify-center m-5">
      <div className="w-full max-w-screen-xl px-10 flex flex-row">
        <Sidebar />
        <div className="flex flex-col flex-1">
          <div className="flex-1 p-4 min-h-0 overflow-auto">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
}

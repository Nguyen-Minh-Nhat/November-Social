import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./components/Sidebar";

const Chat = () => {
  return (
    <div className="w-full h-full dark:bg-dark-regular flex">
      <Sidebar />
      <div className="flex-1 bg-blue-900 flex">
        <Outlet />
      </div>
    </div>
  );
};

export default Chat;

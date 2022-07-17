import React, { useState } from "react";
import Header from "./components/Header";
import SideBarMenu from "./components/SidebarLeft/SideBarMenu";

const HeaderOnly = ({ children }) => {
  const [showMenu, setShowMenu] = useState(false);
  return (
    <>
      <Header />
      <div className="w-full h-full">
        <section className="relative w-full h-[calc(100%_-_80px)] flex-1 mt-20">
          {children}
        </section>
        <div
          className={`fixed h-[calc(100%_-_96px)] top-0 left-0 mt-24 transition-all z-[9999999] ${
            showMenu ? "translate-x-0" : "-translate-x-full"
          } `}
        >
          <SideBarMenu />
          <div
            onClick={() => setShowMenu(!showMenu)}
            className={`absolute top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-primary-bold transition-all ${
              showMenu
                ? "translate-x-1/2 right-3"
                : "translate-x-1/2 right-0 opacity-50 hover:opacity-100"
            }`}
          ></div>
        </div>
      </div>
    </>
  );
};

export default HeaderOnly;

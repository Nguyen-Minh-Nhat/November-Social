import React from "react";
import Header from "./components/Header";
import SidebarLeft from "./components/SidebarLeft";
import SideBarMenu from "./components/SidebarLeft/SideBarMenu";

const DefaultLayout = ({ children }) => {
  return (
    <div className="">
      <Header />
      <div
        className="flex scrollAble mt-20 pt-4 dark:bg-dark-very-light"
        style={{ height: `${window.innerHeight - 80}px` }}
      >
        <div className="sticky top-0">
          <SideBarMenu />
        </div>
        <SidebarLeft />
        <section className="relative basis-[744px] mx-auto px-4">
          {children}
        </section>
        <aside className="sticky flex-1 top-0 right-0 flex flex-col"></aside>
      </div>
    </div>
  );
};

export default DefaultLayout;

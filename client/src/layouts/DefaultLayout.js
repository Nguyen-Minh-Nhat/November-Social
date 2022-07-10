import React from "react";
import Header from "./components/Header";

const DefaultLayout = ({ children }) => {
  return (
    <div className="">
      <Header />
      <div className="flex mt-20 pt-4 h-screen scrollAble dark:bg-dark-very-light">
        <section className="flex-1"></section>
        <section className="basis-[744px] px-8">{children}</section>
        <section className="flex-1"></section>
      </div>
    </div>
  );
};

export default DefaultLayout;

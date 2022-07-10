import React from "react";
import Header from "./components/Header";

const HeaderOnly = ({ children }) => {
  return (
    <>
      <Header />
      <div>{children}</div>
    </>
  );
};

export default HeaderOnly;

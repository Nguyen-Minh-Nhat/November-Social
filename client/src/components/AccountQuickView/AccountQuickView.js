import React from "react";
import Avatar from "../Avatar";

const AccountQuickView = ({ user, className, subName }) => {
  return (
    <div
      className={`flex items-center rounded-xl gap-2 cursor-pointer p-[6px] text-[15px] ${className}`}
    >
      <Avatar url={user.avatar} />

      <div className="flex flex-col">
        <span className=" leading-4 font-bold dark:text-dark-text-bold ">
          {user.name}
        </span>
        <div>{subName}</div>
      </div>
    </div>
  );
};

export default AccountQuickView;

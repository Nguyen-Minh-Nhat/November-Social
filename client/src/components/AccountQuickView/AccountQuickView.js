import React from "react";
import Avatar from "../Avatar";

const AccountQuickView = ({ user, className, subName }) => {
  return (
    <div
      className={`flex items-center rounded-xl gap-2 hover:dark:bg-dark-light cursor-pointer p-[6px] ${className}`}
    >
      <Avatar url={user.avatar} />

      <div className="flex flex-col">
        <span className="text-[15px] leading-4 font-bold dark:text-dark-text-bold">
          {user.name}
        </span>
        <div>{subName}</div>
      </div>
    </div>
  );
};

export default AccountQuickView;

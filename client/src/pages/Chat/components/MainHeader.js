import React from "react";
import Avatar from "../../../components/Avatar";

const MainHeader = ({ conversation }) => {
  return (
    <div className="dark:bg-dark-regular p-3 py-4">
      {conversation && (
        <div className="flex items-center gap-2">
          <Avatar size="w-10 h-10" url={conversation.avatar} />
          <span className="dark:text-dark-text-bold">{conversation.name}</span>
        </div>
      )}
    </div>
  );
};

export default MainHeader;

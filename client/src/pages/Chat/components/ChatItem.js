import React, { useState, useMemo } from "react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import Avatar from "../../../components/Avatar";
import Button from "../../../components/Button";
import Popover from "../../../components/Popover";
const ChatItem = ({ conversation }) => {
  const userId = useSelector((state) => state.auth.user)._id;
  const [showMenu, setShowMenu] = useState(false);
  const conversationConverted = useMemo(() => {
    if (conversation.name === "default") {
      const guest = conversation.users.find((user) => user._id !== userId);
      return { ...conversation, name: guest.name, avatar: guest.avatar };
    }
    return conversation;
  }, [conversation]);

  return (
    <NavLink to={`/chat/${conversationConverted._id}`}>
      <div className="chat-items relative py-1 dark:hover:bg-dark-light rounded-xl group">
        <div className="flex items-center gap-2 ml-3 py-2">
          <div className="shrink-0">
            <Avatar size="w-10 h-10" url={conversationConverted.avatar} />
          </div>
          <div className="flex flex-col text-sm">
            <span className="dark:text-dark-text-bold">
              {conversationConverted.name}
            </span>
            <span className="dark:text-dark-text-light text-xs">
              {conversationConverted.latestMessage?.text}
            </span>
          </div>
        </div>
        <div
          className={`absolute right-3 top-1/2 -translate-y-1/2 group-hover:visible flex justify-center z-20 ${
            showMenu ? "visible" : "invisible"
          }`}
        >
          <Popover
            visible={showMenu}
            setVisible={setShowMenu}
            className={"-right-1/2 z-40"}
            render={
              <div className="flex gap-1">
                <Button
                  circle
                  medium
                  className="dark:text-dark-text-regular dark:hover:text-dark-text-bold"
                >
                  <i className="fa-solid fa-edit"></i>
                </Button>
                <Button
                  circle
                  medium
                  className="dark:text-dark-text-regular dark:hover:text-dark-text-bold"
                >
                  <i className="fa-solid fa-trash "></i>
                </Button>
              </div>
            }
          >
            <Button circle onClick={() => setShowMenu(!showMenu)}>
              <i className="fa-solid fa-ellipsis-vertical text-primary"></i>
            </Button>
          </Popover>
        </div>
      </div>
    </NavLink>
  );
};

export default ChatItem;

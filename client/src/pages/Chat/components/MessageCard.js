import React, { useMemo, useState } from "react";
import { useSelector } from "react-redux";
import Avatar from "../../../components/Avatar";
import Button from "../../../components/Button";
import Img from "../../../components/Img";
import Popover from "../../../components/Popover";

const MessageCard = ({ message, borderRadiusStyle, onDelete, isUser }) => {
  const [showMenu, setShowMenu] = useState(false);
  const handleDeleteMessage = () => {
    onDelete(message);
  };
  return (
    <div
      key={message._id}
      className={`relative group w-full flex ${
        isUser ? "justify-end" : "justify-start"
      }`}
    >
      <div className="relative">
        <div
          className={`relative rounded-xl text-start bg-dark-regular group overflow-hidden ${borderRadiusStyle}`}
        >
          {message.text && (
            <span className="p-2 px-4 text-dark-text-regular inline-block">
              {message.text}
            </span>
          )}

          {message.image && (
            <div className={`rounded-xl ${borderRadiusStyle} overflow-hidden`}>
              <Img src={message.image} className="max-w-[200px] object-cover" />
            </div>
          )}
        </div>
        <div
          className={`absolute ${
            isUser ? "left-0 -translate-x-full" : "right-0 translate-x-full"
          } top-1/2 -translate-y-1/2  group-hover:visible 
          ${showMenu ? "visible" : "invisible"}
            `}
        >
          <Popover
            visible={showMenu}
            setVisible={setShowMenu}
            render={
              <div className="flex gap-1">
                <Button
                  circle
                  medium
                  onClick={() => {
                    setShowMenu(false);
                  }}
                  className="dark:text-dark-text-regular dark:hover:text-dark-text-bold"
                >
                  <i className="fa-solid fa-edit"></i>
                </Button>
                <Button
                  circle
                  medium
                  // onClick={() => setShowConfirmDelete(true)}
                  onClick={handleDeleteMessage}
                  className="dark:text-dark-text-regular dark:hover:text-dark-text-bold"
                >
                  <i className="fa-solid fa-trash "></i>
                </Button>
              </div>
            }
            className={"-right-1/2 z-40"}
          >
            <div
              className="w-8 h-8 mr-2 flex justify-center items-center rounded-full hover:bg-dark-light  cursor-pointer"
              onClick={() => setShowMenu(!showMenu)}
            >
              <i className="fa-solid fa-ellipsis-vertical dark:text-dark-text-light"></i>
            </div>
          </Popover>
        </div>
      </div>
    </div>
  );
};

const GroupedMessageCard = ({ groupedMessages, onDelete }) => {
  const user = useSelector((state) => state.auth.user);
  const [showMenu, setShowMenu] = useState(false);
  const time = useMemo(() => {
    const date = new Date(groupedMessages.items[0].createdAt);
    console.log();

    return (
      ("0" + date.getHours()).slice(-2) +
      ":" +
      ("0" + date.getMinutes()).slice(-2)
    );
  }, []);
  const isUser = useMemo(() => {
    return groupedMessages.sender._id === user._id;
  }, [groupedMessages.sender]);

  return (
    <div
      className={`flex w-full gap-2 mt-2 ${
        isUser ? "justify-end pl-[30%]s" : "pr-[30%]"
      }`}
    >
      {!isUser && <Avatar url={groupedMessages.sender.avatar} />}
      <div
        className={`flex w-full flex-col ${
          isUser ? "items-end" : "items-start"
        }`}
      >
        <span className="text-sm text-dark-text-light">{time}</span>
        <div
          className={`flex w-full flex-col gap-[1px] ${
            isUser ? "items-end" : "items-start"
          }`}
        >
          {groupedMessages.items.map((message, index) => {
            const borderRadius = () => {
              const isStart = index === 0;
              if (isStart && isUser) {
                return "rounded-br-none";
              }
              const isEnd = index === groupedMessages.items.length - 1;
              if (isEnd && isUser) {
                return "rounded-tr-none";
              }
              if (isEnd && !isUser) {
                return "rounded-tl-none";
              }
              if (!isEnd && !isUser) {
                return "rounded-l-none";
              }
              if (!isEnd && isUser) {
                return "rounded-r-none";
              }
            };
            const borderRadiusStyle = borderRadius();
            return (
              <MessageCard
                key={message._id}
                message={message}
                borderRadiusStyle={borderRadiusStyle}
                onDelete={onDelete}
                isUser={isUser}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default GroupedMessageCard;

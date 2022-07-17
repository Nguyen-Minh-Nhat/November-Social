import React from "react";
import MessageCard from "./MessageCard";

const ChatContent = ({ groupedMessagesList, onDelete }) => {
  return (
    <div className="flex flex-1 flex-col-reverse px-4 scrollAble occupy pb-2">
      {groupedMessagesList.map((groupedMessages) => (
        <MessageCard
          key={groupedMessages.items[0]._id}
          groupedMessages={groupedMessages}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
};

export default ChatContent;

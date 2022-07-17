import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import chatApi from "../../../api/chatApi";
import { getDiffTime } from "../../../functions";
import ChatContent from "./ChatContent";
import MainHeader from "./MainHeader";
import MessageCreator from "./MessageCreator";
import Profile from "./Profile";

const Main = () => {
  const user = useSelector((state) => state.auth.user);
  const [conversation, setConversation] = useState(null);
  const params = useParams();
  const [groupedMessagesList, setGroupedMessagesList] = useState([]);
  const getMessages = async () => {
    try {
      const res = await chatApi.getMessages(params.id);
      setGroupedMessagesList(handleGroupMessage(res.data.messages));
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    let mounted = true;
    const accessConversation = async () => {
      try {
        let res = await chatApi.accessConversation(params.id);
        const conversation = res.data.conversation;
        if (conversation.name === "default") {
          const guest = conversation.users.find(
            (cUser) => cUser._id !== user._id,
          );
          conversation.name = guest.name;
          conversation.avatar = guest.avatar;
        }
        setConversation(res.data.conversation);
        res = await chatApi.getMessages(conversation._id);
        setGroupedMessagesList(handleGroupMessage(res.data.messages));
      } catch (error) {
        console.log(error);
      }
    };
    if (mounted) {
      accessConversation();
    }
    return () => (mounted = false);
  }, [params.id]);

  const handleGroupMessage = (messages) => {
    const result = [];
    messages.forEach((message, index) => {
      if (index === 0) {
        const newGroup = { sender: message.sender, items: [message] };
        result.push(newGroup);
      } else {
        if (message.sender._id !== messages[index - 1].sender._id) {
          const newGroup = { sender: message.sender, items: [message] };
          result.push(newGroup);
        } else {
          const diffTime = getDiffTime(
            new Date(message.createdAt),
            new Date(messages[index - 1].createdAt),
          );
          if (diffTime === "1 minute ago" || diffTime === "just now") {
            result[result.length - 1].items.unshift(message);
          } else {
            const newGroup = { sender: message.sender, items: [message] };
            result.push(newGroup);
          }
        }
      }
    });
    return result;
  };
  const handleSendMessage = async (data) => {
    data.append("sender", user._id);
    data.append("recipient", params.id);
    data.append("conversationId", conversation._id);
    try {
      const res = await chatApi.createMessage(data);
      const newMessage = res.data.newMessage;
      setGroupedMessagesList((prev) => {
        const prevMessage = prev[0]?.items.slice(-1)[0];
        if (prevMessage) {
          if (prevMessage.sender._id === newMessage.sender._id) {
            const diffTime = getDiffTime(
              new Date(prevMessage.createdAt),
              new Date(newMessage.createdAt),
            );

            if (diffTime === "1 minute ago" || diffTime === "just now") {
              prev[0].items.push(newMessage);
              return [...prev];
            }
          }
        }
        return [{ sender: newMessage.sender, items: [newMessage] }, ...prev];
      });
    } catch (error) {
      console.log(error);
    }
  };

  const handleDeleteMessage = async (messageDelete) => {
    try {
      await chatApi.deleteMessage(messageDelete._id);
      let deleted = false;
      setGroupedMessagesList((prev) => {
        const newGroupedMessagesList = [];
        prev.forEach((groupedMessages) => {
          if (!deleted) {
            groupedMessages.items.forEach((message, index) => {
              if (message._id === messageDelete._id) {
                groupedMessages.items.splice(index, 1);
                deleted = true;
                return;
              }
            });

            if (groupedMessages.items.length > 0) {
              newGroupedMessagesList.push(groupedMessages);
            }
          } else {
            newGroupedMessagesList.push(groupedMessages);
          }
        });
        return newGroupedMessagesList;
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="border-x shadow dark:border-dark-border flex-1">
        <div className="flex-1 w-full h-full dark:bg-dark-very-light flex flex-col">
          <MainHeader conversation={conversation} />
          <ChatContent
            groupedMessagesList={groupedMessagesList}
            onDelete={handleDeleteMessage}
          />
          <div className="w-full p-4 justify-self-end">
            <MessageCreator onSubmit={handleSendMessage} />
          </div>
        </div>
      </div>
      <div className="sm:w-0 lg:w-1/3">
        <Profile />
      </div>
    </>
  );
};

export default Main;

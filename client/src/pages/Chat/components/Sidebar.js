import React, { useEffect, useState } from "react";
import userApi from "../../../api/userApi";
import chatApi from "../../../api/chatApi";
import { Search } from "../../../layouts/components/Search";
import ChatItem from "./ChatItem";
import { useSelector, useDispatch } from "react-redux";
import {
  setConversations,
  setCurrentConversation,
} from "../../../redux/slices/chatSlice";
import { useParams } from "react-router-dom";
const Sidebar = () => {
  const conversations = useSelector((state) => state.chat.conversations);
  const dispatch = useDispatch();
  const getConversations = async () => {
    try {
      const res = await chatApi.getConversations();
      const action = setConversations(res.data.conversations);
      dispatch(action);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    let mounted = true;
    if (mounted) {
      getConversations();
    }
    return () => (mounted = false);
  }, []);
  return (
    <div className="w-[360px] flex flex-col ">
      <div className="relative z-[999999] px-4">
        <div className="py-4 border-b dark:border-dark-border flex justify-center">
          <Search />
        </div>
      </div>
      <div className="px-2 mt-2">
        {conversations.length > 0 &&
          conversations.map((conversation, index) => (
            <div
              key={index}
              className={`relative`}
              style={{ zIndex: `calc(${conversation.length} - ${index})` }}
            >
              <ChatItem conversation={conversation} />
            </div>
          ))}
      </div>
    </div>
  );
};

export default Sidebar;

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentConversation: {},
  conversations: [],
};

const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    setConversations: (state, action) => {
      state.conversations = action.payload;
    },
    setCurrentConversation: (state, action) => {
      state.currentConversation = state.conversations.find(
        (conversation) => conversation.recipient._id === action.payload,
      );
    },
  },
});

export const { setCurrentConversation, setConversations } = chatSlice.actions;
export default chatSlice.reducer;

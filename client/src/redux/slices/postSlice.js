import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  data: [],
};

const postSlice = createSlice({
  name: "post",
  initialState,
  reducers: {
    addNewPost: (state, action) => {
      state.data = [action.payload, ...state.data];
    },

    updatePost: (state, action) => {
      state.data = state.data.map((item) => {
        if (item._id === action.payload._id)
          return { ...action.payload, commentsDetail: item.commentsDetail };
        return item;
      });
    },
    removePost: (state, action) => {
      state.data = state.data.filter((item) => item._id !== action.payload);
    },
    setPostList: (state, action) => {
      state.data = action.payload;
    },
    setPostComments: (state, action) => {
      state.data = state.data.map((item) => {
        if (item._id === action.payload.postId) {
          return { ...item, commentsDetail: action.payload.comments };
        }
        return item;
      });
    },

    addComment: (state, action) => {
      state.data = state.data.map((item) => {
        if (item._id === action.payload.postId) {
          return {
            ...item,
            commentsDetail: [...item.commentsDetail, action.payload.comment],
          };
        }
        return item;
      });
    },
    updateComment: (state, action) => {
      state.data = state.data.map((item) => {
        if (item._id === action.payload.postId) {
          const commentsDetail = item.commentsDetail.map((comment) => {
            if (comment._id === action.payload._id) {
              return action.payload;
            }
            return comment;
          });
          return { ...item, commentsDetail: commentsDetail };
        }
        return item;
      });
    },
    removeComment: (state, action) => {
      state.data = state.data.map((item) => {
        if (item._id === action.payload.postId) {
          const commentsDetail = item.commentsDetail.filter(
            (comment) => comment._id !== action.payload._id,
          );
          return { ...item, commentsDetail: commentsDetail };
        }
        return item;
      });
    },
  },
});

export const {
  setPostList,
  addNewPost,
  updatePost,
  removePost,
  setPostComments,
  addComment,
  removeComment,
  updateComment,
} = postSlice.actions;

export default postSlice.reducer;

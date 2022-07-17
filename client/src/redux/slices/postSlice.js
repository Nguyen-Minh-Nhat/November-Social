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

    addNewComment: (state, action) => {
      state.data = state.data.map((item) => {
        if (item._id === action.payload.postId) {
          return {
            ...item,
            comments: [...item.comments, action.payload.comment._id],
            commentsDetail: [...item.commentsDetail, action.payload.comment],
          };
        }
        return item;
      });
    },
    addComments: (state, action) => {
      state.data = state.data.map((item) => {
        if (item._id === action.payload.postId) {
          return {
            ...item,
            commentsDetail: [
              ...item.commentsDetail,
              ...action.payload.comments,
            ],
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
          const deletedComment = [];
          const commentsDetail = item.commentsDetail.filter((comment) => {
            if (
              comment._id === action.payload._id ||
              comment.reply === action.payload._id
            ) {
              deletedComment.push(comment._id);
              return false;
            }
            return true;
          });
          const comments = item.comments.filter(
            (comment) => !deletedComment.includes(comment),
          );
          return { ...item, comments, commentsDetail };
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
  addNewComment,
  addComments,
  removeComment,
  updateComment,
} = postSlice.actions;

export default postSlice.reducer;

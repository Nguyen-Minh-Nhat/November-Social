import React from "react";
import { useDispatch } from "react-redux";
import commentApi from "../../api/commentApi";
import { addComment } from "../../redux/slices/postSlice";
import CommentForm from "./CommentForm";

const CommentCreate = ({ postId, postUserId }) => {
  const dispatch = useDispatch();
  const handleCreateComment = async (data) => {
    try {
      data.append("postId", postId);
      data.append("postUserId", postUserId);
      const res = await commentApi.create(data);
      const action = addComment({ postId, comment: res.data.newComment });
      dispatch(action);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <CommentForm
      initial={{ text: "", image: "" }}
      onSubmit={handleCreateComment}
    />
  );
};

export default CommentCreate;

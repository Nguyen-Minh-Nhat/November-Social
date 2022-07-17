import React from "react";
import { useDispatch } from "react-redux";
import commentApi from "../../api/commentApi";
import { addNewComment } from "../../redux/slices/postSlice";
import CommentForm from "./CommentForm";

const CommentCreate = ({
  postId,
  postUserId,
  initial = { text: "", image: "" },
}) => {
  const dispatch = useDispatch();
  const handleCreateComment = async (data) => {
    try {
      data.append("postId", postId);
      data.append("postUserId", postUserId);
      if (initial?.reply) data.append("reply", initial.reply);
      const res = await commentApi.create(data);
      const action = addNewComment({ postId, comment: res.data.newComment });
      dispatch(action);
    } catch (error) {
      console.log(error);
    }
  };
  return <CommentForm initial={initial} onSubmit={handleCreateComment} />;
};

export default CommentCreate;

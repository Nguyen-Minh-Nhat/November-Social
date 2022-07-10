import React from "react";

import Comment from "./Comment";

const RenderCommentList = ({ comments }) => {
  return (
    <>
      {comments?.length > 0 && (
        <div className="flex flex-col gap-2">
          {comments.map((comment) => (
            <Comment key={comment._id} comment={comment} />
          ))}
        </div>
      )}
    </>
  );
};

export default RenderCommentList;

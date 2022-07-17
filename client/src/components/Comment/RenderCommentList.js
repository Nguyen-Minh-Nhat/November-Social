import React, { useMemo } from "react";

import CommentCard from "./CommentCard";

const RenderCommentList = ({ comments, childComments }) => {
  return (
    <>
      {comments?.length > 0 && (
        <div className="flex flex-col gap-4">
          {comments.map((comment) => {
            return (
              <CommentCard
                key={comment._id}
                comment={comment}
                childComments={childComments ? childComments[comment._id] : []}
              />
            );
          })}
        </div>
      )}
    </>
  );
};

export default React.memo(RenderCommentList);

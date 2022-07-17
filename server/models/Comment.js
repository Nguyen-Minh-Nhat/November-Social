const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const CommentSchema = new Schema(
  {
    text: String,
    image: String,
    user: {
      type: Schema.Types.ObjectId,
      ref: "user",
    },
    postUserId: mongoose.Types.ObjectId,
    tag: Object,
    reply: mongoose.Types.ObjectId,
    postId: {
      type: Schema.Types.ObjectId,
      ref: "post",
    },
    likes: [
      {
        type: Schema.Types.ObjectId,
        ref: "user",
      },
    ],
    childComments: [
      {
        type: Schema.Types.ObjectId,
        ref: "comment",
      },
    ],
  },
  { timestamps: true },
);

module.exports = mongoose.model("comment", CommentSchema);

const mongoose = require("mongoose");

const ConversationSchema = new mongoose.Schema(
  {
    name: { type: String, trim: true },
    isGroupChat: { type: Boolean, default: false },
    users: [{ type: mongoose.Types.ObjectId, ref: "user" }],
    latestMessage: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "message",
    },
    groupAdmin: { type: mongoose.Types.ObjectId, ref: "user" },
    recipients: [{ type: mongoose.Types.ObjectId, ref: "user" }],
    text: String,
    media: Array,
    image: String,
    call: Object,
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model("conversation", ConversationSchema);

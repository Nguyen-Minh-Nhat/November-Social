const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const UserSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
      trim: true,
    },
    avatar: {
      type: String,
    },
    birthDate: {
      type: Date,
    },
    description: {
      type: String,
      maxlength: 200,
    },
    address: { type: String, default: "" },
    phoneNumber: { type: String, default: "" },
    gender: { type: String, default: "male" },
    followers: [
      {
        type: mongoose.Types.ObjectId,
        ref: "user",
      },
    ],
    following: [
      {
        type: mongoose.Types.ObjectId,
        ref: "user",
      },
    ],
  },
  { timestamps: true },
);

module.exports = mongoose.model("user", UserSchema);

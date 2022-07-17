const Conversation = require("../models/Conversation");
const User = require("../models/User");
const Messages = require("../models/Message");
const mongoose = require("mongoose");
const { upload, destroy, destroyDirectory, deleteTmp } = require("../utils");
class APIfeatures {
  constructor(query, queryString) {
    this.query = query;
    this.queryString = queryString;
  }

  paginating() {
    const page = this.queryString.page * 1 || 1;
    const limit = this.queryString.limit * 1 || 9;
    const skip = (page - 1) * limit;
    this.query = this.query.skip(skip).limit(limit);
    return this;
  }
}

const chatController = {
  accessConversation: async (req, res) => {
    try {
      const id = req.params.id;
      const userId = req.user.id;
      if (!mongoose.Types.ObjectId.isValid(id))
        return res.status(200).json({ message: "non user" });
      const conversation = await Conversation.findOne({
        $or: [
          {
            $and: [{ _id: id }, { users: { $elemMatch: { $eq: userId } } }],
          },

          {
            $and: [
              { users: { $elemMatch: { $eq: id } } },
              { users: { $elemMatch: { $eq: userId } } },
            ],
          },
        ],
      })
        .populate("users", "-password")
        .populate("latestMessage");
      if (conversation) {
        res.status(200).json({ message: "conversation", conversation });
      } else {
        const user = await User.findOne({ _id: id });
        if (!user) return res.status(200).json({ message: "non user" });

        let newConversation = new Conversation({
          name: "default",
          isGroupChat: false,
          users: [id, userId],
        });
        await newConversation.save();

        const conversation = await Conversation.findOne({
          _id: newConversation._id,
        }).populate("users", "-password");
        res.status(200).json({ message: "conversation", conversation });
      }
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },
  // createMessage: async (req, res) => {
  //   const { sender, recipient, text, media, call } = req.body;
  //   let file = req.files?.image;
  //   console.log(req.files?.image);
  //   try {
  //     if (!recipient || (!text.trim() && !file && media?.length === 0 && !call))
  //       return;

  //     var image = "";
  //     let newConversation = await Conversation.findOneAndUpdate(
  //       {
  //         $or: [
  //           { recipients: [sender, recipient] },
  //           { recipients: [recipient, sender] },
  //         ],
  //       },
  //       {
  //         recipients: [sender, recipient],
  //         text,
  //         media,
  //         image,
  //         call,
  //       },
  //       { new: true, upsert: true },
  //     );

  //     if (file) {
  //       image = await upload(
  //         file.tempFilePath,
  //         `novsocial/chats/${newConversation._id}`,
  //       );
  //     }

  //     newConversation = await Conversation.findByIdAndUpdate(
  //       { _id: newConversation._id },
  //       { image },
  //       { new: true },
  //     ).populate("recipients", "avatar username name");

  //     const newMessage = new Messages({
  //       conversation: newConversation._id,
  //       sender,
  //       call,
  //       recipient,
  //       image,
  //       text,
  //       media,
  //     });

  //     await newMessage.save();
  //     newMessage.sender = await User.findOne({
  //       _id: newMessage.sender,
  //     }).select("name avatar following");
  //     res.json({
  //       success: true,
  //       msg: "Create Success!",
  //       conversation: newConversation,
  //       newMessage,
  //     });
  //   } catch (err) {
  //     return res.status(500).json({ success: false, msg: err.message });
  //   }
  // },
  getConversations: async (req, res) => {
    try {
      const features = new APIfeatures(
        Conversation.find({ users: { $elemMatch: { $eq: req.user.id } } }),
        req.query,
      ).paginating();

      const conversations = await features.query
        .sort("-updatedAt")
        .populate("latestMessage")
        .populate("users", "avatar name");

      res.json({
        message: "get data successfully",
        conversations,
        result: conversations.length,
      });
    } catch (err) {
      return res.status(500).json({ message: err.message });
    }
  },
  getMessages: async (req, res) => {
    try {
      const features = new APIfeatures(
        Messages.find({
          $and: [
            { conversation: req.params.id },
            { users: { $elemMatch: { $eq: req.user.id } } },
          ],
        }),
        req.query,
      ).paginating();

      const messages = await features.query
        .sort("-createdAt")
        .populate("sender", "name avatar");

      res.json({
        message: "get data successfully",
        messages,
        result: messages.length,
      });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },

  createMessage: async (req, res) => {
    const { sender, recipient, text, media, call, conversationId } = req.body;
    let file = req.files?.image;
    try {
      if (
        !conversationId ||
        (!text.trim() && !file && media?.length === 0 && !call)
      )
        return res
          .status(400)
          .json({ msg: "Invalid data passed into request" });

      var image = "";

      if (file) {
        image = await upload(
          file.tempFilePath,
          `novsocial/chats/${conversationId}`,
        );
      }

      let newMessage = new Messages({
        conversation: conversationId,
        sender,
        call,
        recipient,
        image,
        text,
        media,
      });

      await newMessage.save();

      newMessage = await newMessage.populate("sender", "name avatar");

      // newMessage = await newMessage.populate("conversation");
      // newMessage = await User.populate(newMessage, {
      //   path: "conversation.users",
      //   select: "name avatar email",
      // });

      await Conversation.findByIdAndUpdate(conversationId, {
        latestMessage: newMessage,
      });
      res.json({
        success: true,
        msg: "Create Success!",
        newMessage,
      });
    } catch (err) {
      return res.status(500).json({ success: false, msg: err.message });
    }
  },

  deleteMessages: async (req, res) => {
    try {
      const message = await Messages.findOneAndDelete({
        _id: req.params.id,
        sender: req.user.id,
      });
      if (message.image) {
        await destroy(message.image);
      }
      res.json({ msg: "Delete Success!" });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  deleteConversation: async (req, res) => {
    try {
      const newConversation = await Conversation.findOneAndDelete({
        $or: [
          { recipients: [req.user._id, req.params.id] },
          { recipients: [req.params.id, req.user._id] },
        ],
      });
      await Messages.deleteMany({ conversation: newConversation._id });

      res.json({ msg: "Delete Success!" });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
};

module.exports = chatController;

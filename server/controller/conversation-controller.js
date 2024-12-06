const conversation = require("../model/conversation");

const newConversation = async (req, res) => {
  try {
    const senderId = req.body.senderId;
    const receiverId = req.body.receiverId;
    const exist = await conversation.findOne({
      members: { $all: [senderId, receiverId] },
    });
    if (exist) {
      return res.status(200).json("Conversation already exist");
    }
    const newConversation = new conversation({
      members: [senderId, receiverId],
    });
    await newConversation.save();
    return res.status(200).json("Conversation created successfully");
  } catch (error) {
    return res.status(500).json(error.message);
  }
};
const getConversation = async (req, res) => {
  try {
    const senderId = req.body.senderId;
    const receiverId = req.body.receiverId;
    const existingConversation = await conversation.findOne({
      members: { $all: [senderId, receiverId] },
    });
    return res.status(200).json(existingConversation);
  } catch (error) {
    return res.status(500).json(error.message);
  }
};
module.exports = { newConversation, getConversation };

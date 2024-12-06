const message = require("../model/message");
const conversation = require("../model/conversation");
const newMessage = async (req, res) => {
  try {
    const savemessage = new message(req.body);
    await savemessage.save();
    await conversation.findByIdAndUpdate(req.body.conversationId, {
      message: req.body.text,
    });
    return res.status(200).json("Message has been saved successfully");
  } catch (error) {
    return res.status(500).json(error.message);
  }
};
const getMessage = async (req, res) => {
  try {
    const messages = await message.find({ conversationId: req.params.id });
    return res.status(200).json(messages);
  } catch (error) {
    return res.status(500).json(error.message);
  }
};
module.exports = { newMessage, getMessage };

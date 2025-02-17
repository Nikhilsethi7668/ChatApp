const mongoose = require("mongoose");

const ConversationSchema = new mongoose.Schema(
  {
    members: {
      type: Array,
    },
    message: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);
const conversation = mongoose.model("conversation", ConversationSchema);
module.exports = conversation;

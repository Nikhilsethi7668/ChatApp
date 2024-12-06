const express = require("express");
const { addUser, getUser } = require("../controller/user-controller"); // Use destructuring here
const {
  newConversation,
  getConversation,
} = require("../controller/conversation-controller");
const { newMessage, getMessage } = require("../controller/message-controller");
const { uploadFile, getFile } = require("../controller/file-controller");
const { upload } = require("../utils/upload");

const route = express.Router();
route.post("/add", addUser);
route.get("/users", getUser);
route.post("/conversation/add", newConversation);
route.post("/conversation/get", getConversation);
route.post("/message/add", newMessage);
route.get("/message/get/:id", getMessage);
route.post("/file/upload", upload.single("file"), uploadFile);
route.get("/file/:filename", getFile);

module.exports = route;

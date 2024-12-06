const { Server } = require("socket.io");

const io = new Server(9000, {
  cors: {
    origin: "http://localhost:5173",
  },
});

let users = [];

const addUser = (userData, socketId) => {
  if (!users.some((user) => user.sub === userData.sub)) {
    users.push({ ...userData, socketId });
  }
};

const getUser = (userId) => {
  return users.find((user) => user.sub === userId);
};

io.on("connection", (socket) => {
  console.log("User connected:", socket.id);

  // Add user when they join
  socket.on("addUsers", (userData) => {
    addUser(userData, socket.id);
    io.emit("getUsers", users);
  });

  // Handle sending messages
  socket.on("sendMessages", (data) => {
    const user = getUser(data.receiverId);
    if (user) {
      io.to(user.socketId).emit("getMessage", data);
    }
  });

  // Handle user disconnection
  socket.on("disconnect", () => {
    users = users.filter((user) => user.socketId !== socket.id);
    io.emit("getUsers", users);
    console.log("User disconnected:", socket.id);
  });
});

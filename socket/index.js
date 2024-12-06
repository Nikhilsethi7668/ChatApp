const { Server } = require("socket.io");

const PORT = process.env.PORT || 9000; // Use environment variable or default to 9000

const io = new Server(PORT, {
  cors: {
    origin: "*", // Replace "*" with your frontend URL for security
    methods: ["GET", "POST"],
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

console.log(`Socket.IO server running on port ${PORT}`);

const express = require("express");
const cors = require("cors");
const bodyparser = require("body-parser");
const dotenv = require("dotenv");
const route = require("../server/routes/route");
const Connection = require("./database/db");

// Load environment variables
dotenv.config();

const app = express();

// Middleware
app.use(
  cors({
    origin: "https://echochat-1.onrender.com/", // Allow requests only from the frontend
    methods: ["GET", "POST"],
  })
);
app.use(bodyparser.json({ extended: true }));
app.use(bodyparser.urlencoded({ extended: true }));

// Routes
app.use("/", route);

// Port configuration
const PORT = process.env.PORT || 8000;

// Database connection
Connection();

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

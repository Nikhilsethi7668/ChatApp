const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();
const URL = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.4q2wn.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

const Connection = async () => {
  try {
    await mongoose.connect(URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connected to MongoDB successfully!");
  } catch (error) {
    console.log("MongoDB connection error:", error.message);
  }
};
module.exports = Connection;

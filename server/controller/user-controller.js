const user = require("../model/User");

const addUser = async (request, response) => {
  try {
    let exist = await user.findOne({ sub: request.body.sub });

    if (exist) {
      return response.status(409).json({ message: "User already exists" });
    }

    const newUser = new user(request.body);
    await newUser.save();
    response.status(201).json(newUser, "saved successfully");
  } catch (error) {
    response.status(500).json({ error: error.message });
  }
};

const getUser = async (request, response) => {
  try {
    const users = await user.find({});
    response.status(200).json(users);
  } catch (error) {
    response.status(500).json({ error: error.message });
  }
};

module.exports = { addUser, getUser };

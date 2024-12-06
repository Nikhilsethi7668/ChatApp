const express = require("express");
const Connection = require("./database/db");
const cors = require("cors");
const route = require("../server/routes/route");
const bodyparser = require("body-parser");

const app = express();
app.use(cors());
app.use(bodyparser.json({ extended: true }));
app.use(bodyparser.urlencoded({ extended: true }));
app.use("/", route);
const PORT = 8000;
Connection();
app.listen(PORT, () => {
  console.log(`server is running on port ${PORT}`);
});

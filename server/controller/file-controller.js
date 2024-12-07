const grid = require("gridfs-stream");

const mongoose = require("mongoose");
const url = "https://chatapp-jevz.onrender.com";
let gfs;
let gridfsBucket;
const conn = mongoose.connection;
conn.once("open", () => {
  gridfsBucket = new mongoose.mongo.GridFSBucket(conn.db, {
    bucketName: "fs",
  });
  gfs = grid(conn.db, mongoose.mongo);
  gfs.collection("fs");
});

const uploadFile = (req, res) => {
  if (!req.file) {
    return res.status(404).json("File not found");
  }
  const imageUrl = `${url}/file/${req.file.filename}`;
  res.status(200).json(imageUrl);
};
const getFile = async (req, res) => {
  try {
    const file = await gfs.files.findOne({ filename: req.params.filename });
    const readstream = gridfsBucket.openDownloadStream(file._id);
    readstream.pipe(res);
  } catch (error) {
    return res.status(500).json({ msg: error.message });
  }
};
module.exports = { uploadFile, getFile };

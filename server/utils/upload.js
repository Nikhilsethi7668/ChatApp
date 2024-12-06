const multer = require("multer");
const { GridFsStorage } = require("multer-gridfs-storage");
const dotenv = require("dotenv");
dotenv.config();
const url = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.4q2wn.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;
const storage = new GridFsStorage({
  url: url,
  options: { useNewUrlParser: true },
  file: (req, file) => {
    const match = ["image/jpg", "image/png"];
    if (match.indexOf(file.mimetype) === -1) {
      return `${Date.now()}-blog-${file.originalname}`;
    }
    return {
      bucketName: "photos",
      filename: `${Date.now()}-blog-${file.originalname}`,
    };
  },
});

const upload = multer({ storage });
module.exports = { upload };

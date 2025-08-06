// import multer from "multer";

// const upload = multer({dest:"uploads/"});
// export default upload


// utils/multer.js
import multer from "multer";
import fs from "fs";

// use disk storage with filename config
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage });

export default upload;


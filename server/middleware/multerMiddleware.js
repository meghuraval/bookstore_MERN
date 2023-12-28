const multer = require("multer");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    // Set the destination folder for uploaded files
    cb(null, __dirname + "/../uploads/");
    // Here, __dirname gives the current directory of the current file (multermiddleware.js)
    // So, "../uploads/" goes up one directory level to the Server folder, then goes into the uploads folder
  },
  filename: function (req, file, cb) {
    // Set the file name for the uploaded file
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: storage });

module.exports = upload;

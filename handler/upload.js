const multer = require("multer");

// Configure Multer
const multerOptions = {
  storage: multer.memoryStorage(),
  fileFilter(req, file, next) {
    const isPhoto = file.mimetype.startsWith("image/");
    if (!isPhoto) req.fileValidationError = "That file type is not valid";
    next(null, true);
  }
};

module.exports = multer(multerOptions).single("image");

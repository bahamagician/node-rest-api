const multer = require("multer");

// Configure Multer
const multerOptions = {
  storage: multer.memoryStorage(),
  fileFilter(req, file, next) {
    const isPhoto = file.mimetype.startsWith("image/");
    if (isPhoto) {
      next(null, true);
    } else {
      next({ message: "That filetype isn't allowed!" }, false);
    }
  }
};

const upload = multer(multerOptions).single("image");
exports.upload = (req, res, next) => {
  upload(req, res, function(err) {
    if (err) {
      return res.status(400).send("Nah");
    }
    next();
  });
};

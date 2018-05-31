const jimp = require("jimp");
const uuid = require("uuid");

module.exports = async (req, res, next, folder, width) => {
  // If multer's config detects an invalid image type...
  if (req.fileValidationError)
    return res.status(400).json(req.fileValidationError);

  // check if there is no new file to resize
  if (!req.file) {
    next(); // skip to the next middleware
    return;
  }
  const extension = req.file.mimetype.split("/")[1];
  req.body.image = `${uuid.v4()}.${extension}`;
  // now we resize
  const photo = await jimp.read(req.file.buffer);
  await photo.resize(width, jimp.AUTO);
  await photo.write(`./public/images/${folder}/${req.body.image}`);
  // once we have written the photo to our filesystem, keep going!
  next();
};

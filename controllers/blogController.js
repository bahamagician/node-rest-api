const mongoose = require("mongoose");
const { Blog, validate } = require("../models/Blog");
const _ = require("lodash");
const jimp = require("jimp");
const uuid = require("uuid");

exports.index = async (req, res) => {
  const blogs = await Blog.find().sort("_id");
  res.send(blogs);
};

exports.show = async (req, res) => {
  const blog = await Blog.find({ _id: req.params.id });
  if (!blog) return res.status(404).send("That blog was not found");
  res.send(blog);
};

exports.resize = async (req, res, next) => {
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
  await photo.resize(800, jimp.AUTO);
  await photo.write(`./public/images/blogs/${req.body.image}`);
  // once we have written the photo to our filesystem, keep going!
  next();
};

exports.store = async (req, res, next) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  const blog = await new Blog(
    _.pick(req.body, ["title", "slug", "body", "image"])
  ).save();
  res.send(blog);
};

exports.test = (req, res) => {
  res.send(res.locals.user);
};

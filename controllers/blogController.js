const mongoose = require("mongoose");
const { Blog, validate } = require("../models/Blog");
const _ = require("lodash");
const { singleUpload } = require("../helpers/upload");
const resize = require("../helpers/resize");

// Show all blogs
exports.index = async (req, res) => {
  res.json(await Blog.paginate({}, { page: 1, limit: 3 }));
};

// Show Single Blog
exports.show = async (req, res) => {
  const blog = await Blog.find({ _id: req.params.id });
  if (!blog) return res.status(404).send("That blog was not found");
  res.send(blog);
};

// Save a Blog
exports.store = async (req, res, next) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  const blog = await new Blog(
    _.pick(req.body, ["title", "slug", "body", "image"])
  ).save();
  res.send(blog);
};

// Upload Image Middleware
exports.upload = singleUpload;

// Resize & Save Image Middleware
exports.resize = async (req, res, next) => {
  resize(req, res, next, "blogs", 800);
};

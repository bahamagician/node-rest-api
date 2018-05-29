const mongoose = require("mongoose");
const { Blog, validate } = require("../models/Blog");
const _ = require("lodash");

exports.index = async (req, res) => {
  const blogs = await Blog.find().sort("_id");
  res.send(blogs);
};

exports.show = async (req, res) => {
  const blog = await Blog.find({ _id: req.params.id });
  if (!blog) return res.status(404).send("That blog was not found");
  res.send(blog);
};

exports.store = async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  const blog = await new Blog(
    _.pick(req.body, ["title", "slug", "body", "image"])
  ).save();
  res.send(blog);
};

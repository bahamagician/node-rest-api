const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate");
const Joi = require("joi");

// Define Schema
const blogSchema = new mongoose.Schema({
  title: {
    type: String,
    trim: true,
    required: true,
    min: 3,
    max: 255
  },
  slug: {
    type: String,
    required: true,
    trim: true,
    required: true,
    min: 3,
    max: 300
  },
  body: {
    type: String,
    trim: true,
    required: true,
    min: 3,
    max: 5000
  },
  image: {
    type: String,
    trim: true,
    min: 3,
    max: 500
  }
});

blogSchema.plugin(mongoosePaginate);

// Create Model
const Blog = mongoose.model("Blog", blogSchema);

// Define Validation
function validate(entry) {
  const schema = {
    title: Joi.string()
      .min(3)
      .max(255)
      .required(),
    slug: Joi.string()
      .min(3)
      .max(300)
      .required(),
    body: Joi.string()
      .min(3)
      .max(5000)
      .required(),
    image: Joi.string()
      .min(3)
      .max(500)
  };
  return Joi.validate(entry, schema);
}

exports.Blog = Blog;
exports.blogSchema = blogSchema;
exports.validate = validate;

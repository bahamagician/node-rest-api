const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate");
const Joi = require("joi");

// Define Schema
const pageSchema = new mongoose.Schema({
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

pageSchema.plugin(mongoosePaginate);

// Create Model
const Page = mongoose.model("Page", pageSchema);

exports.Page = Page;
exports.pageSchema = pageSchema;

const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Joi = require("joi");

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    unique: true,
    required: true
  },
  password: {
    type: String,
    required: true
  }
});

UserSchema.pre("save", async function(next) {
  var user = this;
  if (this.isModified("password") || this.isNew) {
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);
    next();
  } else {
    return next();
  }
});

UserSchema.methods.comparePassword = async function(pass) {
  const isMatch = await bcrypt.compare(pass, this.password);
  return isMatch;
};

UserSchema.methods.generateAuthToken = function() {
  return jwt.sign({ _id: this._id }, process.env.SECRET);
};

// Create model
const User = mongoose.model("User", UserSchema);

// Define Validation
function validate(entry) {
  const schema = {
    username: Joi.string()
      .min(3)
      .max(255)
      .required(),
    password: Joi.string()
      .min(3)
      .max(255)
      .required()
  };
  return Joi.validate(entry, schema);
}

exports.User = User;
exports.validate = validate;

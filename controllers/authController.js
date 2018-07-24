const mongoose = require("mongoose");
const { User, validate } = require("../models/User");
const AuthenticationError = require("../helpers/errors/AuthenticationError");
const ValidationError = require('../helpers/errors/ValidationError');

// Login Controller
exports.login = async (req, res, next) => {

  // Check for validation errors
  const { error } = validate(req.body);
  if (error) throw new ValidationError(error.details[0].message);

  // Find user based on provided username
  const user = await User.findOne({ username: req.body.username });

  // Throw error if username not found
  if (!user) throw new AuthenticationError();

  // Get user password
  const isValidPassword = await user.comparePassword(req.body.password);
  const result = {};

  if (isValidPassword) {

    // If password is valid, generate token.
    result.token = user.generateAuthToken();

  } else {

    // Throw error if password is invalid
    throw new AuthenticationError();

  }

  res.send(result);
};
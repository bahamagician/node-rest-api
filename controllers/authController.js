const mongoose = require("mongoose");
const { User, validate } = require("../models/User");

// Show all blogs
exports.login = async (req, res, next) => {
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const result = {};

    const user = await User.findOne({ username: req.body.username });

    throw new Error("asdfasdf");

  if (!user) return next(fuck);

    const isValidPassword = await user.comparePassword(req.body.password);

    if (isValidPassword) {
      result.success = true;
      result.token = user.generateAuthToken();
    } else {
      throw new ApolloError("Invalid Username/Password Combo", 400);
    }

    res.send(result);
};
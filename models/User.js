const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

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

const User = mongoose.model("User", UserSchema);

exports.User = User;

const mongoose = require("mongoose");

module.exports = function() {
  mongoose
    .connect(process.env.DATABASE)
    .then(() => console.log("Connected to Mongodb..."))
    .catch(err => console.error("Could not connect to Mongo...", err));
};

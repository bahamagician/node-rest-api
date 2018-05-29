require("express-async-errors");
const Joi = require("joi");
Joi.objectId = require("joi-objectid")(Joi);
const express = require("express");
const error = require("./middleware/error");
const routes = require("./routes/index");

const app = express();
app.use(express.json());

app.use("/", routes);

app.use(error);

module.exports = app;

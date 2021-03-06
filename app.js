require("express-async-errors");
const Joi = require("joi");
Joi.objectId = require("joi-objectid")(Joi);
const express = require("express");
const error = require("./middleware/error");
const routes = require("./routes/index");
const bodyParser = require("body-parser");
const { server } = require("./graphql/schema");
const cors = require("cors");
const auth = require("./middleware/auth");

const app = express();

// serves up static files from the public folder. Anything in public/ will just be served up as the file it is
app.use(express.static("public"));

app.use(cors(), auth);

// Takes the raw requests and turns them into usable properties on req.body
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

server.applyMiddleware({ app });

// The other routes
app.use("/", routes);

app.use(error.developmentErrors);

module.exports = app;

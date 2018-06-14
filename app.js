require("express-async-errors");
const Joi = require("joi");
Joi.objectId = require("joi-objectid")(Joi);
const express = require("express");
const error = require("./middleware/error");
const routes = require("./routes/index");
const bodyParser = require("body-parser");
const { graphqlExpress, graphiqlExpress } = require("apollo-server-express");
const { schema } = require("./graphql/schema");

const app = express();

// serves up static files from the public folder. Anything in public/ will just be served up as the file it is
app.use(express.static("public"));

// Takes the raw requests and turns them into usable properties on req.body
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// The GraphQL & GraphiQL Endpoints
app.use("/graphql", bodyParser.json(), graphqlExpress({ schema }));
app.use("/graphiql", graphiqlExpress({ endpointURL: "/graphql" }));

// The other routes
app.use("/", routes);

app.use(error.developmentErrors);

module.exports = app;

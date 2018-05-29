// Import Env Variables
require("dotenv").config({ path: "variables.env" });

// Connect to Mongo
require("./startup/db")();

// import all of our models
// require('./models/Model');

// Start our app!
const app = require("./app");
app.set("port", process.env.PORT || 7777);
const server = app.listen(app.get("port"), () => {
  console.log(`Express running → PORT ${server.address().port}`);
});

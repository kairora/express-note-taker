// requires in express and saves to variable
const express = require("express");
const app = express();

// saves port to a variable
const PORT = process.env.PORT || 8080;

// express app handles data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

require("./routes/apiRoutes")(app);
require("./routes/htmlRoutes")(app);


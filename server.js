// requires in express and saves to variable
const express = require("express");
const app = express();

// saves port to a variable
const PORT = process.env.PORT || 8080;

// express app handles data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// recognizes public folder css
app.use(express.static("public"));

require("./routes/apiRoutes")(app);
require("./routes/htmlRoutes")(app);

// server listens on the port and informs the user which port it listens on
app.listen(PORT, () => {
    console.log("App is listening on PORT: " + PORT)
})
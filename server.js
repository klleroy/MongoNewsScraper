const express = require("express");
const exphbs = require("express-handlebars");
const cheerio = require("cheerio");
const axios = require("axios");
const mongoose = require("mongoose");
const path = require("path");

//  If deployed, use the deployed databasel. Otherwise use the local mongoHeadlines DB
const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/mongoHeadlines";

mongoose.connect(MONGODB_URI);

// invoke express & port
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static(path.join(__dirname, "/public")));

// Handlebars
app.engine(
    "handlebars",
    exphbs({
        defaultLayout: "main"
    })
);

app.set("view engine", "handlebars");
require("./routes/htmlRoutes")(app);

app.listen(PORT, function() {
    console.log(
        "==> 🌎  Listening on port %s. Visit http://localhost:%s/ in your browser.",
      PORT,
      PORT
    );
});
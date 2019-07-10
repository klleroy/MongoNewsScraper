const express = require("express");
const logger = require("morgan");
const mongoose = require("mongoose");
const exphbs = require("express-handlebars");

const PORT = process.env.PORT || 3000;

//initialize express
const app = express();

//configure middleware

//use morgan logger for logging requests
app.use(logger("dev"));
//parse request body as JSON
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
//make public a static folder
app.use(express.static("public"));
app.engine('.hbs', exphbs({extname: '.hbs'}));
app.set('view engine', '.hbs');

// define mongodb connection
mongoose.connect(
    // use uri from env when in production
    process.env.NODE_ENV === "production"
      ? process.env.MONGO_DB_PROD_URI
      : "mongodb://localhost/mongoHeadlines",
    {
      // following lines are just to prevent deprecation warnings
      useNewUrlParser: true,
      useFindAndModify: false,
      useCreateIndex: true
    }
  );
//routes
const routes = require("./routes/index");
app.use(routes);

// start the server
app.listen(PORT, () => {
    console.log(
        `===> 🌎  Listening on port ${PORT}. Visit http://localhost:${PORT}/ in your browser.`
    );
});
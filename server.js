// Dependencies
const bodyParser = require('body-parser');
const logger = require('morgan');
const express = require('express');

const app = express();

const PORT = process.env.PORT || 3000;

// initalize morgan
app.use(logger('dev'));
app.use(
    bodyParser.urlencoded({
        extended:false
    })
);

// connect to public dir
app.use(express.static('public'));

// creating handlebars 
const exphbs = require('express-handlebars');
app.engine('handlebars',exphbs({defaultLayout: 'main'}));
app.set('view-engine','handlebars');

app.listen(PORT, () => {
    console.log(
        `==> 🌎  Listening on port ` + PORT
    )
});
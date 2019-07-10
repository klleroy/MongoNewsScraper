// Dependencies
const bodyParser = require('body-parser');
const logger = require('morgan');
const express = require('express');
const exphbs = require('express-handlebars');

const app = express();

const PORT = process.env.PORT || 3500;

// initalize morgan
app.use(logger('dev'));
app.use(
    bodyParser.urlencoded({
        extended:false
    })
);

// connect to public dir
app.use(express.static('public'));
app.use(express.json());

// creating handlebars 
app.engine(
    'handlebars',
    exphbs({
        defaultLayout: 'main'
    })
);

app.set(
    'view-engine',
    'handlebars'
);

const routes = require('./routes/routes');

app.use(routes);

app.engine('handlebars',exphbs({defaultLayout: 'main'}));
app.set('view-engine','handlebars');

app.listen(PORT, () => {
    console.log(
        `==> 🌎  Access your app at http://localhost:` + PORT
    )
});
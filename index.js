const express = require('express');
const path = require('path');
const logger = require('./middleware/logger');
const exphbs = require('express-handlebars');
const members = require('./Members');

//Instantiate the express app:
//This index.js file is the entry point
const app = express();

//standard fucntionality: render static content, render servers serverd templates, rest api

//render static content:

//commented so it doesent interfere with the handlebars content

//basic hello world response on a get request on uri: / - returns a manually selected page
//from the index itself
//usually routes are moved to a router
// app.get('/', function(req, res){
//     //load file selected with the path module
//     res.sendFile(path.join(__dirname, 'public', 'index.html'));
// });

//Set static folder: /index.html, /public.html now autowired to be served, no need for the logic above
//handles content type
//loads the files
//also middleware:
//app.use(express.static(path.join(__dirname, 'public')));

//---------------------------------------------------------

//Use middleware - request and response interceptors similar to spring filters

//init middleware (loaded from another module)
app.use(logger);

//Init integrated middleware for pasting json body from the request
app.use(express.json());

//Also middleware for form submitions:
app.use(express.urlencoded({extended: false}));

//Handlebars templating engine middleware
app.engine('handlebars', exphbs({defaultLayout : 'main'}));
app.set('view engine', 'handlebars');

//---------------------------------------------------------

//Render server served templates with handlebars templating library:

//render the index view on the homepage route
//first parameter is the name of the template file and seccond is an
//object with dynamic data - used similar to string interpolation in angular
app.get('/', (req, res) => res.render('index', {
    title : 'Members App',
    members
}));


//---------------------------------------------------------

//REST controller:

//Members api routes - members controller:
//specific routes and logic within that controller:
app.use('/api/members', require('./routes/api/members'));

//---------------------------------------------------------

//Server listening port and start configuration:

//run on the servers port specified in the enviroment variable PORT
//if that is not availible use 5000
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log("Server started"));
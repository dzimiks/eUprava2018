var express = require('express');
var path = require('path');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var passport = require('passport');
var flash = require('connect-flash');
var expressValidator = require('express-validator');
var mongoose = require('mongoose');
var session = require('express-session');
var MongoStore = require('connect-mongo')(session);
var fs = require('fs');
var sitemap = require('express-sitemap');
var exphbs = require("express-handlebars");

// Connecting to mongo
var dbURI = 'mongodb://localhost/www';
mongoose.connect(dbURI);

// Initializing mongo and passport
require('./euprava_server/models/db');
require('./config/passport');

// Setting global variables
global.uploadDir = path.join(__dirname, '/public/uploads');

// Setting routers
var mainRouter = require('./euprava_server/routes/mainRouter');

var app = express();

// View engine setup
app.set('views', path.join(__dirname, 'euprava_server', 'views'));

// Handlebars
var hbsHelper = require("./euprava_server/misc/helpers.js");

app.engine("hbs", exphbs({
  layoutsDir: path.join(__dirname, 'euprava_server', 'views'),
  extname: ".hbs",
  helpers: hbsHelper.helpers
}));
app.set("view engine", "hbs");

// Logger
app.use(logger('combined', {
  skip: function (req, res) {
    return res.statusCode < 400
  }
}));

// Body parser & validator
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

//Validator
app.use(expressValidator());

// Cookie parser
app.use(cookieParser());

// Setting static folder
app.use(express.static(path.join(__dirname, 'public')));

// Create folders for upload if they don't exist
var uploadsDir = path.join(__dirname, '/public/uploads');

if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir);
}

// Session and user management
app.use(session({
  secret: 'supersecretsecret',
  resave: false,
  saveUninitialized: false,
  store: new MongoStore({mongooseConnection: mongoose.connection}),
  cookie: {maxAge: 14 * 24 * 60 * 60 * 1000}
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

// Setup global ("login") variable to store authentication status.
app.use(function (req, res, next) {
  res.locals.login = req.isAuthenticated();
  res.locals.session = req.session;
  next();
});

app.use('/', mainRouter);

// Sitemap and robots.txt generation
var map = sitemap({
  generate: mainRouter,
  cache: 600000, // enable 1h cacheisAuthenisAuthenticatedticated
  url: 'www.com',
  sitemapSubmission: '/sitemap.xml',
  route: {
    '/signin': {
      disallow: true,
      hide: true
    },
    '/logout': {
      disallow: true,
      hide: true
    }
  }
});

app.get('/sitemap.xml', function (req, res) { // send XML map
  map.XMLtoWeb(res);
});
app.get('/robots.txt', function (req, res) { // send TXT map

  map.TXTtoWeb(res);
});

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// catch 403 and forward to error handler
app.use(function (err, req, res, next) {
  if (err.code !== 'EBADCSRFTOKEN') return next(err);

  // handle CSRF token errors here
  res.status(403);
  next(err);
});


// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  console.log(err);

  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
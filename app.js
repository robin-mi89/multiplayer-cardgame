var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var sassMiddleware = require('node-sass-middleware');
var passport = require('passport');
var session = require('express-session');
var flash = require('connect-flash');

// Add routes here
var index = require('./routes/index');
var memes = require('./routes/memes');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
app.set('view options', {
  layout: 'layout'
});

app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
require('./config/passport.js')(passport);
app.use(logger('dev'));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true
  })
);

app.use(
  sassMiddleware({
    src: path.join(__dirname, 'public'),
    dest: path.join(__dirname, 'public'),
    outputStyle: 'expanded',
    indentedSyntax: false,
    sourceMap: true
  })
);
app.use(express.static(path.join(__dirname, 'public')));
app.use(
  session({
    secret: 'whynotzoidberg'
  })
);

app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

// Routes defined here
app.use('/', index);
app.use('/memes', memes);
require('./routes/google-auth.js')(app, passport);

// Error handlers
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

app.use(function(err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error', {
    message: "Sorry but we could not find that :(",
    error: err
  });
});

module.exports = app;

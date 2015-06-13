// modules
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var express = require('express');
var favicon = require('serve-favicon');
var morgan = require('morgan');
var mongoose = require('mongoose');
var path = require('path');
var passport = require('passport');
var session = require('express-session');

// configuration
var config = require('./config.json');

// init express
var app = express();

// database
require('./app/database')(mongoose, config);

// authentication
require('./app/authentication')(app, config, passport);

// set views
app.set('views', path.join(__dirname + '/public/views'));
app.set('view engine', 'jade');

// logger
app.use(morgan('dev'));

// body parsing
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

// favicon
app.use(favicon(__dirname + '/public/favicon.ico'));

// store current url in middleware
app.use(function(req, res, next) {
  res.locals.url = req.url;
  next();
});

// routes
require('./app/routes')(app, passport);
app.use(express.static(__dirname + '/public'));

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// development error handler - will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', { message: err.message, error: err });
  });
}

// production error handler - no stacktrace leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', { message: err.message, error: {} });
});

app.listen(config.port);
console.log('Application started on port ' + config.port);

exports = module.exports = app;

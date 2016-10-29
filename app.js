"use strict";

var express = require('express');
var path = require('path');
require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var customError = require('./lib/customError');

var app = express();

//conexion a la base de datos
require('./lib/mongoConnection');


//cargo modelos
require('./models/anuncio.model');

require('./models/usuario.model');



// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/apiv1/anuncios', require('./routes/anuncios.router'));

app.use('/apiv1/tags', require('./routes/tags.router'));

app.use('/apiv1/users', require('./routes/users.router'));
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res) {

    var lang = req.acceptsLanguages()[0] || customError.languages.ENGLISH;

    if(!lang || lang === '*'){
      lang = customError.languages.ENGLISH;
    }

    res.status(err.code || 500).send(customError.getError(err.error, lang.substring(0, 2)));
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res) {
  var lang = req.acceptsLanguages()[0];

  if(!lang || lang === '*'){
    lang = customError.languages.ENGLISH;
  }

  res.status(err.code || 500).send(customError.getError(err.error, lang.substring(0, 2)));
});


module.exports = app;

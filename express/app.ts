var cors = require('cors')
var createError = require('http-errors');
import express from 'express';
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var sunabarRouter = require('./routes/sunabar');

var app = express();
app.use(cors())

// view engine setup
app.set('views', path.join('views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join('public')));

app.use('/', indexRouter);
app.use('/sunabar', sunabarRouter);

// catch 404 and forward to error handler
app.use(function(req: express.Request, res: express.Response, next: express.NextFunction) {
  next(createError(404));
});

// error handler
app.use(function(err: any, req: express.Request, res: express.Response, next: express.NextFunction) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;

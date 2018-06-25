var createError = require('http-errors');
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');

var env = require('dotenv').load();

var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/CasinoBots', { promiseLibrary: require('bluebird') })
  .then(() =>  console.log('connection successful'))
.catch((err) => console.error(err));

//Models
var models = require('./models');

//Sync Database
models.sequelize.sync().then(function(){
  console.log('Nice! Database looks fine')

}).catch(function(err){
  console.log(err,"Something went wrong with the Database Update!")
});

var apiRouter = require('./routes/casinoBot');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'dist/CasinoBot')));
app.use('/', express.static(path.join(__dirname, 'dist/CasinoBot')));
app.use('/api', apiRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.send(err.status);
});

module.exports = app;

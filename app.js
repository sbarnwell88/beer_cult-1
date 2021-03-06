require('dotenv').config();
var mongoose = require('mongoose');
mongoose.connect(process.env.MONGODB_URI);

var express = require('express');
var path = require('path');
var hbs = require('hbs');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');

var welcome = require('./routes/welcome');
var brewery = require('./routes/brewery');
var users = require('./routes/users');
var beers = require('./routes/beers');


var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

// uncomment after placing your favicon in /public
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(methodOverride ('_method'));

app.use('/', welcome);
app.use('/users', users);
app.use('/brewery/:breweryId/beer/', beers);
app.use('/brewery', brewery);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// mongoose stuff
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/beer_cult');

// // Now that we're connected, let's save that connection to the database in a variable.
var db = mongoose.connection;

// // Will log an error if db can't connect to MongoDB
db.on('error', function(err){
  console.log(err);
});

// // Will log "database has been connected" if it successfully connects.
db.once('open', function() {
  console.log("database has been connected!");
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;


app.listen(3000, function(){
  console.log("app listening on port 3000");
});

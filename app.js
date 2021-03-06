var express = require('express');
var logger = require('morgan');
var path = require('path');
var methodOverride = require('method-override');
var bodyParser = require('body-parser');

var routes = require('./routes/index');
var books = require('./routes/books');
var loans = require('./routes/loans');
var patrons = require('./routes/patrons');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

//attach styles
app.use(express.static(path.join(__dirname, 'public')));

app.use(methodOverride('_method'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));


app.use('/', routes);
app.use('/', loans);
app.use('/', books);
app.use('/', patrons);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
	var err = new Error('Not Found');
	err.status = 404;
	next(err);
});

// error handlers

//development error handler
//will print stacktrace
if(app.get('env') === 'development'){
	app.use(function(err, req, res, next) {
		res.status(err.status || 500);
		res.render('error', {
			message: err.message,
			error: err
		});
	});
};

//production error handler
//no stacktraces leaded to user
app.use(function(err, req, res, next){
	res.status(err.status || 500);
	res.render('error', {
		message: err.message,
		error: {}
	});
});

module.exports = app;
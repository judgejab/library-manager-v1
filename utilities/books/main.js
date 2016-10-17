'use strict';

var allBooks = require('./all_books.js');
var checkedOut = require('./checked_out.js');
var overdue = require('./overdue.js');

module.exports = function(req, res, next) {

	//If checked out then filter 
	if(req.query.filter === "checked_out"){
		checkedOut(req, res, next);
	} else if (req.query.filter === "overdue"){
		//If overdue then filter
		overdue(req, res, next);
	} else {
		//Else show all books
		allBooks(req, res, next);
	}
};
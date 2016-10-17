'use strict';

var allLoans = require('./all_loans.js');
var checkedOut = require('./checked_out_loans.js');
var overdue = require('./overdue_loans.js');

module.exports = function(req,res,next){
	//If checked out then filter 
	if(req.query.filter === "checked_out"){
		checkedOut(req, res, next);
	} else if (req.query.filter === "overdue"){
		//If overdue then filter
		overdue(req, res, next);
	} else {
		//Else show all books
		allLoans(req, res, next);
	}
};
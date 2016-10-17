// go to return loan page

'use strict';

var Loans = require("../../models").loans;
var Books = require('../../models').books;
var Patrons = require('../../models').patrons;
var getDate = require('./get_date.js');

module.exports = function(req, res, next){
	console.log(req.params.id);
	// use sequlize to return specific loans
  // include books & patrons models associated
	Loans.findById(req.params.id, {include: [{model: Books}, {model: Patrons}]})
	.then(function(loan){
		// render view with needed data
    	res.render('partials/return_book', { loan: loan, today: getDate(), title: 'Patron: Return Book' });
	}).catch(function(err){
		console.log(err)
		next(err);
		res.sendStatus(500);
	});
};
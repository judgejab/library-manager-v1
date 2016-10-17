//overdue loans 

'use strict'

var Loans = require("../../models").loans;
var Books = require('../../models').books;
var Patrons = require('../../models').patrons;

// GET all books
module.exports = function(req, res, next){

	var pagingLimit = 10;
	var page = req.params.page;

	Loans.findAndCountAll({where: {returned_on: null, return_by: {$lt: new Date()}}, limit: pagingLimit, offset: (page - 1) * pagingLimit, include: [{ model: Books }, { model: Patrons }]})
		.then(function(overdue){
		if(overdue){
			res.render('partials/loans', {count: overdue.count, loans: overdue.rows, title: 'Overdue Loans'});
		}else{
			res.sendStatus(404);
		}
	}).catch(function(err){
		next(err);
		res.sendStatus(500);
	});	
};
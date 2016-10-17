// go to new loan page
'use strict'

var Books = require('../../models').books;
var Patrons = require('../../models').patrons;
var getDate = require('./get_date.js');

module.exports = function(req,res,next){

	//today's date
	var today = new Date();

	//today's date + 7 days
	var addAWeek = new Date();
	addAWeek.setDate(today.getDate() + 7);


	Books.findAll({attributes: ['id', 'title'], order: 'title'})
	.then(function(books){

		Patrons.findAll({attributes: ['id', 'first_name', 'last_name'], order: 'last_name'})
		.then(function(patrons){

			res.render('partials/new_loan', {books: books, patrons: patrons, today: getDate(), due:getDate(addAWeek), title: 'New Loan'});
		}).catch(function(err){
		next(err);
		res.sendStatus(500);
		});
	}).catch(function(err){
		next(err);
		res.sendStatus(500);
	});	
};


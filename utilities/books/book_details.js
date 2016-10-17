'use strict'

var Books = require("../../models").books;
var Loans = require('../../models').loans;
var Patrons = require('../../models').patrons;

// GET all books
module.exports = function(req, res, next){
	//get all books, use sequelize to return book, include loan and patron models
	//only include results where book id equals req.params.id
	Books.findAll({include: [{model: Loans, include: [{model: Patrons}]}], where: {id: req.params.id}})
	.then(function(book){
		if(book){
			//create variables
			var bookObject = {};
			var loanArray = [];
			var getLoans = JSON.parse(JSON.stringify(book));
			console.log(getLoans);

			//create object for book data
			bookObject = {
				id: getLoans[0].id,
				title: getLoans[0].title,
				author: getLoans[0].author,
				genre: getLoans[0].genre,
				first_published: getLoans[0].first_published
			};

			//get loan information from getLoans
			for(var i = 0; i< getLoans.length; i++){
				//if there are no loans for the book...
				if(getLoans[i].loan === null){
					loanArray = [];
				}else{
					loanArray.push(getLoans[i].loan);
				}
			}

			res.render('partials/book_details', {book: bookObject, loans: loanArray, title: book.title});
		}else{
			res.sendStatus(404);
		}
	}).catch(function(err){
		// log error and send 500 status
   		console.log(err);
		next(err);
		res.sendStatus(500);
	});	
};
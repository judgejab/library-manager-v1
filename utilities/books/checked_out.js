'use strict'

var Books = require("../../models").books;
var Loans = require("../../models").loans;

// GET all books
module.exports = function(req, res, next){

	var pagingLimit = 10;
	var page = req.params.page;

	Books.findAndCountAll({limit: pagingLimit, offset: (page - 1) * pagingLimit, include: [{model: Loans, where: {returned_on: null}}]})
	.then(function(checkedOut){
		if(checkedOut){
			res.render('partials/books', {count: checkedOut.count, books: checkedOut.rows, title: 'Checked Out Books'});
		}else{
			res.sendStatus(404);
		}
	}).catch(function(err){
		next(err);
		res.sendStatus(500);
	});	
};
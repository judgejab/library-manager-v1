'use strict'

var Books = require("../../models").books;

// GET all books
module.exports = function(req, res, next){

	var pagingLimit = 10;
	var page = req.params.page;

	Books.findAndCountAll({limit: pagingLimit, offset: (page - 1) * pagingLimit})
	.then(function(allBooks){
		if(allBooks){
			res.render('partials/books', {count: allBooks.count, books: allBooks.rows, title: 'Books'});
		}else{
			res.sendStatus(404);
		}
	}).catch(function(err){
		next(err);
		res.sendStatus(500);
	});	
};

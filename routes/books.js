'use strict';

var express = require('express');
var router = express.Router();

var booksMain = require('../utilities/books');

//Main Book Page routes GET
// All books and filter by overdue and checked out
router.get('/books/page/:page', function(req, res, next){
	booksMain.main(req,res,next);
});

//Create a New book form
router.get('/books/new', function (req, res, next) {
  res.render('partials/new_book', { title: 'New Book' });
});

//POST add new book
router.post('/books/new', function (req, res, next) {
	booksMain.new(req,res,next);
});

//Book Detail route
router.get('/books/:id', function(req, res, next){
	booksMain.details(req,res,next);
});

//Update Book Detail route PUT
router.put('/books/:id', function (req, res, next) {
	booksMain.update(req,res,next);
});

module.exports = router;
// post new loan to database 
'use strict'

var Loans = require("../../models").loans;
var Patrons = require('../../models').patrons;
var Books = require('../../models').books;

var getDate = require('./get_date.js');

// export module
module.exports = function (req, res, next) {

// create loan object
  var loanObject = {};
  // add data for loan object using dot notation
  loanObject.book_id = req.body.book_id;
  loanObject.patron_id = req.body.patron_id;
  loanObject.loaned_on = req.body.loaned_on;
  loanObject.return_by = req.body.return_by;

  // use sequlize to create a new loan from form data sent through req.body
  Loans.create(loanObject).then(function (book) {
    // redirect page on successful query
    res.redirect('/loans/page/1');
  // catch any errors
  }).catch(function (err) {
    // check for data validation errors
    if (err.name === 'SequelizeValidationError') {
	    	//today's date
		var today = new Date();

		//today's date + 7 days
		var addAWeek = new Date();
		addAWeek.setDate(today.getDate() + 7);


		Books.findAll({attributes: ['id', 'title'], order: 'title'})
		.then(function(books){

			Patrons.findAll({attributes: ['id', 'first_name', 'last_name'], order: 'last_name'})
			.then(function(patrons){

				res.render('partials/new_loan', {books: books, patrons: patrons, today: getDate(), due:getDate(addAWeek), errors:err.errors, title: 'New Loan'});
			}).catch(function(err){
				console.log(err);
				next(err);
				res.sendStatus(500);
			});
		}).catch(function(err){
			console.log(err);
			next(err);
			res.sendStatus(500);
		});	
    } else {
      // throw error to be handled by final catch
      throw err;
    }
  // catch any errors
  }).catch(function (err) {
    // log errors to console & send status 500
    console.log(err);
    // pass error to express error handler to display proper error view
    next(err);
    res.sendStatus(500);
  });
};
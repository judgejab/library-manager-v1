// return loan and update database

'use strict';

var Loans = require("../../models").loans;
var Books = require('../../models').books;
var Patrons = require('../../models').patrons;
var getDate = require('./get_date.js');

module.exports = function(req,res,next){
	//find and return specific loan
	Loans.findById(req.params.id, {}).then(function(loan){
		//if loan exists
		if(loan){
			//return updated loan
			return loan.update({returned_on: req.body.returned_on})
		}else{
			res.sendStatus(404);
		}
	})

	.then(function(loan){
		res.redirect('/loans/page/1');

	//catch any errors	
	}).catch(function(err){
		// check for data validation errors
    	if (err.name === 'SequelizeValidationError') {
    		Loans.findById(req.params.id, {include: [{model: Books}, {model: Patrons}]})
			.then(function(loan){
				// render view with needed data
		    	res.render('partials/return_book', { loan: loan, today: getDate(), title: 'Patron: Return Book' });
			}).catch(function(err){
				console.log(err)
				next(err);
				res.sendStatus(500);
			});
    	}else{
    		// throw error to be handled by final catch
    		throw err;
    	}
	}).catch(function (err) {
    // log errors to console & send status 500
    console.log(err);
    // pass error to express error handler to display proper error view
    next(err);
    res.sendStatus(500);
  });
}
'use strict';

var express = require('express');
var router = express.Router();

var loansMain = require('../utilities/loans');

// Get main loan page, be able to filter between ALL, OVERDUE and CHECKED_OUT
router.get('/loans/page/:page', function(req, res, next){
	loansMain.main(req,res,next);
});

//Go to return loan page
router.get('/loans/:id/return', function(req, res, next){
	loansMain.returnLoanPage(req,res,next);
});

//Set return loan details and PUT 
router.put('/loans/:id/return', function(req, res, next){
	loansMain.postReturnLoan(req,res,next);	
});

//Go to create a new loan page
router.get('/loans/new', function(req, res, next){
	loansMain.newLoanPage(req,res,next);
});

//POST the new loan
router.post('/loans/new', function(req, res, next){
	loansMain.postNewLoan(req,res,next);
});

module.exports = router;


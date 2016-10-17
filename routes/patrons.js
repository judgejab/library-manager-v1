'use strict';

var express = require('express');
var router = express.Router();

var patronsMain = require('../utilities/patrons');

// view all patrons
router.get('/patrons/page/:page', function(req, res, next){
	patronsMain.main(req,res,next);
});

// go view individual patron details
router.get('/patrons/:id', function(req, res, next){
	patronsMain.details(req,res,next);
});

// edit patron details
router.put('/patrons/:id', function(req, res, next){
	patronsMain.edit(req,res,next);
});

// go to 'create a new patron' page
router.get('/patron/new', function(req, res, next){
	res.render('partials/new_patron', { title: 'New Patron' });
}); 

// add the patron to database
router.post('/patron/new', function(req, res, next){
	patronsMain.new(req,res,next);
});

module.exports = router;
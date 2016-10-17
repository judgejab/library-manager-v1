//get patron details

var Loans = require("../../models").loans;
var Books = require('../../models').books;
var Patrons = require('../../models').patrons;

module.exports = function(req,res,next){

	Patrons.findById(req.params.id, {}).
	then(function(patron){
		// use sequlize to return all loans for specific id
    	// return only certain attributes
    	Loans.findAll({include: [{ model: Books, attributes: ['id', 'title']}, {model:Patrons, where: {id: req.params.id}, attributes:['first_name', 'last_name']}]})
    	.then(function(results){
    		if(results){
    			res.render('partials/patron_details', {patron: patron, results: results, title: patron.first_name + ' ' + patron.last_name });
    		}
    	}).catch(function (err) {
	      console.log(err);
	      // pass error to express error handler to display proper error view
	      next(err);
	      res.sendStatus(500);
	    });
	}).catch(function (err) {
	    console.log(err);
	    // pass error to express error handler to display proper error view
	    next(err);
	    res.sendStatus(500);
	});
};
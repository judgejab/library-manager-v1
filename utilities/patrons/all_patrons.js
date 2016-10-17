'use strict'

var Patrons = require("../../models").patrons;

// GET all books
module.exports = function(req, res, next){

	var pagingLimit = 10;
	var page = req.params.page;

	Patrons.findAndCountAll({limit: pagingLimit, offset: (page - 1) * pagingLimit, order: ['last_name']})
	.then(function(allPatrons){
		if(allPatrons){
			res.render('partials/patrons', {count: allPatrons.count, patrons: allPatrons.rows, title: 'All Patrons'});
		}else{
			res.sendStatus(404);
		}
	}).catch(function(err){
		next(err);
		res.sendStatus(500);
	});	
};

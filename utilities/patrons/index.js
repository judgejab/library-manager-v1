
'use strict';

// main list all patrons
exports.main = require('./all_patrons.js');

// new patron
exports.new = require('./add_patron.js');

// edit patron details
exports.edit = require('./edit_patron.js');

// view patron details
exports.details = require('./patron_details.js');
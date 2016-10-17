'use strict';
module.exports = function(sequelize, DataTypes) {
  var Loans = sequelize.define('loans', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true
    },
    book_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    patron_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    loaned_on: {
      type: DataTypes.DATEONLY,
      validate: {
        isDate: {
          msg: "Loaned on date is required"
        }
      }
    },
    return_by: {
      type: DataTypes.DATEONLY,
      validate: {
        isDate: {
          msg: "Return by date is required"
        }
      }
    },
    returned_on: {
      type: DataTypes.DATEONLY,
      validate: {
        notEmpty: {
          msg: "Returned on date is required"
        },
        isDate: {
          msg: "You must use a valid date. ex: 2016-07-15"
        }
      }
    }
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
        Loans.belongsTo(models.patrons, {foreignKey: 'patron_id'});
        Loans.belongsTo(models.books, {foreignKey: 'book_id'});
      }
    },
    timestamps: false
  });
  return Loans;
};
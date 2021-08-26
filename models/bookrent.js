'use strict';
const {
  Model
} = require('sequelize');
const { addDays } = require('../helpers/index')
const { dateInString } = require('../helpers/index')

module.exports = (sequelize, DataTypes) => {
  class BookRent extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }

    bDateInString() {
      return dateInString(this.bDate)
    }

    mDateInString() {
      return dateInString(this.mDate)
    }
  };
  BookRent.init({
    BookId: DataTypes.INTEGER,
    MemberId: DataTypes.INTEGER,
    bDate: DataTypes.DATE,
    mDate: DataTypes.DATE,
    rDate: DataTypes.DATE
  }, {
    hooks: {
      beforeCreate: (instance) => {
        instance.bDate = new Date()
        instance.mDate = addDays(new Date(), 3)
        instance.createAt = new Date()
        instance.updatedAt = new Date()
      }
    },
    sequelize,
    modelName: 'BookRent',
  });
  return BookRent;
};
'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Publisher extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Publisher.init({
    name: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          msg: "Publisher name can't be empty!"
        }
      }
    },
    rating: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Publisher',
  });
  return Publisher;
};
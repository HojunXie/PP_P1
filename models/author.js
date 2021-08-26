'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Author extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Author.belongsToMany(models.Book, { through: models.AuthorBook })
    }
  };
  Author.init({
    name: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          msg: "Publisher name can't be empty!"
        }
      }
    },
    gender: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          msg: "Publisher name can't be empty!"
        }
      }
    },
    age: {
      type: DataTypes.INTEGER,
      validate: {
        notEmpty: {
          msg: "Age can't be empty"
        },
        min: {
          args: 3,
          msg: "Age is invalid!"
        },
        max: {
          args: 150,
          msg: "Age is invalid!"
        }
      }
    } 
  }, {
    sequelize,
    modelName: 'Author',
  });
  return Author;
};
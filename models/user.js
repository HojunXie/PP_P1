'use strict';
const {encryptPass} = require('../helpers/bcrypt')
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.belongsToMany(models.Book, { through: models.BookRent })
    }
  };
  User.init({
    name:{
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          msg: "Name can't be empty!"
        }
      }
    },
    email:{
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          msg: "Email Can't be empty!"
        },
        isEmail: {
          msg: "Email is invalid!"
        }
      }
    },
    gender:{
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          msg: "Gender can't be empty!"
        }
      }
    },
    age:{
      type: DataTypes.INTEGER,
      validate: {
        notEmpty: {
          msg: "Age can't be empty!"
        },
        min: {
          args: 10,
          msg: "You have to be older than 10 to register an account!"
        },
        max: {
          args: 100,
          msg: "You're too old!"
        }
      }
    },
    tel:{
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          msg: "Phone Number can't be empty!"
        },
        min: {
          args: 8,
          msg: "Phone number is invalid!"
        },
        max: {
          args: 15,
          msg: "Phone number is invalid!"
        }
      }
    },
    password:{
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          msg: "Password can't be empty!"
        },
        min: {
          args: 8,
          msg: "Password minimum 8 characters!"
        }
      }
    },
    role: DataTypes.STRING
  }, {
    hooks: {
      beforeCreate: (instance) => {
        instance.password = encryptPass(password)
      }
    },
    sequelize,
    modelName: 'User',
  });
  return User;
};
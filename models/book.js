'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Book extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Book.belongsTo(models.Publisher, { foreignKey: "PubId" })
      Book.belongsTo(models.Author, { foreignKey: "AuthId" })
      Book.belongsToMany(models.User, { through: models.BookRent, foreignKey: "BookId" })
    }
    static decreaseBook(id) {
      Book.decrement({stock: 1}, {where: {id: id}})
    }
  };
  Book.init({
    judul: DataTypes.STRING,
    tahun_terbit: DataTypes.INTEGER,
    cover: DataTypes.STRING,
    stock: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Book',
  });
  return Book;
};
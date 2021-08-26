const { Author, Publisher, User } = require('../models')

class Controller {
  static homePage (req, res) {
    res.send("home")
  }
  static showAuthor (req, res) {
    Author.findAll()
      .then(data => res.render('author', { data }))
      .catch(err => console.log(err))
  }
  static showPublisher (req, res) {
    Publisher.findAll()
      .then(data => res.render('publisher', { data }))
      .catch(err => console.log(err))
  }
  static showUser (req, res) {
    User.findAll()
      .then(data => res.render('user', { data }))
      .catch(err => console.log(err))
  }
  static loginPage (req, res) {
    res.render('login')
  }
  static registerPage (req, res) {
    res.render('register')
  }
}

module.exports = Controller
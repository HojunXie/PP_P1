const { Author, Publisher, User } = require('../models')
const { decryptPass } = require('../helpers/bcrypt')

class Controller {
  static homePage (req, res) {
    res.render('homepage')
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
  static login (req, res) {
    let data = {
      email: req.body.email,
      password: req.body.password
    }
    User.findOne({
      where: {
        email: data.email
      }
    })
      .then(data => {
        if (data) {
          if (decryptPass(password, data.password)) {
            req.session.email = data.email
            req.session.isLogin = true
            if (data.role === 'Admin') {
              req.session.isAdmin = true
            }
            res.redirect('/')
          }
        } else {
          res.send(data)
        }
      })
  }
  static registerPage (req, res) {
    res.render('register')
  }
  static register (req, res) {
    let data = {
      email: req.body.email,
      age: req.body.age,
      gender: req.body.gender,
      password: req.body.password,
      tel: req.body.tel,
    }
    if (req.body.key) {
      data.role = "Admin"
    } else {
      data.role = 'Member'
    }
    User.findOne({
      where: {
        email: data.email
      }
    })
    .then(data => {
      if (!data) {
        User.create(data)
          .then(() => res.redirect('/login'))
          .catch(err => res.send(err))
      } else {
        res.send('email sudah terdaftar')
      }
    })
    .catch(err => console.log(err))
  }
  static bookDetail (req, res) {
      const id = req.params.id
      Book.findByPk(id)
        .then(data => {
            res.render('bookDetail', { book: data })
        })
        .catch(err => res.send(err))
  }
  static listPeminjaman (req, res) {
      res.render('peminjaman')
  }
  static listBook (req, res) {
      Book.findAll()
          .then(data => {
              res.render('books', { books: data })
          })
          .catch(err => res.send(err))
  }
  static showAddBooksForm (req, res) {

  }
}

module.exports = Controller
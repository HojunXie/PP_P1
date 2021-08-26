const { Author, Publisher, User, Book } = require('../models')
const { decryptPass } = require('../helpers/bcrypt')

class Controller {
  static homePage (req, res) {
    res.render('homepage')
  }
  static showAuthor (req, res) {
    Author.findAll({
      include: Book
    })
      .then(data => {res.render('author', { data })})
      .catch(err => console.log(err))
  }
  static getAddAuthor (req, res) {
    res.render('addAuthor')
  }
  static postAddAuthor (req, res) {
    let data = {
      name: req.body.name,
      gender: req.body.gender,
      age: req.body.age
    }
    Author.create(data)
      .then(() => res.redirect('/authors'))
      .catch(err => res.send(err))
  }
  static deleteAuthor (req, res) {
    Author.destroy({
      where: {
        id: req.params.id
      }
    })
    .then(() => res.redirect('/authors'))
    .catch(err => console.log(err))
  }
  static showPublisher (req, res) {
    Publisher.findAll({
      include: Book
    })
      .then(data => {res.render('publisher', { data })})
      .catch(err => console.log(err))
  }
  static getAddPublisher (req, res) {
    res.render('addPublisher')
  }
  static postAddPublisher (req, res) {
    let data = {
      name: req.body.name,
      rating: req.body.rating
    }
    Publisher.create(data)
      .then(() => res.redirect('/publishers'))
      .catch(err => res.send(err))
  }
  static deletePublisher (req, res) {
    Publisher.destroy({
      where: {
        id: req.params.id
      }
    })
    .then(() => res.redirect('/publishers'))
    .catch(err => console.log(err))
  }
  static showUser (req, res) {
    User.findAll({
      where: {
        role: 'member'
      }
    })
      .then(data => res.render('user', { data }))
      .catch(err => console.log(err))
  }
  static showAdmin (req, res) {
    User.findAll({
      where: {
        role: 'admin'
      }
    })
      .then(data => res.render('admin', { data }))
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
            if (data.role === 'admin') {
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
    let baru = {
      name: req.body.name,
      email: req.body.email,
      age: req.body.age,
      gender: req.body.gender,
      password: req.body.password,
      tel: req.body.tel
    }
    if (req.body.key === 'qwerty') {
      baru.role = "admin"
    } else {
      baru.role = 'member'
    }
    User.findOne({
      where: {
        email: baru.email
      }
    })
    .then(data => {
      if (!data) {
        User.create(baru)
          .then(() => {
            res.redirect('/login')
          })
          .catch(err => res.send(err))
      } else {
        res.send('email sudah terdaftar')
      }
    })
    .catch(err => console.log(err))
  }
  static kickUser (req, res) {
    User.destroy({
      where: {
        id: req.params.id
      }
    })
    .then(() => res.redirect('/users'))
    .catch(err => res.send(err))
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
    res.render('addBookForm')
  }
  static addBook (req, res) {
    console.log(req.body)
    const { judul, tahun_terbit, cover, stock } = req.body
    Book.create({
            judul, tahun_terbit, cover, stock
        }).then(data => {
            res.redirect('/books')
        }).catch(err => res.send(err))
  }
}

module.exports = Controller
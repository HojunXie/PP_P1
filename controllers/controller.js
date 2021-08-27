const { Author, Publisher, User, Book, BookRent } = require('../models')
const { decryptPass } = require('../helpers/bcrypt')

class Controller {
  static homePage (req, res) {
    res.render('homepage', { isLogin: req.session.isLogin })
  }



  //author related
  static showAuthor (req, res) {
    Author.findAll({
      include: Book
    })
      .then(data => {res.render('author', { data, isLogin: req.session.isLogin })})
      .catch(err => console.log(err))
  }
  static showBookByAuthor (req, res) {
    Book.findAll({
      where: {
        AuthId: req.params.id
      },
      include: [Publisher, Author]
    })
    .then(data => res.render('authorBook', { books: data, isLogin: req.session.isLogin }))
    .catch(err => console.log(err))
  }
  static getAddAuthor (req, res) {
    res.render('addAuthor', { isLogin: req.session.isLogin })
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



  // publisher related
  static showPublisher (req, res) {
    Publisher.findAll({
      include: Book
    })
      .then(data => {res.render('publisher', { data, isLogin: req.session.isLogin })})
      .catch(err => console.log(err))
  }
  static showBookByPublisher (req, res) {
    Book.findAll({
      where: {
        PubId: req.params.id
      },
      include: [Publisher, Author]
    })
    .then(data => res.render('publisherBook', { books: data, isLogin: req.session.isLogin }))
    .catch(err => console.log(err))
  }
  static getAddPublisher (req, res) {
    res.render('addPublisher', { isLogin: req.session.isLogin } )
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



  //user related
  static showUser (req, res) {
    User.findAll({
      where: {
        role: 'member'
      }
    })
      .then(data => res.render('user', { data, isLogin: req.session.isLogin }))
      .catch(err => console.log(err))
  }
  static showAdmin (req, res) {
    User.findAll({
      where: {
        role: 'admin'
      }
    })
      .then(data => res.render('admin', { data, isLogin: req.session.isLogin }))
      .catch(err => console.log(err))
  }
  static getEditProfile (req, res) {
    User.findByPk(req.params.id)
      .then(data => res.render('editProfile', { data, isLogin: req.session.isLogin }))
      .catch(err => console.log(err))
  }
  static editProfile (req, res) {
    let baru = {
      name: req.body.name,
      email: req.body.email,
      age: req.body.age,
      gender: req.body.gender,
      password: req.body.password,
      tel: req.body.tel,
      updatedAt: new Date()
    }
    User.update(baru, {
      where: {
        id: req.params.id
      }
    })
    .then(() => res.redirect('/'))
    .catch(err => res.send(err))
  }
  static loginPage (req, res) {
    res.render('login', { isLogin: false })
  }
  static login (req, res) {
    let baru = {
      email: req.body.email,
      password: req.body.password
    }
    User.findOne({
      where: {
        email: baru.email
      }
    })
      .then(data => {
        if (data) {
          if (decryptPass(baru.password, data.password)) {
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
      .catch(err => console.log(err))
  }
  static registerPage (req, res) {
    res.render('register', { isLogin: false })
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
  static logout (req, res) {
    req.session.destroy()
    res.redirect('/')
  }



  //rent related
  static listPeminjaman (req, res) {
    let rents = []
    User.findAll({ include: Book })
      .then(data => {
          let userWithRents = data.filter(item => item.Books.length > 0)
          userWithRents.forEach(user => {
              user.Books.forEach(book => {
                  console.log(book.BookRent)
                  if (book.BookRent.rDate === null) {
                      rents.push({
                          user_id: user.id,
                          book_id: book.id,
                          name: user.name,
                          book_title: book.judul,
                          start: book.BookRent.bDateInString(),
                          deadline: book.BookRent.mDateInString()
                      })
                  }
              })
          })
          res.render('peminjaman', { rents, isLogin: true })
      })
      .catch(err => {
          console.log(err)
          res.send(err)
      })
  }
  static userRentBook (req, res) {
    const bookId = req.params.id
    const userEmail = "sam.wilson@perpus.id" // Masih hard code. Nanti ganti pakai data req.session
    let user
    User.findOne({ where: { email: userEmail }})
      .then(data => {
          user = data
          return BookRent.create({
              BookId: bookId,
              MemberId: user.id
          })
      })
      .then(data => {
          res.redirect('/my-rents')
      })
      .catch(err => {
          console.log(err)
          res.send(err)
      })
  }
  static showMyRents (req, res) {
    const userEmail = "sam.wilson@perpus.id" // Masih hard code. Nanti ganti pakai data req.session
    User.findOne({ where: { email: userEmail }, include: Book})
      .then(data => {
          let books = data.Books.filter(book => {
              return book.BookRent.rDate === null
          })
          res.render('myRents', { user: data, books, isLogin: true })
      })
      .catch(err => {
          console.log(err)
          res.send(err)
      })
    }
    static finishRent (req, res) {
      const { userId, bookId } = req.params
      BookRent.update(
          { rDate: new Date() },
          { where: { BookId: bookId, MemberId: userId }})
        .then(data => {
            res.redirect('/peminjaman')
        })
        .catch(err => {
            res.send(err)
        })
    }



  //book related
  static listBook (req, res) {
    Book.findAll({ include: [Publisher, Author]})
          .then(data => {
              res.render('books', { books: data, isLogin: true })
          })
          .catch(err => res.send(err))
  }
  static showAddBooksForm (req, res) {
    let publishers
    Publisher.findAll()
        .then(data => {
            publishers = data
            return Author.findAll()
        })
        .then(data => {
            res.render('addBookForm', { isLogin: true, publishers, authors: data })
        })
  }
  static addBook (req, res) {
    const { judul, tahun_terbit, cover, stock, publisher_id, author_id } = req.body
      Book.create({
            judul, tahun_terbit, cover, stock,
            PubId: publisher_id,
            AuthId: author_id
        }).then(data => {
            res.redirect('/books')
        }).catch(err => res.send(err))
  }
  static editBookForm (req, res) {
    let publishers
    let authors
    Publisher.findAll()
        .then(data => {
            publishers = data
            return Author.findAll()
        })
        .then(data => {
            authors = data
            return Book.findByPk(req.params.id, { include: [Publisher, Author]})
        })
        .then(data => {
            console.log(data)
            res.render('editBookForm', { isLogin: true, book: data, publishers, authors })
        })
  }
  static postEditBook (req, res) {
      const { judul, tahun_terbit, stock, cover, publisher_id, author_id } = req.body
      Book.update({
          judul,
          tahun_terbit,
          cover,
          stock,
          PubId: publisher_id,
          AuthId: author_id,
          updatedAt: new Date()
      }, {
          where: {
              id: req.params.id
          }
      }).then(data => {
          res.redirect('/books')
      }).catch(err => res.send(err))
  }
}

module.exports = Controller
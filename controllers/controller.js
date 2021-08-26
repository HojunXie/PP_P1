const { Book } = require('../models')

class Controller {
    static home (req, res) {
        res.render('homepage')
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
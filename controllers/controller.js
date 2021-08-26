const { Book } = require('../models')

class Controller {
    static home (req, res) {
        res.render('homepage')
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
class Controller {
    static home (req, res) {
        res.render('homepage')
    }

    static bookDetail (req, res) {
        const id = req.params.id
        res.render('bookDetail')
    }

    static listPeminjaman (req, res) {
        res.render('peminjaman')
    }

    static listBook (req, res) {

    }

    static showAddBooksForm (req, res) {
        
    }
}

module.exports = Controller
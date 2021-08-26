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
}

module.exports = Controller
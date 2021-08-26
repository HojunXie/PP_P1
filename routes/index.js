const express = require('express')
const router = express.Router()
const Controller = require('../controllers/controller')

router.get('/', Controller.home)
router.get('/books', Controller.listBook)
router.get('/books/add', Controller.showAddBooksForm)
router.post('/books/add', Controller.addBook)
router.get('/peminjaman', Controller.listPeminjaman)

module.exports = router

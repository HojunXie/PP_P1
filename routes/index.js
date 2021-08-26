const express = require('express')
const router = express.Router()
const Controller = require('../controllers/controller')

router.get('/', Controller.home)
router.get('/book/:id', Controller.bookDetail)
router.get('/peminjaman', Controller.listPeminjaman)

module.exports = router

const express = require('express')
const router = express.Router()
const Controller = require('../controllers/controller')
const authorRouter = require('./author')
const bookRouter = require('./books')
const loginRouter = require('./login')
const publisherRouter = require('./publisher')
const userRouter = require('./user')
const checkIfLogin = require('../middlewares/checkLogin')

router.get('/', Controller.homePage)
router.get('/peminjaman', Controller.listPeminjaman) // utk admin melihat list buku yg sedang dipinjam
router.get('/my-rents', Controller.showMyRents) // untuk user melihat list buku yg sedang dia pinjam

router.use('/', loginRouter)
router.use('/books', bookRouter)
router.use('/users', userRouter)
router.use('/authors', authorRouter)
router.use('/publishers', publisherRouter)

module.exports = router
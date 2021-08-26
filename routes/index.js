const express = require('express')
const router = express.Router()
const Controller = require('../controllers/controller')
const authorRouter = require('./author')
const bookRouter = require('./books')
const loginRouter = require('./login')
const publisherRouter = require('./publisher')
const userRouter = require('./user')

router.get('/', Controller.homePage)
Router.get('/peminjaman', Controller.listPeminjaman)

router.use('/', loginRouter)
router.use('/books', bookRouter)
router.use('/users', userRouter)
router.use('/authors', authorRouter)
router.use('/publishers', publisherRouter)

module.exports = router
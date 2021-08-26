const express = require('express')
const bookRouter = express.Router()
const Controller = require('../controllers/controller')

bookRouter.get('/books', Controller.listBook)
bookRouter.get('/books/add', Controller.showAddBooksForm)
bookRouter.get('/books/:id', Controller.bookDetail)

module.exports = bookRouter

const express = require('express')
const bookRouter = express.Router()
const Controller = require('../controllers/controller')

bookRouter.get('/', Controller.listBook)
bookRouter.get('/add', Controller.showAddBooksForm)
bookRouter.get('/:id', Controller.bookDetail)

module.exports = bookRouter

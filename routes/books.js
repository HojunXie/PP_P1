const express = require('express')
const bookRouter = express.Router()
const Controller = require('../controllers/controller')

bookRouter.get('/', Controller.listBook)
bookRouter.get('/add', Controller.showAddBooksForm)
bookRouter.post('/add', Controller.addBook)
bookRouter.get('/:id/edit', Controller.editBookForm)
bookRouter.post('/:id/edit', Controller.postEditBook)

module.exports = bookRouter

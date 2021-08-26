const express = require('express')
const authorRouter = express.Router()
const Controller = require('../controllers/controller')

authorRouter.get('/', Controller.showAuthor)
authorRouter.get('/books/:id', Controller.showBookByAuthor)
authorRouter.get('/add', Controller.getAddAuthor)
authorRouter.post('/add', Controller.postAddAuthor)
authorRouter.get('/delete/:id', Controller.deleteAuthor)


module.exports = authorRouter

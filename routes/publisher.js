const express = require('express')
const publisherRouter = express.Router()
const Controller = require('../controllers/controller')

publisherRouter.get('/', Controller.showPublisher)
publisherRouter.get('/books/:id', Controller.showBookByPublisher)
publisherRouter.get('/add', Controller.getAddPublisher)
publisherRouter.post('/add', Controller.postAddPublisher)
publisherRouter.get('/delete/:id', Controller.deletePublisher)


module.exports = publisherRouter

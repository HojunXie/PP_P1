const express = require('express')
const publisherRouter = express.Router()
const Controller = require('../controllers/controller')

publisherRouter.get('/publishers', Controller.showPublisher)

module.exports = publisherRouter

const express = require('express')
const authorRouter = express.Router()
const Controller = require('../controllers/controller')

authorRouter.get('/authors', Controller.showAuthor)

module.exports = authorRouter

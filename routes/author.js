const express = require('express')
const authorRouter = express.Router()
const Controller = require('../controllers/controller')

authorRouter.get('/', Controller.showAuthor)

module.exports = authorRouter

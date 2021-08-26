const express = require('express')
const userRouter = express.Router()
const Controller = require('../controllers/controller')

userRouter.get('/users', Controller.showUser)

module.exports = userRouter

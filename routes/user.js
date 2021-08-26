const express = require('express')
const userRouter = express.Router()
const Controller = require('../controllers/controller')

userRouter.get('/', Controller.showUser)

module.exports = userRouter

const express = require('express')
const userRouter = express.Router()
const Controller = require('../controllers/controller')
const checkIfAdmin = require('../middlewares/checkLogin')

userRouter.get('/', checkIfAdmin, Controller.showUser)

module.exports = userRouter

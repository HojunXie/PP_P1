const express = require('express')
const userRouter = express.Router()
const Controller = require('../controllers/controller')

userRouter.get('/', Controller.showUser)
userRouter.get('/admins', Controller.showAdmin)
userRouter.get('/delete/:id', Controller.kickUser)

module.exports = userRouter

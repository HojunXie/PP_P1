const express = require('express')
const loginRouter = express.Router()
const Controller = require('../controllers/controller')

loginRouter.get('/login', Controller.loginPage)
loginRouter.post('/login', Controller.login)
loginRouter.get('/register', Controller.registerPage)
loginRouter.post('/register', Controller.register)

module.exports = loginRouter
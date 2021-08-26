const express = require('express')
const loginRouter = express.Router()
const Controller = require('../controllers/controller')
const checkLogin = require('../middlewares/checkLogin')

loginRouter.get('/login', Controller.loginPage)
loginRouter.post('/login', Controller.login)
loginRouter.get('/register', Controller.registerPage)
loginRouter.post('/register', Controller.register)
loginRouter.get('/logout', checkLogin, Controller.logout)

module.exports = loginRouter
const express = require("express")
const Controller = require("./controllers/controller")
const app = express()
const port = 3000
var session = require('express-session')

app.set('view engine', 'ejs')
app.use('/', express.urlencoded({extended:true}))
app.use('/public', express.static('public'));

app.get('/', Controller.homePage)
app.get('/authors', Controller.showAuthor)
app.get('/publishers', Controller.showPublisher)
app.get('/users', Controller.showUser)
app.get('/login', Controller.loginPage)
app.get('/register', Controller.registerPage)

app.listen(port, () => {
  console.log('app is listening to', port)
})

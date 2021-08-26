const express = require("express")
const app = express()
const router = require('./routes/index')
const port = 3000
var session = require('express-session')

app.set('view engine', 'ejs')
app.use('/', express.urlencoded({extended:true}))
app.use('/public', express.static('public'));
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: true }
}))
app.use('/', router)

app.listen(port, () => {
  console.log('app is listening to', port)
})

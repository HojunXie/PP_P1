function checkIfAdmin (req, res, next) {
  console.log(req.session)
  if (req.session.isLogin && req.session.isAdmin) {
      next()
  } else {
      res.redirect('/login')
  }
}

module.exports = checkIfAdmin
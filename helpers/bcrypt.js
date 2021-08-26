const bcrypt  = require('bcrypt')

const encryptPass = (plainText) => {
  return bcrypt.hashSync(plainText, 10)
}

const decryptPass = (plainText, hash) => {
  return bcrypt.compareSync(plainText, hash)
}

module.exports = {encryptPass, decryptPass}
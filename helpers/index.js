function upperCaseFirstLetter (string) {
  let words = string.split(' ')
  let transformed = words.map(item => item[0].toUpperCase() + item.slice(1))
  return transformed.join(' ')
}

function dateInString (date) {
  let d = date.getDate()
  if (d < 10) {
      d = '0' + d
  }
  let m = date.getMonth() + 1 // because getMonth returns 0-11
  if (m < 10) {
      m = '0' + m
  }
  let y = date.getFullYear()
  return `${d}/${m}/${y}`
}

function addDays (date, numOfDays) {
    date.setDate(date.getDate() + numOfDays)
    return date
}

module.exports = { upperCaseFirstLetter, dateInString, addDays }
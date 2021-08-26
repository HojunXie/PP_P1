function upperCaseFirstLetter (string) {
    let words = string.split(' ')
    let transformed = words.map(item => item[0].toUpperCase() + item.slice(1))
    return transformed.join(' ')
}

module.exports = { upperCaseFirstLetter }
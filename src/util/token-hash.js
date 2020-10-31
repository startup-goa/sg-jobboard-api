const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

const JWT_SECRET = "1234567890nfrij"

const generateAuthToken = async (_id) => {
    const token = jwt.sign({ _id }, JWT_SECRET, { expiresIn: '7days' })

    //save jwt in comapny schema

    return token
}

const hashPassword = async (password) => {
    var hash = await bcrypt.hash(password, 8)
    return hash
}

const verifyPassword = async (passwordCheck, passwordOriginal) => {
    const isMatch = await bcrypt.compare(passwordCheck, passwordOriginal)

    return isMatch
}

module.exports = {
    generateAuthToken,
    hashPassword,
    verifyPassword
}
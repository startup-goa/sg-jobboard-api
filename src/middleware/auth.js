const jwt = require('jsonwebtoken')

const JWT_SECRET = "1234567890nfrij"

const auth = async (req, res, next) => {
    try {
        const token = req.cookies['auth_token']
        const decoded = jwt.verify(token, JWT_SECRET)

        var _id = decoded._id
        // Search for user using _id from DB
        
        if (!user) {
            throw new Error()
        }
        req.token = token
        // return user data and save in req.user
        //req.user = user
        next()

    } catch (e) {
        res.status(401).send("Not Auth")
    }
}


module.exports = auth

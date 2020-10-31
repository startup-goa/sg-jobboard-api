const {generateAuthToken, hashPassword, verifyPassword} = require('../util/token-hash')
const bcrypt = require('bcrypt')

const signup = async (data)=>{
    var companyName= data.companyName,
    var email= data.email,
    var password= hashPassword(data.password)
    var verified = false

    //query and get ID of company
    var _id = "testID123"
    const token = await generateAuthToken(_id)

    //Save details and token to DB
    return token
}

const login = async (email, password)=>{
    // find user by email and password from DB, get password from DB
    var passwordFromDB = "test123"
    
    if(!verifyPassword(password, passwordFromDB)){
        throw new Error('Unable to login')
    }

    const token = await generateAuthToken(_id)
    return token
}

const logout = async (user, userToken) => {
    user.tokens = user.tokens.filter((token) => {
        return token.token !== userToken
    })
    
    //save the changes to user
}

const logoutAll = async (user) => {
    user.tokens = []
    //save the changes to user
}

const companyDetail = async () => {
    //query company details and return value
}

const postJob = async (body) => {
    //query company details and return value
    //FK_CMP_ID
    var jobTitle = body.jobTitle
    var location = (!!body.location ? body.location: null)
    var jobRegion = body.jobRegion
    var jobType = body.jobType
    var jobCatgory = body.jobCatgory
    var description = body.description
    var application = body.application
    var salaryRange = (!!body.salaryRange ? body.salaryRange: null )
    var verified = false
    var active = true
    
    //Save data to DB

}

const getJob = async (_id) => {
    //query job details using _id and return value
}


module.exports = {
    signup,
    login,
    logout,
    logoutAll,
    companyDetail,
    postJob,
    getJob
}
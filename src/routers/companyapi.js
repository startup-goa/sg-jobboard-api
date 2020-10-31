const express = require('express')
const { signup, login, logout, logoutAll, companyDetail, postJob, getJob } = require('../dbLayer/companydb')
const auth = require('../middleware/auth')
const router = new express.Router()

router.put('/signup', async (req, res) => {
    try {
        const token = signup(req.body)
        res.cookie('auth_token', token)
        res.redirect('/')
    } catch (e) {
        res.status(400).send(e)
    }
})

router.post('/login', async (req, res) => {
    try {
        const token = login(req.body.email, req.body.password)
        res.cookie('auth_token', token)
        //res.redirect('/')
    } catch (e) {
        res.status(400).send()
    }
})

router.post('/logout', auth, async (req, res) => {
    try {
        logout(req.user, req.token)
        res.redirect('/')
    } catch (e) {
        res.status(500).send()
    }
})

router.post('/logoutall', auth, async (req, res) => {
    try {
        logoutAll(req.user)
        res.redirect('/')

    } catch (e) {
        res.status(500).send()
    }
})

router.post('/company/details', auth, async (req, res) => {
    try {
        const data = companyDetail()
        if (!!data) {
            return res.status(200).send(data)
        }
        throw new Error()
    } catch (e) {
        res.status(500).send()
    }
})

router.get('/company/details', auth, async (req, res) => {
    try {
        const data = companyDetail()
        if (!!data) {
            return res.status(200).send(data)
        }
        throw new Error()
    } catch (e) {
        res.status(500).send()
    }
})

router.post('/postjob', auth, async (req, res) => {
    try {
        await postJob(req.body)
        res.status(200)
    } catch (e) {
        res.status(500).send()

    }
})

router.post('/getapplication', auth, async (req, res) => {
    try {
        //Get _id after authentication
        //const _id = req.user._id
        const jobs = await getJob(_id)
        res.status(200).send(jobs)
    } catch (e) {
        res.status(500).send()
    }
})


module.exports = router
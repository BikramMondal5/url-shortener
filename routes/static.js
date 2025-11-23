const express = require('express')
const {uiRenderFunction } = require('../controllers/url')

const uiRouter = express.Router()

uiRouter.get('/', uiRenderFunction)

uiRouter.get('/signup', (req,res) => {
    return res.render("signup")
})

uiRouter.get('/login', (req,res) => {
    return res.render("login")
})

module.exports = {
    uiRouter
}
const express = require('express')
const { generateNewShortURL, redirectURL } = require('../controllers/url')

const urlRouter = express.Router()
const redirectURLRouter = express.Router()

urlRouter.post('/', generateNewShortURL)

redirectURLRouter.get('/:id', redirectURL)

module.exports = {
    urlRouter,
    redirectURLRouter
}
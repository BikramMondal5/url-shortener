const express = require('express')
const { generateNewShortURL, redirectURL, uiRenderFunction } = require('../controllers/url')

const urlRouter = express.Router()
const redirectURLRouter = express.Router()
const uiRouter = express.Router()

urlRouter.post('/', generateNewShortURL)

redirectURLRouter.get('/:id', redirectURL)

uiRouter.get('/', uiRenderFunction)

module.exports = {
    urlRouter,
    redirectURLRouter,
    uiRouter
}
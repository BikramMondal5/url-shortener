const { nanoid } = require("nanoid")
const URL = require('../models/url')

async function generateNewShortURL(req, res) {
    const body = req.body
    if (!body.originalUrl) return res.status(400).json({ error: "URL is required" })

    const shortId = nanoid(7)
    try {
        await URL.create({
            shortId: shortId,
            redirectURL: body.originalUrl,
            visitHistory: [],
        })

        return res.render('home', { id: shortId })
    } catch (error) {
        console.error('Error creating short URL:', error)
        return res.status(500).json({ error: "Internal server error" })
    }
}

async function redirectURL(req, res) {
    const shortId = req.params.id
    try {
        const urlEntry = await URL.findOneAndUpdate(
            { shortId: shortId },
            { $push: { visitHistory: { timestamp: Date.now() } } },
        )
        if (!urlEntry) {
            return res.status(404).json({ error: "URL not found" })
        }

        res.redirect(urlEntry.redirectURL)
    } catch (error) {
        console.error('Error redirecting URL:', error)
        return res.status(500).json({ error: "Internal server error" })
    }
}

async function uiRenderFunction(req, res) {
    res.render('home')
}

module.exports = {
    generateNewShortURL,
    redirectURL,
    uiRenderFunction
}

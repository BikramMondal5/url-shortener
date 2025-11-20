const express = require('express')
const mongoose = require('mongoose')
const connectToMongoDB = require('./connect')
const {urlRouter, redirectURLRouter} = require('./routes/url')
const app = express()
const port = 8000

// Middleware to parse JSON bodies
app.use(express.json())

// MongoDB Connection
connectToMongoDB("mongodb://127.0.0.1:27017/urlShortener")
.then(() => console.log('MongoDB connected'))
.catch(err => console.error('MongoDB connection error:', err))

// Routes 
app.use('/url', urlRouter)

app.use('/', redirectURLRouter)


app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`)
})
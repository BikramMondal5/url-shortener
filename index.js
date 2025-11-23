const express = require('express')
const mongoose = require('mongoose')
const connectToMongoDB = require('./connect')
const path = require('path')
const {urlRouter, redirectURLRouter} = require('./routes/url')
const {restrictToAuthenticatedUsers} = require('./middlewares/auth')
const userRoute = require('./routes/users')
const {uiRouter} = require('./routes/static')
const cookieParser = require('cookie-parser')

const app = express()
const port = 8000

// Middleware to parse JSON bodies
app.use(express.json())
// Middleware to parse URL-encoded form data
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())

// MongoDB Connection
connectToMongoDB("mongodb://127.0.0.1:27017/urlShortener")
.then(() => console.log('MongoDB connected'))
.catch(err => console.error('MongoDB connection error:', err))

app.set('view engine', 'ejs')
app.set('views', path.resolve("./views"))

// Routes 
app.use('/url',restrictToAuthenticatedUsers,urlRouter)
app.use('/user', userRoute)
app.use('/', uiRouter)

app.use('/', redirectURLRouter)

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`)
})
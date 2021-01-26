const cors = require('cors')
const helmet = require('helmet')
const express = require('express')
const bodyParser = require('body-parser')
const rateLimit = require('express-rate-limit')

const routes = require('./routes')

const app = express()
const PORT = process.env.PORT || 5000

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
})

// Parse incoming request bodies
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

// Enable CORS with various options
app.use(cors())

// Set security headers
app.use(helmet())

// Limit repeated requests
app.use(limiter)

// API routes
app.use('/api', routes)

app.listen(PORT, () => {
  console.log(`API-Gateway is running on port ${PORT}`)
})

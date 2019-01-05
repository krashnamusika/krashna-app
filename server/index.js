import express from 'express'
import cors from 'cors'
import bodyParser from 'body-parser'
import logger from 'morgan'
import passport from 'passport'
import configureRoutes from './routes'

require('dotenv').config()

const SERVER_PORT = process.env.SERVER_PORT || 3333

const app = express()

require('./config/mongodb')
require('./config/passport')

app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(logger('dev'))
app.use(passport.initialize())

// API routes
configureRoutes(app)

// Frontend routes
if (process.env.NODE_ENV === 'production') {
    app.use(express.static('../frontend/build'))
}

app.listen(SERVER_PORT, () => console.log(`Listening on port ${SERVER_PORT}`))

export default app

import mongoose from 'mongoose'
import express from 'express'
import bodyParser from 'body-parser'
import { router } from './routes'

// 1.
const connectionString = 'mongodb://localhost:27017/library'

// 2.
const app = express()

// 3.
app.use(bodyParser.json())

// 4.
app.use(router)

// 5.
mongoose.connect(connectionString)

// 6.
app.listen(4000, () => console.info('Express server is running on port 4000'))
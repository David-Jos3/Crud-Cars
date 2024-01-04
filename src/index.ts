import express from 'express'
import 'dotenv/config'
import router from './routes/routes'

const app = express()

app.use(express.json(), router)

app.listen({ port: process.env.PORT || 3200 })

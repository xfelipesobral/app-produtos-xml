import express from 'express'
import { config as dotenvConfig } from 'dotenv'

import routes from './src/routes'
import middlewareError from './src/middlewares/error'

import { cronNewNFeEmails } from './src/utils/crons'

dotenvConfig()

const appPort = process.env.SERVER_PORT || 3300

const app = express()

app.use(express.json())

app.use(routes)

app.use(middlewareError)

app.listen(appPort, () => console.log(`Server is running on port ${appPort}!`))

cronNewNFeEmails()
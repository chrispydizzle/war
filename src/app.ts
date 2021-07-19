/* eslint-disable import/first */
import dotenv from 'dotenv'
dotenv.config()
import { NODE_ENV } from './config'
if (NODE_ENV === 'PRODUCTION') require('newrelic')
import Express from 'express'
import httpLogger from 'morgan'
import compression from 'compression'
import { json as jsonParser } from 'body-parser'
import createPostgresConnection from './database/postgres_connect'
import { game } from './routing/game'
import { reporting } from './routing/reporting'

const start = async () => {
  const app = Express()

  app.enable('trust proxy')

  app.use(compression({ level: 1 }))
  app.use(httpLogger('dev'))
  app.use(jsonParser())

  const postgresConnection = await createPostgresConnection({ ssl: { rejectUnauthorized: false } })

  const router = Express.Router()
  router.use('/war', game(router, postgresConnection))
  router.use('/', reporting(router, postgresConnection))
  process.on('unhandledRejection', (error: { stack: any }) => {
    console.error(error)
  })

  app.use(router)
  return app
}
export default start

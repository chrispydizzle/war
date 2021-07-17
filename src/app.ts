/* eslint-disable import/first */
import dotenv from 'dotenv'
dotenv.config()
import Express, { NextFunction, Request, Response, Router } from 'express'
import httpLogger from 'morgan'
import compression from 'compression'
import { json as jsonParser } from 'body-parser'
import createPostgresConnection from './database/postgres_connect'
import { Connection } from 'typeorm'

const start = async () => {
  const app = Express()

  app.enable('trust proxy')

  app.use(compression({ level: 1 }))
  app.use(httpLogger('dev'))
  app.use(jsonParser())

  const postgresConnection = await createPostgresConnection()

  const router = Express.Router()
  router.use('/game', GameRouter(router, postgresConnection))

  process.on('unhandledRejection', (error: { stack: any }) => {
    console.error(error)
  })

  return app
}

export default start

export const GameRouter = (router: Router, connection: Connection) => {
  const doCreateGame = (req: Request, res: Response, next: NextFunction) => {
    // TODO: Create Game Logic
    next()
  }

  const doGetPlayerStatus = (req: Request, res: Response, next: NextFunction) => {
    // TODO: Get player status
    next()
  }

  router.post('/create', doCreateGame)
  router.get('/stats/:playerId', doGetPlayerStatus)
  return router
}

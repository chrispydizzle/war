/* eslint-disable import/first */
import dotenv from 'dotenv'
dotenv.config()
import { NODE_ENV } from './config'
if (NODE_ENV === 'PRODUCTION') require('newrelic')
import Express, { NextFunction, Request, Response, Router } from 'express'
import httpLogger from 'morgan'
import compression from 'compression'
import { json as jsonParser } from 'body-parser'
import createPostgresConnection from './database/postgres_connect'
import { Connection } from 'typeorm'
import { battle } from './warzone/battle'

const start = async () => {
  const app = Express()

  app.enable('trust proxy')

  app.use(compression({ level: 1 }))
  app.use(httpLogger('dev'))
  app.use(jsonParser())

  const postgresConnection = await createPostgresConnection()

  const router = Express.Router()
  router.use('/war', GameRouter(router, postgresConnection))

  process.on('unhandledRejection', (error: { stack: any }) => {
    console.error(error)
  })

  app.use(router)
  return app
}
export default start

export const GameRouter = (router: Router, connection: Connection) => {
  const doCreateGame = async (req: Request<number[]>, res: Response, next: NextFunction) => {
    if (req.params && req.params.length !== 2) {
      next()
    }
    const newGame = new battle(req.params)
    newGame.begin()
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

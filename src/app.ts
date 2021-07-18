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
import Player from './database/entities/Player'
import Game from './database/entities/Game'

const start = async () => {
  const app = Express()

  app.enable('trust proxy')

  app.use(compression({ level: 1 }))
  app.use(httpLogger('dev'))
  app.use(jsonParser())

  const postgresConnection = await createPostgresConnection({ ssl: { rejectUnauthorized: false } })

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
    if (req.params.length > 0 && req.params.length !== 2) {
      next('Wrong number of params')
    }
    const newGame = new battle(req.params)
    const result = await newGame.run()

    res.json(result)
  }

  const doGetPlayerStatus = async (req: Request<number>, res: Response, next: NextFunction) => {
    if (!connection.isConnected) {
      return next('Error connecting to the database.')
    }

    const playerRepo = connection.manager.getRepository(Player)
    const existingPlayer = await playerRepo.findByIds([req.params])
    let winCount = 0
    if (existingPlayer.length === 0) {
      return next('Could not identify that player.')
    }

    const gameRepo = connection.manager.getRepository(Game)
    winCount = await gameRepo.count({ where: { winnerId: existingPlayer[0].id } })

    res.json({ id: existingPlayer[0].id, winCount })
  }

  router.post('/create', doCreateGame)
  router.get('/stats/:playerId', doGetPlayerStatus)
  return router
}

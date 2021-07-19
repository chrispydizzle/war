import { NextFunction, Request, Response, Router } from 'express'
import { Connection } from 'typeorm'
import Player from '../database/entities/Player'
import Game from '../database/entities/Game'

export const reporting = (router: Router, connection: Connection) => {
  // @ts-ignore
  const playerRepo = connection.manager.getRepository(Player)
  // @ts-ignore
  const gameRepo = connection.manager.getRepository(Game)

  const getUI = async (req: Request<{playerIds: number[]}>, res: Response, next: NextFunction) => {
    res.send('Hai')
    next()
  }

  router.get('/', getUI)
  return router
}

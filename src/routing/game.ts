import { NextFunction, Request, Response, Router } from 'express'
import { Connection } from 'typeorm'
import { battle } from '../warzone/battle'
import Player from '../database/entities/Player'
import Game from '../database/entities/Game'

export const game = (router: Router, connection: Connection) => {
  const playerRepo = connection.manager.getRepository(Player)
  const gameRepo = connection.manager.getRepository(Game)

  const doCreateGame = async (req: Request<{playerIds: number[]}>, res: Response, next: NextFunction) => {
    if (req.body.playerIds.length > 0 && req.body.playerIds.length !== 2) {
      next('Wrong number of params')
    }

    const dbGame = new Game()
    dbGame.status = 'Start'
    await gameRepo.save(dbGame)

    const dbPlayers: Player[] = await playerRepo.findByIds(req.body.playerIds)
    for (const playerId of req.body.playerIds) {
      if (!dbPlayers.map(p => p.id).includes(playerId)) {
        const newPlayer = new Player()
        newPlayer.id = playerId
        await playerRepo.save(newPlayer)
        dbPlayers.push(newPlayer)
      }
    }

    const newGame = new battle(dbPlayers.map(p => p.id))
    const result = await newGame.run()

    dbGame.winner = dbPlayers.filter(p => p.id === result.winner?.id)[0]
    dbGame.loser = dbPlayers.filter(p => p.id === result.loser?.id)[0]
    dbGame.status = 'End'
    await gameRepo.save(dbGame)
    await res.json(result)
    next()
  }

  const doGetPlayerStatus = async (req: Request, res: Response, next: NextFunction) => {
    if (!connection.isConnected) {
      return next('Error connecting to the database.')
    }

    const existingPlayer = await playerRepo.findOne(req.params.playerId, { relations: ['won_games', 'lost_games'] })
    if (!existingPlayer) {
      res.status(404).send('Could not identify that player')
      next()
    }

    const winCount = existingPlayer?.won_games.length
    const lostCount = existingPlayer?.lost_games.length

    res.json({ id: existingPlayer?.id, winCount, lostCount })
    next()
  }

  router.post('/create', doCreateGame)
  router.get('/stats/:playerId', doGetPlayerStatus)
  return router
}

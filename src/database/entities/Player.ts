/* eslint-disable camelcase */
import { Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm'
import Game from './Game'

@Entity('player')
export default class Player {
  @PrimaryGeneratedColumn('increment')
  id!: number

  @ManyToMany(type => Game, g => g.winner)
  won_games!: Game[]

  @ManyToMany(type => Game, g => g.loser)
  lost_games!: Game[]
}

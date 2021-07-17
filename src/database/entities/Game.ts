import { Column, Entity, JoinTable, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'
import Player from './Player'

@Entity('game')
export default class Game {
  @PrimaryGeneratedColumn('increment')
  id!: number

  @Column()
  status!: string

  @ManyToOne(type => Player, player => player.won_games)
  @JoinTable()
  winner?: Player

  @ManyToMany(type => Player, player => player.lost_games)
  @JoinTable()
  loser?: Player
}

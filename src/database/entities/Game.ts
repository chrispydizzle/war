import { Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from 'typeorm'
import Player from './Player'

@Entity('game')
export default class Game {
  @PrimaryGeneratedColumn('increment')
  id!: number

  @Column()
  status!: string

  @Column()
  rounds!: number

  @Column()
  wars!: number

  @ManyToMany(type => Player, player => player.won_games, { cascade: true })
  @JoinTable()
  winner!: Player

  @ManyToMany(type => Player, player => player.lost_games, { cascade: true })
  @JoinTable()
  loser!: Player
}

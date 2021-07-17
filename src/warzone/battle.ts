import { deck } from './deck'
import { card_type } from './card_type'

export class battle {
  players: Map<number, card_type[]> = new Map<number, card_type[]>()
  deck: deck = new deck()

  constructor (playerIds: number[]) {
    this.players.set(playerIds[0] || 1, this.deck.take(26))
    this.players.set(playerIds[1] || 2, this.deck.take(26))
  }

  begin () {
    console.log('began')
  }
}

import { deck } from './deck'
import { card_type } from './card_type'

export class battle {
  players: { id: number, cards:card_type[]}[] = []
  deck: deck = new deck()

  constructor (playerIds: number[]) {
    this.players[0] = { id: playerIds[0] || 1, cards: this.deck.take(26) }
    this.players[1] = { id: playerIds[1] || 2, cards: this.deck.take(26) }
  }

  async run () {
    const cardsInPlay : card_type[] = []
    while (this.players[0].cards.length > 0 && this.players[1].cards.length > 0) {
      let player0 = this.players[0].cards.pop() || 0
      let player1 = this.players[1].cards.pop() || 0
      cardsInPlay.push(player0, player1)
      while (player0 === player1) {
        cardsInPlay.push(this.players[0].cards.pop() || 0, this.players[1].cards.pop() || 0)
        player0 = this.players[0].cards.pop() || 0
        player1 = this.players[1].cards.pop() || 0
        cardsInPlay.push(player0, player1)
      }

      if (player1 > player0) {
        this.players[1].cards.push(...cardsInPlay)
      } else {
        this.players[0].cards.push(...cardsInPlay)
      }

      cardsInPlay.length = 0
    }

    if (this.players[0].cards.length > 0) {
      return { winner: this.players[0].id, loser: this.players[1].id }
    }

    return { winner: this.players[1].id, loser: this.players[0].id }
  }
}

import { battler } from './battler'
import { card_type } from './card_type'

export class roundContext {
  playerOne: battler
  playerTwo: battler
  roundCount: number = 0
  warCount: number = 0
  cardsInPlay: card_type[] = []
  roundWinner: battler | undefined
  roundLoser: battler | undefined
  constructor (p1: battler, p2: battler) {
    this.playerOne = p1
    this.playerTwo = p2
  }

  playersHaveCards () : boolean {
    return this.playerOne.cards.length !== 0 && this.playerTwo.cards.length !== 0
  }
}

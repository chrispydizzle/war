import { deck } from './deck'
import { round_strategy, single, war } from './round'
import { battler } from './battler'
import { roundContext } from './roundContext'

const DEAL_SIZE = 26

export class battle {
  playerOne: battler
  playerTwo: battler
  deck: deck = new deck()
  automated: boolean;

  constructor (playerIds: number[], automated: boolean = true) {
    this.automated = automated
    this.playerOne = new battler(playerIds[0] || 1, this.deck.take(DEAL_SIZE))
    this.playerTwo = new battler(playerIds[1] || 2, this.deck.take(DEAL_SIZE))
  }

  async run () {
    const context = new roundContext(this.playerOne, this.playerTwo)
    let round : round_strategy = new single()
    while (context.playersHaveCards()) {
      context.roundCount++
      round.fire(context)
      if (!context.roundWinner) {
        console.log('war time')
        context.warCount++
        round = new war()
        continue
      }
      console.log(`'Round over - ${context.roundWinner.id} will take ${context.cardsInPlay}`)
      context.roundWinner.take(context.cardsInPlay)

      context.roundWinner = undefined
      context.roundLoser = undefined
      round = new single()
    }

    return { winner: context.roundWinner, loser: context.roundLoser }
  }
}

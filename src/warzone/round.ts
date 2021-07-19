import { roundContext } from './roundContext'
import { battler } from './battler'
import { card_type } from './card_type'

export abstract class round_strategy {
  loser: battler | undefined;
  winner: battler | undefined;

  abstract fire(context: roundContext) : void

  protected processRound (context: roundContext, playerOneCard: card_type, playerTwoCard: card_type) {
    context.cardsInPlay.push(playerOneCard, playerTwoCard)
    console.log(`P1:${playerOneCard} P2:${playerTwoCard} Cards in play:${context.cardsInPlay.length}`)
    if (playerOneCard === playerTwoCard) {
      this.winner = this.loser = undefined
      console.log('Going to war.')
      return
    }

    const p1Value = card_type[playerOneCard]
    const p2Value = card_type[playerTwoCard]

    context.roundWinner = this.winner = p1Value > p2Value ? context.playerOne : context.playerTwo
    context.roundLoser = this.loser = p2Value > p1Value ? context.playerOne : context.playerTwo
  }
}

export class single extends round_strategy {
  public fire (context: roundContext) {
    const playerOneCard = context.playerOne.nextCard()
    const playerTwoCard = context.playerTwo.nextCard()
    this.processRound(context, playerOneCard, playerTwoCard)
  }
}

export class war extends round_strategy {
  public fire (context: roundContext) {
    context.cardsInPlay.push(context.playerOne.nextCard(), context.playerTwo.nextCard())
    const playerOneCard = context.playerOne.nextCard()
    const playerTwoCard = context.playerTwo.nextCard()
    this.processRound(context, playerOneCard, playerTwoCard)
  }
}

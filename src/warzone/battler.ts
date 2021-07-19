import { card_type } from './card_type'

export class battler {
  id: number
  cards: card_type[]
  isWinner: boolean = false

  constructor (id: number, cards: card_type[]) {
    this.id = id
    this.cards = cards
  }

  public nextCard (): card_type {
    return this.cards.pop()!
  }

  public take (cardsInPlay: card_type[]) {
    this.cards.unshift(...cardsInPlay)
    cardsInPlay.length = 0
  }
}

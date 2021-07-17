import { card_type } from './card_type'

export class deck {
  cards: Array<card_type> = []

  constructor () {
    for (let i = 2; i <= 14; i++) {
      this.cards.push(...Array(4).fill(card_type[i]))
    }
  }

  public take (cardCount: number) : card_type[] {
    return this.cards.splice(0, cardCount)
  }
}

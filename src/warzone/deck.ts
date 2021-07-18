import { card_type } from './card_type'

export class deck {
  cards: Array<card_type> = []

  constructor () {
    for (let i = 2; i <= 14; i++) {
      this.cards.push(...Array(4).fill(card_type[i]))
    }
  }

  public take (cardCount: number) : card_type[] {
    const dealtCards: card_type[] = []
    while (dealtCards.length < cardCount && this.cards.length > 0) {
      const next = Math.floor(Math.random() * this.cards.length)
      const card = this.cards.splice(next, 1) as card_type[]
      if (card.length > 0) {
        dealtCards.push(...card)
      }
    }

    return dealtCards
  }
}

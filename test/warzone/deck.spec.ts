import { deck } from '../../src/warzone/deck'
import { card_type } from '../../src/warzone/card_type'

describe('When deck is generated', () => {
  it('contains fifty-two cards', async () => {
    const d = new deck()
    expect(d.cards.length).toEqual(52)
  })

  it('has four cards of each type', async () => {
    const d = new deck()
    const cardMap = new Map<card_type, number>()
    d.cards.forEach(card => {
      cardMap.set(card, (cardMap.get(card) || 0) + 1)
    })
    expect(cardMap.size).toEqual(13)
    cardMap.forEach(c => expect(c).toEqual(4))
  })
})

describe('When taking cards from the deck', () => {
  it('returns the expected numbers of cards', async () => {
    const d = new deck()
    const cards = d.take(10)
    expect(cards.length).toEqual(10)
    expect(d.cards.length).toEqual(42)
  })
})

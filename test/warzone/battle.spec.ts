import { deck } from '../../src/warzone/deck'
import { battle } from '../../src/warzone/battle'
import { card_type } from '../../src/warzone/card_type'

describe('When battle is created', () => {
  it('defaults to computer players one and two if not provided', async () => {
    const bot = new battle([])
    expect(bot.players.length).toEqual(2)
    expect(bot.players[0].id).toEqual(1)
    expect(bot.players[1].id).toEqual(2)
  })
})

describe('When deck is created', () => {
  const bo = new deck()
  it('contains four of each card type', async () => {
    expect(bo.cards.length).toEqual(52)
    const m = new Map<card_type, number>()
    bo.cards.forEach(card => {
      m.set(card, (m.get(card) || 0) + 1)
    })
    expect(m.size).toEqual(13)
    m.forEach(c => expect(c).toEqual(4))
  })
})

describe('When taking cards from the deck', () => {
  const bo = new deck()
  it('returns the expected numbers of cards', async () => {
    const cards = bo.take(10)
    expect(cards.length).toEqual(10)
    expect(bo.cards.length).toEqual(42)
  })
})

import { deck } from '../../src/warzone/deck'
import { battle } from '../../src/warzone/battle'
import { card_type } from '../../src/warzone/card_type'

describe('When battle is created', () => {
  it('defaults to computer players one and two if not provided', async () => {
    const bot = new battle([])
    expect(bot.players.size === 2)
    expect(bot.players.has(1))
    expect(bot.players.has(2))
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

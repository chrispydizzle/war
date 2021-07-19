import { battle } from '../../src/warzone/battle'

describe('When battle is created', () => {
  it('defaults to computer players one and two if not provided', async () => {
    const b = new battle([])
    expect(b.playerOne.id).toEqual(1)
    expect(b.playerTwo.id).toEqual(2)
  })

  it('takes in a player id and assigns appropriately', async () => {
    const b = new battle([3, 4])
    expect(b.playerOne.id).toEqual(3)
    expect(b.playerTwo.id).toEqual(4)
  })
})

describe('During battle runs', () => {
  it('changes to war mode when faced with a draw', async () => {
    expect('TBD').toBe('TBD')
  })

  it('changes to single mode when a round is won', async () => {
    expect('TBD').toBe('TBD')
  })

  it('ends when one player has all of the cards', async () => {
    expect('TBD').toBe('TBD')
  })

  it('returns the correct winner and loser when the game is over', async () => {
    expect('TBD').toBe('TBD')
  })
})

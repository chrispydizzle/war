import { getConnectionManager } from 'typeorm'
import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions'
import { DATABASE_URL } from '../config'
import Player from './entities/Player'
import Game from './entities/Game'
export * from 'typeorm'

// import pg from 'pg'
// pg.defaults.parseInputDatesAsUTC = true
// pg.types.setTypeParser(1114, (stringValue: string) => new Date(`${stringValue}Z`))

export default async function createPostgresConnection (connectionOptions?: Partial<PostgresConnectionOptions>) {
  const connection = getConnectionManager().create({
    name: 'api',
    type: 'postgres',
    url: DATABASE_URL,
    logging: ['warn', 'error'],
    entities: [
      Player,
      Game
    ],
    ...connectionOptions
  })

  await connection.connect()
  return connection
}

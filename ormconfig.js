module.exports = [{
  name: 'default',
  type: 'postgres',
  url: process.env.DATABASE_URL,
  cli: {
    migrationsDir: './src/database/migrations'
  },
  migrations: [
    './src/database/migrations/*.ts'
  ],
  migrationsRun: true,
  logging: true,
  entities: ['./src/database/entities/*.ts']
}]

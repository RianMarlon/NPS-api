module.exports = {
  type: 'sqlite',
  database: './src/database/database.sqlite',
  migrations: ['./src/database/migrations/*{.ts, .js}'],
  cli: {
    migrationsDir: './src/database/migrations'
  }
}
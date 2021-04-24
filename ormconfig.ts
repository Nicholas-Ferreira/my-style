module.exports = [
  {
    type: 'mysql',
    host: process.env.MYSQL_HOSTNAME || 'localhost',
    port: process.env.MYSQL_PORT || 3306,
    username: process.env.MYSQL_USERNAME || 'root',
    password: process.env.MYSQL_PASSWORD || '',
    database: process.env.MYSQL_DATABASE || 'mystyle',
    migrations: ['./dist/**/migrations/*.js'],
    entities: ['./dist/**/entities/*.js'],
    cli: {
      migrationsDir: './dist/**/migrations/',
      entitiesDir: './dist/**/entities/',
    },
    synchronize: true,
    logging: false
  },
]
const {
  MONGODB_URL,
  MONGODB_DATABASE,
  MONGODB_USER,
  MONGODB_PASSWORD,
  MONGODB_PORT,
} = process.env;

const uri = `mongodb://${MONGODB_USER}:${MONGODB_PASSWORD}@${MONGODB_URL}:${MONGODB_PORT}/${MONGODB_DATABASE}`;

module.exports = {
  "dbConnectionUri": uri,
  "migrationsDir": "migrations"
}

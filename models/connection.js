const mongoose = require('mongoose');

const {
  MONGODB_URL,
  MONGODB_DATABASE,
  MONGODB_USER,
  MONGODB_PASSWORD,
  MONGODB_PORT,
} = process.env;

const uri = `mongodb://${MONGODB_USER}:${MONGODB_PASSWORD}@${MONGODB_URL}:${MONGODB_PORT}/${MONGODB_DATABASE}`;
try {
  mongoose.connect(uri);
} catch (err) {
  console.log(`could not connect to database ${uri}`);
}

module.exports = mongoose;

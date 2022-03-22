const mongoose = require('./connection');
const { Schema } = mongoose;

const userSchema = new Schema(
  {
    firstname:  String,
    lastname: String,
    email: String,
    passwordHash: String,
    createdOn: Date,
  },
  {
    strict: 'throw' // this option throws an error when data does not match the schema
  }

);

const User = mongoose.model('User', userSchema);

module.exports = User;

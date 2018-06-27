var mongoose = require('mongoose');

var UserSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  username: String,
  password: String
});

module.exports = mongoose.model('User', UserSchema);

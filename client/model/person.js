var mongoose = require('mongoose');

var Schema = mongoose.Schema;
 
module.exports = mongoose.model('Person', new Schema({
  name: String,
  age: Number
}));
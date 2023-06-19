const mongoose = require('mongoose');

const cardSchema = new mongoose.Schema({
  userId:String,
  image: String,
  name: String,
  description: String,
  liked: Number,
  rating: Number,
});

const CardModel = mongoose.model('Card', cardSchema);

module.exports = CardModel;

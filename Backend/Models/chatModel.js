const mongoose = require('mongoose');

const chatSchema = new mongoose.Schema(
  {
    members: Array,
<<<<<<< HEAD
=======
    productName: String,
    productId: String,
>>>>>>> development
  },
  {
    timestamps: true,
  }
);

const chatModel = mongoose.model('chat', chatSchema);

module.exports = chatModel;

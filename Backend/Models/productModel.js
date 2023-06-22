const mongoose = require('mongoose');

const productSchema = new mongoose.Schema(
    {
        productName: String,
        productDescription: String,
        userId: String,
        price: String,
        isChatCreated: Boolean,
        chatId: String,
        image: String,
        isLikedTotal: Number,
        isLiked: { type: Boolean, default: false },
    },
    {
        timestamps: true,
    }
);

const productModel = mongoose.model('product', productSchema);

module.exports = productModel;

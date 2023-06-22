const mongoose = require('mongoose');

const productSchema = new mongoose.Schema(
    {
        userId: String,
        productId: String,
        isLiked: Boolean,
    },
    {
        timestamps: true,
    }
);

const productModel = mongoose.model('likes', productSchema);

module.exports = productModel;

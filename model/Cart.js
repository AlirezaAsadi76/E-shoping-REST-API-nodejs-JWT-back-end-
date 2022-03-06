const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, required: true, unique: true },
    products: [{
        productId: {
            type: mongoose.Schema.Types.ObjectId,
        },
        quantity:{type:Number, default:1}
    }]

}, { timestamps: true });


const Cart = mongoose.model('Cart', cartSchema);
module.exports = Cart;
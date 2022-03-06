const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, required: true, unique: true },
    products: [{
        productId: {
            type: mongoose.Schema.Types.ObjectId,
        },
        quantity: { type: Number, default: 1 }
    }],
    amount:{type:Number,required: true},
    address:{type:Object,required: true},
    status:{type:String,default:"panding"}

}, { timestamps: true });


const Order = mongoose.model('Order', orderSchema);
module.exports = Order;
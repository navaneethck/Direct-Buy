const mongoose = require('mongoose');

const orderSchema= new mongoose.Schema({
    items:[{ name : String, price :Number}],
    totalAmount: Number,
    address: String,
    paymentMethod: String, // 'UPI' or 'CARD'
    paymentStatus: { type: String, default: "PENDING" }, // PENDING, SUCCESS, FAILED
    transactionId: String,
    createdAt: { type: Date, default: Date.now },
});



module.exports = mongoose.model('Order',orderSchema);
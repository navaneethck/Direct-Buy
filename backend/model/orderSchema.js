const mongoose = require('mongoose');

const orderSchema= new mongoose.Schema({
    order_id: String, 
    items:[{ name : String, price :Number}],
    totalAmount: Number,
    address: String,
    paymentMethod: String, 
    paymentStatus: { type: String, default: "PENDING" }, 
    transactionId: String,
    createdAt: { type: Date, default: Date.now },
});



module.exports = mongoose.model('Order',orderSchema);
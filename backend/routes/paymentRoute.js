const express = require('express');
const Razorpay = require('razorpay');
const Order = require('../model/orderSchema');
const crypto = require("crypto");

const router = express.Router();


const razorpay= new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET,
});

//payment api integration

router.post('/create-order',async (req,res)=>{

    try{
    const {amount,currency,receipt,notes} = req.body;

    const options = {

        amount:amount*100,
        currency,
        receipt,
        notes,

    }

    const order = await razorpay.orders.create(options);

    const newOrder = new Order({

        order_id: order.id,
        amount: order.amount,
        currency: order.currency,
        receipt: order.receipt,
        status: 'created'

    })

    await newOrder.save();

    res.json(order);

    }catch(error){
        console.log(error);
        res.status(500).send('Error creating order..')
    }
})


router.get('/payment-success', (req, res) => {
  res.redirect(process.env.FRONTEND_URL || 'http://localhost:5173/success');
});



router.post("/verify", async (req, res) => {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;
  
    const secret =process.env.RAZORPAY_KEY_SECRET; // ✅ Use SECRET key (not key_id)
    const body = razorpay_order_id + "|" + razorpay_payment_id;
  
    try {
      // ✅ Generate HMAC SHA256 signature for verification
      const expectedSignature = crypto
        .createHmac("sha256", secret)
        .update(body.toString())
        .digest("hex");

      if (expectedSignature === razorpay_signature) {
        
        const order = await Order.findOne({ order_id: razorpay_order_id });
  
        if (!order) {
          return res.status(404).json({ status: "error", message: "Order not found" });
        }
  
        order.paymentStatus = "SUCCESS";
        order.transactionId = razorpay_payment_id;
  
        await order.save();
  
        console.log(" Payment verification successful");
        res.status(200).json({ status: "ok" });
      } else {
        console.log(" Payment verification failed: Invalid signature");
        res.status(400).json({ status: "verification_failed" });
      }
    } catch (error) {
      console.error(" Error in payment verification:", error);
      res.status(500).json({ status: "error", message: "Error verifying payment" });
    }
  });

module.exports = router;
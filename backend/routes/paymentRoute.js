const express = require('express');
const Razorpay = require('razorpay');
const crypto = require('crypto');
const Order = require('../model/orderSchema');


const router = express.Router();

const razorpay= new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET,
});

router.post("/upi",async(req,res)=>{
    try{
        const {items,totalAmount,address} = req.body


        const order = await razorpay.orders.create({
            amount:totalAmount,
            currency:"INR",
            payment_capture:1

        })

        const newOrder = new Order({
            items,
            totalAmount,
            address,
            paymentMethode:"UPI",
            paymentStatus:"PENDING",
            transactioinId:order.id,

        })

        await newOrder.save();

        res.json({
            success:true,
            upiPaymentLink: `upi://pay?pa=yourupi@bank&pn=Your Name&mc=1234&tid=${order.id}&tr=${order.id}&tn=Payment&am=${totalAmount}&cu=INR`,
            orderId: order.id,
        })


    } catch(error){
        res.status(500).json({success:false,message:"Payment Failed",error})
    }
});

router.post("/card",async(req,res)=>{

    try{

    const {items,totalAmount,address} = req.body;

    const order = await razorpay.orders.create({
        amount:totalAmount,
        currency:"INR",
        payment_capture:1
    })

    const newOrder = new Order({
        items,
        totalAmount,
        address,
        paymentMethod:"CARD",
        paymentStatus:"PENDING",
        transactioinId:order.id,
    })

    await newOrder.save();

    res.json({
        success:true,
        razorpayOrderId: order.id,
        amount: totalAmount,
    })
}catch(error){
    res.status(500).json({success:false,message:"Payment Failed",error})

}
})

router.post("/verify",async(req,res)=>{

    try{

        const{razorpay_order_id,razorpay_payment_id,razorpay_signature} = req.body;

        const body = razorpay_order_id + "|" + razorpay_payment_id;

        const expectedSignature = crypto.
        createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
        .update(body)
        .digest("hex");

        if(expectedSignature === razorpay_signature){
            await Order.findOneAndUpdate(
                { transactionId: razorpay_order_id },
                { paymentStatus: "SUCCESS" } 
            )
            res.json({success: true, message: "Payment Verified"})
        }else{
            res.status(400).json({ success: false, message: "Invalid Payment" });
        }
    }catch(error){

        res.status(500).json({ success: false, message: "Verification Failed", error });

    }
})

module.exports = router;
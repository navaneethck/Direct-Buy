
require('dotenv').config();
const express = require("express");
const mongoose = require('mongoose');
const mongo_URI = process.env.MONGO_URI;
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

const paymentRoutes = require('./routes/paymentRoute')

const corsOptions = {
    origin: process.env.FRONTEND_URL || "http://localhost:5173", 
    credentials: true, 
    methods: ["GET", "POST", "PUT", "DELETE"], 
  };

app.use(cors(corsOptions));
app.use(express.json());

app.use("/api/payment",paymentRoutes);


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

mongoose.connect(mongo_URI).then(
    ()=>{
          console.log("connected successfully")
    }
).catch((err)=>{
    console.log('Database Connection error..!:',err.message);
})

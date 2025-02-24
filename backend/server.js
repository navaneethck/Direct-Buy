
require('dotenv').config();
const express = require("express");
const mongoose = require('mongoose');
const mongo_URI = process.env.MONGO_URI;
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

const paymentRoutes = require('./routes/paymentRoute')

app.use(cors());
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

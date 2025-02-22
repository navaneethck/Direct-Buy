
require('dotenv').config();
const mongoose = require('mongoose');
const mongo_URI = process.env.MONGO_URI;
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json());






mongoose.connect(mongo_URI).then(
    ()=>{
          console.log("connected successfully")
    }
).catch((err)=>{
    console.log('Database Connection error..!:',err.message);
})

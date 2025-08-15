const mongoose = require('mongoose');
require('dotenv').config();

const DB = mongoose.connect(process.env.MONGO_URI).then(()=>{
    console.log("DB connected");
}).catch((error)=>{
    console.log(error);
})

module.exports = DB;
require('dotenv').config({path:'./config/.env'})
const express = require('express');
const app = express();
const mongoose = require('mongoose');

const PORT = process.env.PORT ||5000;


mongoose.connect(process.env.MONGO_URI,{
  useUnifiedTopology:true,
  useNewUrlParser:true
}).then(()=>console.log("DB Connected"))
.catch((error)=>console.log(error))



app.listen(PORT,()=> console.log(`app listning in port ${PORT}`))
require('dotenv').config({path:'./config/.env'})
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const morgan = require('morgan')
const authRoutes= require('./routes/auth.routes.js')
const PORT = process.env.PORT ||5000;


app.use(express.json())
app.use(express.urlencoded({extended:false}))

app.use(morgan('tiny'))

mongoose.connect(process.env.MONGO_URI,{
  useUnifiedTopology:true,
  useNewUrlParser:true
}).then(()=>console.log("DB Connected"))
.catch((error)=>console.log(error))

app.use('/api',authRoutes)

app.listen(PORT,()=> console.log(`app listning in port ${PORT}`))
const mongoose = require('mongoose')
const {Schema,model} = mongoose

const userSchema = new Schema({
  name:{
    type:String,
    required : true
  },
  email:{
    type:String,
    required : true
  },
  password:{
    type:String,
    required : true
  },
  number:{
    type:String,
    required : true,
    unique:true
  },
  validation:{
    type:Boolean,
    default:false
  },
  role:{
    type:String,
    enum:['Admin','User'],
    default:'User'
  }
})
module.exports = model('user',userSchema)
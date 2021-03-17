const mongoose = require('mongoose')
const {Schema,model} = mongoose

const roomSchema = new Schema({
   nombre_place:{
     type:Number,
     default:0
   },
   users:[{
      type: Schema.Types.ObjectId,
       ref: 'user',
       required:true
  }],
   room_name:{
     type:String,
     required:true
   },
   disponible:{
     type:Boolean,
     default :true
   }
})
module.exports = model('room',roomSchema)
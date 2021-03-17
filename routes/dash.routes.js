const express = require('express')
const router = express.Router()

const {auth,isAdmin,isUser} = require('../middlewares/auth.middlewares')


router.get('/user',isUser,auth,(req,res)=>{
  const currentUser = res.locals.user
  if (currentUser) return  res.status(200).json(currentUser)
  return res.send('secure route')
})

router.get('/admin',isAdmin,auth,(req,res)=>{
  const currentUser = res.locals.user
  if (currentUser) return  res.status(200).json(currentUser)
  return res.send('secure route')
})


module.exports = router
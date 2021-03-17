const express = require('express')
const router = express.Router()

const {auth,isUser} = require('../middlewares/auth.middlewares')
const {joinRoom,createRoom,profileController} = require('../controllers/user.controllers')


router.get('/',isUser,auth,profileController)

router.get('/createroom',isUser,auth,createRoom)

router.get('/joinRoom/:id',isUser,auth,joinRoom)


module.exports = router
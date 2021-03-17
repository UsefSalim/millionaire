const express = require('express')
const router = express.Router()

const {auth,isAdmin} = require('../middlewares/auth.middlewares')


// router.get('/user',isUser,auth,)

// router.get('/admin',isAdmin,auth,)


module.exports = router
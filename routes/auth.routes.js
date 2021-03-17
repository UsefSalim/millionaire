const express = require('express')
const router = express.Router()
const {logoutController,loginController,registerController} = require('../controllers/auth.controllers')


router.post('/register',registerController)
router.post('/login',loginController)
router.post('/logout',logoutController)



module.exports = router
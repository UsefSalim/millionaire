const express = require('express')
const router = express.Router()

const {auth,isAdmin} = require('../middlewares/auth.middlewares')
const {createAdmin,profileController,validateUser} = require('../controllers/admin.controllers')


router.get('/',isAdmin,auth,profileController)

router.post('/createadmin',isAdmin,auth,createAdmin)

router.post('/validateuser/:id',isAdmin,auth,validateUser)


module.exports = router
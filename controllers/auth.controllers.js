const bcrypt = require('bcrypt')
const { registerValidations } = require('../validations/auth.validation')
const User = require('../models/user.model')
exports.registerController = async (req, res) =>
{
  // validation
  const { error } = registerValidations(req.body)
  if (error)
    return res.status(400).json(
      {
        errorRegister: error.details[0].message,
        infoUser: req.body
      })
  // if num exist 
  try
  {
    const ifUserExist = await User.findOne({ number: req.body.number })
    if (ifUserExist)
      return res.status(400).json({ errorRegister: `le numero ${req.body.number} existe deja`, infoUser: req.body })
    // hash password 
    const salt = await bcrypt.genSalt(10)
    const hachedPassword = await bcrypt.hash(req.body.password, salt)
    // create user 
    const newUser = new User({ ...req.body })
    newUser.password = hachedPassword
    // register
    const savedUser = await newUser.save()
    if (savedUser) return res.status(201).json(savedUser)
  } catch (error)
  {
     res.status(500).json(error)
  }

}
exports.loginController = (req, res) => { }
exports.logoutController = (req, res) => { }
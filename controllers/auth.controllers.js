const bcrypt = require('bcrypt')
const Jwt = require('jsonwebtoken')
const { registerValidations, loginValidations } = require('../validations/auth.validation')
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
exports.loginController = async (req, res) =>
{
  const { error } = loginValidations(req.body)
  if (error)
    return res.status(400).json({ errorLogin: error.details[0].message })
  try
  {
    const ifUserExist = await User.findOne({ number: req.body.number })
    if (!ifUserExist)
      return res.status(400).json({ loginError: `number or password invalid` })
    /// verification password
    const comparePassword = await bcrypt.compare(req.body.password, ifUserExist.password)
    if (!comparePassword)
      return res.status(400).json({ loginError: `number or password invalid` })
    if(ifUserExist.validation === false)
     return res.status(400).json({ invalidAccount: `votre compte n'est pas valide` })
    const token =  Jwt.sign(
    {id: ifUserExist._id, role:ifUserExist.role},
    process.env.SECRET_KEY ,
    {expiresIn:process.env.EXPIRATION_IN})
     res.cookie('login_token',token,{maxAge:process.env.EXPIRATION_IN,httpOnly:true})
    return res.status(200).json({token})
  } catch (error)
  {
    res.status(500).json(error)
  }

}
exports.logoutController = (req, res) => { 
  res.cookie('login_token','',{maxAge:1,httpOnly:true})
  res.redirect('/')
}
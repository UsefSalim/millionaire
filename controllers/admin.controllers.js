const User = require('../models/user.model')
const nodemailer = require('nodemailer')
const smtpTransport = require('nodemailer-smtp-transport')
exports.profileController = async (req, res) =>
{
  /// infortion admin
  const currentAdmin = res.locals.user
  /// user non valide
  try
  {
    const invalidUser = await User.find({ validation: false }).select('-password')
    return res.status(200).json({
      adminInfo: currentAdmin,
      invalidUser
    })
  } catch (error)
  {
    res.status(500).json(error)
  }
}
exports.createAdmin = async (req, res) =>
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
    newUser.validation = true
    newUser.role = "Admin"
    // register
    const savedUser = await newUser.save()
    if (savedUser) return res.status(201).json(savedUser)
  } catch (error)
  {
    res.status(500).json(error)
  }
}



exports.validateUser = async (req, res) =>
{
  try
  {
    const currentUser = await User.findOne({ _id: req.params.id })
    if (currentUser)
    {
      currentUser.validation = true
      const updatedUser = await currentUser.save()

      let transporter = nodemailer.createTransport(smtpTransport({
        host: 'smtp.gmail.com',
        auth: {
          type: 'custom',
          user: process.env.ADRESS_MAIL,
          pass: process.env.MAIL_PASSWORD
        }
      }));
      const mailOptions = {
        from: process.env.ADRESS_MAIL,
        to: currentUser.email,
        subject: 'fly ticket order',
        html: `<h1 style="text-align:center"> Your account is valid</h1><br><div style="width:40%; margin:0 auto; padding:2%;border:2px solid black;border-radius:4px;background:skyblue;"><p>thank you </p><br><p>Merçi d'être part de notre platforme</p></div><br><h5 style="text-align:center"><b style="color:blue">Millionaire</h5>`
      };
      transporter.sendMail(mailOptions, function (error, info)
      {
        if (error)
        {
          res.status(500).json({ error })
        } else
        {
          if (updatedUser) res.status(200).json({ updatedUser, validationMail: "mail ok" })

        }
      });

    } else
    {
      res.status(400).json({ updateError: 'id non reconnu' })
    }
  } catch (error)
  {
    res.status(500).json(error)
  }
}

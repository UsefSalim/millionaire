const jwt = require('jsonwebtoken')
const User = require('../models/user.model')
exports.isAdmin = (req,res,next)=>{
  res.type = "Admin"
  next()
}
exports.isUser = (req,res,next)=>{
res.type = "User"
next()
}
exports.auth = async (req, res, next) => {
  const token = req.cookies.login_token;
  if (token) {
    jwt.verify(token, process.env.SECRET_KEY, async (err, decodedToken) => {
      if (!err && decodedToken.role === res.type) {
        const user = await User.findById(decodedToken.id).select('-password');
        res.locals.user = user;
        next();
      } else {
        res.locals.user = null;
        res.cookie('log_token', '', { maxAge: 1 });
        res.status(400).json(`private root need ${res.type}  login`);
      }
    });
  } else {
     res.locals.user = null;
        res.cookie('log_token', '', { maxAge: 1 });
        res.status(400).json(`private root need ${res.type}  login`);
  }
};

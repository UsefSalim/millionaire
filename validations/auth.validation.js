const Joi = require('joi')

exports.registerValidations =async (data)=>{
   const schema = Joi.object({
      name: Joi.string().min(5).max(255).required().trim(),
      email: Joi.string().email().required(),
      password: Joi.string().min(6).max(1024).required(),
      number: Joi.string().required()
   })
   return schema.validate(data)
}
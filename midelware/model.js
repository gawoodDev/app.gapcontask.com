const Joi = require("joi");


function validation (body) {
    
    let schemaTask = Joi.object({
        title : Joi.string().min(2).max(200).required(),
        body : Joi.string().min(2).max(200).required(),
        isdone : Joi.number().integer().min(0).max(1)
    })
    
    
    let userValidationSignup = Joi.object({
        username : Joi.string().min(8).max(20).trim().required(),
        email : Joi.string().email().trim().required(),
        password : Joi.string().min(1).max(20).trim().required()
    })
    
    
    
    
    
    
    return {
      schemaTask : schemaTask.validate(body),
      userValidationSignup : userValidationSignup.validate(body)
    }
}



module.exports = validation;

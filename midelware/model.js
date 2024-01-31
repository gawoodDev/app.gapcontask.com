const Joi = require("joi");


function validation(body) {
    
    let schemaTask = Joi.object({
        title : Joi.string().min(2).max(200).required(),
        body : Joi.string().min(2).max(200).required(),
        isdone : Joi.number().integer().min(0).max(1)
    })
    
    
    console.log("Do you have the ....");
    return schemaTask.validate(body);
}


module.exports = validation;

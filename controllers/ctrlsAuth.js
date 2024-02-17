const express = require("express");
const bcrypt = require("bcryptjs");
const validation = require("../midelware/model.js");
const jwt = require("jsonwebtoken")
let Users = require("../db/users.json") || [
{
    user_id: "001A",
    email: "a@a.com",
    password: '$2a$10$oWDfskt9Iw773LcvPeR.aeGOp6H4Gntf2sexAPvGHLMmtuKMfCsTm',
    username: "Brolly"
},
{
    user_id: "002B",
    email: "b@b.com",
    password: "$2a$10$rlcqVhfD9L2F3nCR82mJfuOUzrPcJLLEMWIGMcQpSF3EuXikmo3MG",
    username: "Goku"
}];










//console.log(Users)



exports.signup = (req, res) =>{
  let body =  req.body;
  
  
  let {error} = validation(body).userValidationSignup;
  if(error) {
    return res.status(401).json(error.details[0].message)
  }
  
  
  
  bcrypt.hash(body.password, 10)
  .then((hash)=>{
      
        if(!hash) return res.status(401).json({msg: "Erreur serveur"})
      
        console.log(hash)
        delete body.password;
        
        body.id = Date.now() + body.username.slice(0, 2);
        
        Users.push({...body, password: hash})
        
        res.status(201).json({msg: "User created"})
    
    
  })
  .catch((err) =>  res.status(401).json({msg: "Serveur occuper"}) )
  
  
  
  
}


exports.loggin = (req, res) =>{
    
    
    
  let {email, password} =  req.body;
  
  
  
  let user = Users.find((usr)=>{
    return usr.email === email
  });
  
 
  if(!user) return res.status(401).json({msg: "User not found, Signup"})
  
  
  bcrypt.compare(password , user.password)
  .then((match)=>{
       if(!match) return res.status(401).json({msg: "Incorect password "});
   
      console.log(user, req)
      
      
      let token = jwt.sign({id: user.id}, "MY_SECRET", {expiresIn: 60 * 3});
      
      req.session.token = token;
      req.session.user = user;
      
      
      res.status(200).json({
          msg: `Bienvenuue ${user.username}`,
          allow :  true
      });
      
      
    console.log("'Succeful' loggin");
      
        
  })
  .catch((err) => res.status(401).json({msg: "Erreur du serveur"}));
       

    
     
}






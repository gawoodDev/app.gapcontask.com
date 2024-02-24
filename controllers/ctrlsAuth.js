const express = require("express");
const bcrypt = require("bcryptjs");
const passport = require("passport");
const localStrategy = require("passport-local").Strategy;
const {REGISTER_USER} = require("../api/authApi.js")

const validation = require("../midelware/model.js");
const jwt = require("jsonwebtoken");


exports.signup = function (req, res) {
    
    
    console.log("signup")
    let body = req.body;
    let {error} = validation(body).userValidationSignup;
    
    if(error) {
      return res.status(401).json(error.details[0].message)
    }
    
    
    bcrypt.hash(body.password, 10)
    .then((hash)=>{
      
        if(!hash) return res.status(401).json({msg: "Erreur serveur"})
      
        console.log(hash)
        delete body.password;
        
        body.user_id = Date.now() + body.username.slice(0, 2);
        
        
        REGISTER_USER({...body, password: hash}, function (err){
            
            if(err) throw err
            console.log("User registered succcefuly")
            
            res.status(201).json({msg: "User created"})
            
            
        })
        
        
    })
    .catch((err) =>  res.status(401).json({msg: "Serveur occuper"}) )
    
      
  
  
  
}


exports.loggin = passport.authenticate("local", 
{
    successRedirect: "/",
    failureRedirect : "/loggin",
    failureFlash: true
    
})



exports.authenticate = function (getUserByEmail, getUserById) {
    
    passport.use(new localStrategy({
        usernameField: "email"
    }, async function(email, password, done)
    {
        
        let user = getUserByEmail(email)
        //console.log(user)
        if(!user) return done(null, false, {message: "No user with the email!"})
    
    try{
        if(await bcrypt.compare(password, user.password)) 
        {
            
            return done(null, user)
            
        }else{
            
            return done(null, false, {message: "Incorect password !"})
            
        }
    } catch (e){
        return done(e)
    }
        
    }))
    
    
    passport.serializeUser((user, done)=> done(null, user.user_id));
    
    passport.deserializeUser((id , done)=>{
        return done(null, getUserById(id))
    })
}



/*
console.log(Users)



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

*/





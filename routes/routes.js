const express =  require("express");
const routes = express.Router();
const Joi = require("joi");
const validation = require("../midelware/model.js");
const passport = require("passport")
const passportJWT = require("passport-jwt")
const jwt = require("jsonwebtoken")

const db = require("../db/db.js");
let datas = [];


const { PROTECT_ROUTES, UNACCESS_LOGGIN_SIGNUP} = require("../midelware/auth_midelware.js")












routes.get("/",  (req, res) => {
    
    
    console.log("Home page access")

    
    res.render("index.ejs", {username: req.user.username })
    
})
    




routes.get('/project', (req, res)=>{
    res.render('project.ejs');
})







routes.get("/test", (req, res)=>{
    
    
    require("bcryptjs").hash("b", 10)
    .then((hash)=>{
        if(!hash) return res.status(401).json({msg: "Erreur serveur"})
      
        console.log(hash)
        
        res.json(hash)
    });
    
    
    
})









module.exports = routes;



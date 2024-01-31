const express =  require("express");
const routes = express.Router();
const Joi = require("joi");
const validation = require("../midelware/model.js");
const db = require("../db/db.js");




routes.post("/addTask", (req, res)=>{
    
    
    let {err, value } = validation(req.body);
    
    
    if (err) {
        console.log(err.details[0].message)
    }
    
    let {title, body, isdone} = value
    let ref = "00-A";
    
    console.log(value);
    
    
    let query = `INSERT INTO tasklist (title,body,isdone,ref) VALUES ("${title}","${body}","${isdone}","${ref}")`;
    
    db.query(query,(err)=>{
        if (err) throw err;
        
        console.log("Ajouter a la base de donnee avec succes !")
    });
    
    
})



routes.get("/deleteTask",(req, res)=>{
    
    let query = "";
    db.query("",(err)=>{
        
    })
    
})
routes.get("/modifTask",(req, res)=>{
    
    let query = ""
    db.query("",(err)=>{
        
    })
    
})












module.exports = routes;



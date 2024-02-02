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
    
    res.send("Ajouter avec success !").end()
    
})

 

routes.post("/deleteTask",(req, res)=>{
    
    
    let id = Number(req.body.id);
    
    console.log(typeof id)
    let query = `DELETE FROM tasklist WHERE id=${id}`;
    
    db.query(query,(err)=>{
        if(err) throw err
        console.log("La tache " + id + " a ete supprimer  avec succes !")
    })
    
    res.send("Delete avec success !").end()
    
    
});




routes.post("/modifTask",(req, res)=>{
    
    let {id, title, body, isdone} = req.body
    
    let ref = "00-A";
    
    isdone = isdone === true ? 1 : 0;
    
    let query = `UPDATE tasklist SET title="${title}",  body="${body}",  ref='${ref}', isdone='${isdone}'  WHERE id='${id}'`;
    db.query(query,(err)=>{
        if(err) throw err;
        
        console.log("Modif avec success ")
        
    })
    
    
    res.send("Modif avec success !").end()
    
    
})












module.exports = routes;



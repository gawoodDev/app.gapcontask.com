const express =  require("express");
const routes = express.Router();
const db = require("../db/db.js");
const validation = require("../midelware/model.js");
let Users = require("../db/users.json");


routes.post("/addTask", (req, res)=>{
    let {user_id} = req.session.user;
    let {err, value } = validation(req.body).schemaTask
    
    
    if (err) {
        console.log(err.details[0].message)
    }
    
    let {title, body, isdone, ref} = value
    
    
    console.log(value);
    
    
    let query = `INSERT INTO tasklist (title,body,isdone,ref,user_id) VALUES ("${title}","${body}","${isdone}","${ref}", "${user_id}")`;
    
    db.query(query,(err)=>{
        if (err) throw err;
        
        console.log("Ajouter a la base de donnee avec succes !")
    });
    
    res.send("Ajouter avec success !").end()
    
})

 

routes.post("/deleteTask",(req, res)=>{
    
    let {user_id} = req.session.user;
    let id = Number(req.body.id);
    
    console.log(typeof id)
    let query = `DELETE FROM tasklist WHERE id=${id} WHERE user_id="${user_id}"`;
    
    db.query(query,(err)=>{
        if(err) throw err
        console.log("La tache " + id + " a ete supprimer  avec succes !")
    })
    
    res.send("Delete avec success !").end()
    
    
});



routes.post("/modifTask",(req, res)=>{
    let {user_id} = req.session.user;
    let {id, title, body, isdone, ref} = req.body;
    
    console.log("Its work!")
    
    isdone = isdone === true ? 1 : 0;
    
    let query = `UPDATE tasklist SET title="${title}",  body="${body}",  ref='${ref}', isdone='${isdone}'  WHERE id='${id}' AND  user_id="${user_id}"`;
    
    db.query(query,(err)=>{
        if(err) throw err;
        console.log("Modif avec success ");
    })
    
    
    res.send("Modif avec success   !").end();
    
    
})


routes.get("/getDatas", (req, res)=>{
    let user = req.session.user;
    
    console.log(user)
    
    db.query(`SELECT * FROM tasklist WHERE user_id="${user.user_id}"`,(err, result)=>{
        if (err) throw err
        res.json(result);
    })
})


module.exports = routes;





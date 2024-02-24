const express =  require("express");
const routes = express.Router();
const db = require("../db/db.js");
const validation = require("../midelware/model.js");


const {addTask, updateTask, deleteTask, getAllTask} = require("../api/taskApi.js")


routes.post("/addTask", (req, res)=>{

    let {user_id} = req.session.user || req.user; 


    addTask(req.body, user_id,  function (err, success){
        if(err) throw err;
        
        res.send("Ajouter avec success !").end()
    })
})

 

routes.post("/deleteTask",(req, res)=>{
    
    let {user_id} = req.session.user || req.user; 
    let id = Number(req.body.id);
    
    deleteTask({id}, user_id, function(err, success){
        if(err) throw err
        res.send("Delete avec success !").end()
    })

});



routes.post("/modifTask",(req, res)=>{
    let {user_id} = req.session.user || req.user; 
    
    updateTask(req.body, user_id, function(err, success){
        if(err) throw err;
        res.send("Modif avec success !").end();
    })
    
})


routes.get("/getDatas", (req, res)=>{
    let {user_id} = req.session.user || req.user; 
    
    getAllTask({}, user_id, function(err, success, data){
        if(err) throw err;
        res.json(data);
    })
    
})



module.exports = routes;





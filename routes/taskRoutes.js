const express = require("express");
const routes = express.Router();
const db = require("../db/db.js");
const validation = require("../midelware/model.js");


const {
    addTask,
    updateTask,
    deleteTask,
    getAllTask,
    doneTask
} = require("../api/taskApi.js")




routes.post("/addTask", (req, res) => {
    addTask(req.body, req.user.user_id, function (err, success, task_id) {
        if (err) throw err;
        res.status(200).json({
            task_id
        })
    })
})





routes.post("/deleteTask", (req, res) => {
    
    console.log(req.body)
    
    if(req.body.id){
        deleteTask({
            id: req.body.id
        }, req.user.user_id, function (err, success) {
            if (err) throw err;
            console.log("Delete unique")
            res.status(200).end();
        })
        return
    }
    
    
    
    if(!req.body.data) return 
    
    let data = req.body.data

    data.forEach((id, index) => {
        console.log(id);
        deleteTask({
            id: id
        }, req.user.user_id, function (err, success) {
            if (err) throw err;
            console.log("Delete multiples")
            if (index === (data.length - 1)) {
                res.status(200).send("Delete avec success !");
            }
        })
    })
});







routes.post("/modifTask", (req, res) => {
    updateTask(req.body, req.user.user_id, function (err,
        success) {
        if (err) throw err;
        res.status(200).send("Modif avec success !");
    })

})


routes.get("/getDatas", (req, res) => {
    getAllTask({},
        req.user.user_id,
        function (err, success, data) {
            if (err) throw err;
            res.json(data);
        })

})






routes.post("/doneTask", (req, res) => {

    doneTask(req.body,
        req.user.user_id,
        function (err,
            success) {
            if (err) throw err;
            res.status(200).send("success !");
        })

})




module.exports = routes;
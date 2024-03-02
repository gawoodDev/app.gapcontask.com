const express = require("express");
const routes = express.Router();
const db = require("../db/db.js");
const validation = require("../midelware/model.js");


const {
    addTask,
    updateTask,
    deleteTask,
    getAllTask
} = require("../api/taskApi.js")




routes.post("/addTask", (req, res) => {
    let {
        user_id
    } = req.session.user || req.user;
    addTask(req.body, user_id, function (err, success) {
        if (err) throw err;
        res.send("Ajouter avec success !").end()
    })
})





routes.post("/deleteTask", (req, res) => {
    let {
        user_id
    } = req.user;
    let data = req.body.data;

    console.log("Every",
        data);

    data.forEach((id, index) => {
        console.log(id);
        deleteTask({
            id: id
        }, user_id, function (err, success) {
            if (err) throw err;

            if (index === (data.length - 1)) {
                res.status(200).send("Delete avec success !");
            }

        })
    })
});






routes.post("/modifTask", (req, res) => {

    let {
        user_id
    } = req.user;
    
    console.log("modification user_id", req.body)
    
    updateTask(req.body, user_id, function (err,
        success) {
        if (err) throw err;
        res.status(200).send("Modif avec success !");
    })

})


routes.get("/getDatas", (req, res) => {
    let {
        user_id
    } = req.session.user || req.user;

    getAllTask({},
        user_id,
        function (err, success, data) {
            if (err) throw err;
            res.json(data);
        })

})



module.exports = routes;
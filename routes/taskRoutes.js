const express = require("express");
const routes = express.Router();
const db = require("../db/db.js");
const validation = require("../midelware/model.js");
const asyncError = require("express-async-handler");

const {
   addTask,
   updateTask,
   deleteTask,
   getAllTask,
   doneTask,
   REMOVE_SELECTED
} = require("../api/taskApi.js");


routes.post("/addTask", asyncError(async (req, res) => {

   console.log("Its work: addTask")

   let { err, task_id } = await addTask(req.body, req.user.user_id);

   if (err) {
      throw err;
   }

   res.status(200).json({
      task_id
   })


}));


routes.delete("/deleteTask", asyncError(async (req, res) => {



   if (req.body.id) {
      let { error, successs } = await deleteTask({
         id: req.body.id
      }, req.user.user_id);

      if (error) throw error;
      console.log("Delete unique")
      res.status(200).end();

      return
   }


   if (!req.body.data) return

   let data = req.body.data

   let { err, success } = await REMOVE_SELECTED({ data }, req.user.user_id);

   if (err) throw err;

   console.log("Delete multiples")

   res.status(200).end();

}));


routes.put("/modifTask", asyncError(async (req, res) => {

   console.log("Its work! UPDATED ...");

   let { err, success } = await updateTask(req.body,
      req.user.user_id);
   if (err) throw err;
   res.status(200).send("Modif avec success !");

}));


routes.get("/tasks", asyncError(async (req, res) => {

   console.log("Its work! Sended ...");

   let { err, rows, success } = await getAllTask({},
      req.user.user_id);

   if (err) throw err;

   res.status(200).json(rows);

}));


routes.post("/doneTask", asyncError(async (req, res) => {

   let { err, success } = await doneTask(req.body, req.user.user_id);

   if (err) throw err;

   res.status(200).send("success !");

}));




module.exports = routes;





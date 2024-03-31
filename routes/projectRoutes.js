const express = require("express");
const routes = express.Router();
const db = require("../db/db.js");
const validation = require("../midelware/model.js")
const asyncError = require("express-async-handler");



const {
   ADD_PROD,
   GET_ALL_USER_PROD,
   DELETE_PROD,
   GET_PROD_BY,
   GET_ALL_TASK_FROM,
   UPDATE_PROD
} = require("../api/prodApi.js");






routes.post(`/addProd`, asyncError(async (req, res) => {
   let {
      user_id
   } = req.user;
   let {
      title
   } = req.body;


   let { err, project_id } = await ADD_PROD({
      title, user_id
   })

   if (err) throw err;

   res.status(200).json({ project_id })

}));

routes.post(`/modifProd`, asyncError(async (req, res) => {
   let {
      user_id
   } = req.user;
   let {
      id, title
   } = req.body;

   let { err, success } = await UPDATE_PROD({ id, user_id, title })

   if (err) throw err;

   res.status(200).send("success")


}));

routes.post(`/deleteProd`, asyncError(async (req, res) => {
   let {
      user_id
   } = req.session.user || req.user;



   let { err, successs } = await DELETE_PROD({
      id: req.body.id,
      user_id,
      ref_key: req.body.ref_key
   })


   if (err) throw err;

   res.status(200).send("success")
}));



routes.get('/get_project_list', asyncError(async (req, res) => {


   let {
      user_id
   } = await req.user;

   let { rows, err } = await GET_ALL_USER_PROD({
      user_id
   });


   if (err) throw err;

   res.status(200).json({ datas: rows });


}));



routes.get('/unique_prod_datas:id', asyncError(async (req, res) => {


   let { user_id } = req.user, id;

   id = req.params.id.replace(":",
      "");

   let { rows, err, successs } = await GET_ALL_TASK_FROM({ id, user_id });

   if (err) throw err;

   console.log(rows)

   res.status(200).json(rows);

}));





module.exports = routes;





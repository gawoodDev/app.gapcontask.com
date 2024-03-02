const express = require("express");
const routes = express.Router();
const db = require("../db/db.js");
const validation = require("../midelware/model.js");
let datas;
const { AUTH, LOCKED_ROUTES, PROTECT_ROUTES } = require("../midelware/auth_midelware.js")
const { ADD_PROD, GET_ALL_USER_PROD, DELETE_PROD, GET_PROD_BY, GET_ALL_TASK_FROM, UPDATE_PROD } = require("../api/prodApi.js")


routes.post(`/addProd`, (req, res) => {
  let { user_id } =  req.user;
  let { title } = req.body;
  

  let ref_key = Date.now().toString().slice(5,11) +  '_' + title.slice(0, 3) + "_" + user_id;

  ADD_PROD({ ref_key, title, user_id }, (err, success) => {
    if (err) throw err;
    console.log(`Projet ajouter  addProd`);
    res.status(200).end();
  })

});






routes.post(`/modifProd`, (req, res) => {
  let { user_id } = req.user;
  let { id, title } = req.body;

  UPDATE_PROD({ id, user_id, title }, (err, success) => {

    if (err) throw err;
    res.status(200).send("success");


  });

  console.log(`Recus modifProd`);

});




routes.post(`/deleteProd`, (req, res) => {
    let { user_id } = req.session.user || req.user;
    let id  = Number(req.body.id);
    let ref_key  = req.body.ref_key;
    console.log(ref_key, id)
    DELETE_PROD({ id, user_id, ref_key }, (err, success) => {
        if (err) throw err;
        console.log(`Projet supprimer  addProd`);
        res.status(200).end("project");
    })

});


let referer


routes.get('/get_project_list', (req, res) => {

  let user_id = req.user.user_id ;

  GET_ALL_USER_PROD({ user_id }, (err, success, datas) => {
      
    if (err) throw err;
    console.log("Success all datas list project sent to user call", datas)
    res.status(200).json(datas)

  })

})


function getCookie(req) {
  let p = req.cookies.p_d;
  let spl = p.split("_");
  let ref_key = spl[0] + "_";
  let id = Number(spl[1]);

  console.log("_______")

  return {
    id, ref_key
  }

}


routes.get('/project/plan:id', (req, res) => {
    let { user_id } = req.user;
    let id = Number(req.params.id.replace(":", ""));
    let ref_key = req.query.ref;
    console.log("project/plan:id", id, ref_key)
    res.render("plan.ejs", { id: id, ref_key: ref_key,  title: "Ok"  });

})


routes.get('/unique_prod_datas:id', (req, res) => {
    let { user_id } =  req.user;
    let id = Number(req.params.id.replace(":", ""));

    console.log("/unique_prod_datas", id);

    GET_ALL_TASK_FROM({ id, user_id }, (err, success, datas) => {
        if (err) throw err;
        console.log("Success unique prod send from db", user_id, id)
        res.status(200).json(datas);
    })

});


module.exports = routes;




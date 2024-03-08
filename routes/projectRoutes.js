const express = require("express");
const routes = express.Router();
const db = require("../db/db.js");
const validation = require("../midelware/model.js");
let datas;
const {
  AUTH,
  LOCKED_ROUTES,
  PROTECT_ROUTES
} = require("../midelware/auth_midelware.js")
const {
  ADD_PROD,
  GET_ALL_USER_PROD,
  DELETE_PROD,
  GET_PROD_BY,
  GET_ALL_TASK_FROM,
  UPDATE_PROD
} = require("../api/prodApi.js")






routes.post(`/addProd`, (req, res) => {
  let {
    user_id
  } = req.user;
  let {
    title
  } = req.body;


  let ref_key = Date.now().toString().slice(5, 11) + '_' + title.slice(0, 3) + "_" + user_id;

  ADD_PROD({
    ref_key, title, user_id
  })
    .then(({ project_id }) => {
      console.log(`Projet ajouter  addProd`);
      res.status(200).json({
        project_id
    })
      }).catch((err) => {
        if (err) console.log("errr")
      })

});







routes.post(`/modifProd`, (req, res) => {
  let {
    user_id
  } = req.user;
  let {
    id, title
  } = req.body;

  UPDATE_PROD({
    id,
    user_id,
    title
  })
    .then(
      (data) => {
        res.status(200).send("success")
      })
    .catch((err) => {
      if (err) throw err;
    })

  console.log(`Recus modifProd`);

});




routes.post(`/deleteProd`, (req, res) => {
  let { user_id } = req.session.user || req.user;

  DELETE_PROD({
    id: req.body.id,
    user_id,
    ref_key: req.body.ref_key
  })
    .then(
      (data) => {
        res.status(200).send("success")
      })
    .catch((err) => {
      if (err) throw err;
    })
})

let referer


routes.get('/get_project_list', (req, res) => {

  let user_id = req.user.user_id;

  GET_ALL_USER_PROD({
    user_id
  }).then((datas) => {

    //if (err) throw err;
    res.status(200).json(datas);
  }).catch((err) => {
    if (err) throw err;
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
  let {
    user_id
  } = req.user;
  let id = req.params.id.replace(":",
    "");
  let ref_key = req.query.ref;


  console.log("project/plan:id",
    id,
    ref_key)


  res.render("plan.ejs",
    {
      id: id,
      ref_key,
      title: "Ok"
    });

})


routes.get('/unique_prod_datas:id', async (req, res) => {
  let {
    user_id
  } = req.user, id;

  id = req.params.id.replace(":",
    "");



  console.log("This the id",
    id)


  GET_ALL_TASK_FROM({
    id,
    user_id
  })
    .then(
      (datas) => {
        res.status(200).json(datas);
      })
    .catch((err) => {
      if (err) throw err;
    })


});


module.exports = routes;





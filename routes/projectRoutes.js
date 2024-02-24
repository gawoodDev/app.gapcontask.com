const express = require("express");
const routes = express.Router();
const db = require("../db/db.js");
const validation = require("../midelware/model.js");
let datas ;
const {AUTH, LOCKED_ROUTES, PROTECT_ROUTES} = require("../midelware/auth_midelware.js")
const {ADD_PROD,GET_ALL_USER_PROD, DELETE_PROD, GET_PROD_BY, GET_ALL_TASK_FROM} = require("../api/prodApi.js")


routes.post(`/addProd`, (req, res) => {
    let {user_id} = req.session.user || req.user; 
    
    let { id, title } = req.body;

    let ref_key = id + title.slice(0, 1) + "_";
        
    ADD_PROD({ref_key, title, user_id}, (err, success)=>{
        
        if(err) throw err
        
        console.log(`Projet ajouter  addProd`);
        res.status(200).send("success");
    })
    
});




routes.post(`/modifProd`, (req, res) => {
    let {id} = req.body;

    console.log(`Recus modifProd`);
});




routes.post(`/deleteProd`, (req, res) => {
    let {user_id} = req.session.user || req.user; 
    
    let {id} = req.body;
    
    
    DELETE_PROD({id, user_id}, (err, success)=>{
        
        if(err) throw err
        
        console.log(`Projet supprimer  addProd`);
        res.status(200).send("success");
    })
    
});

let referer 


routes.get('/get_project_list',  (req, res)=>{
  
    let mode = req.headers['sec-fetch-mode'];
    referer = req.headers.referer || referer;
    
    let user_id =  req.user.user_id || undefined;

    
    GET_ALL_USER_PROD({user_id, mode, referer}, (err, success, datas)=>{
        
        if(err) throw err
        console.log("Success api call", datas)
        res.status(200).json(datas)
        
    })
    
})


function getCookie(req){
  let p = req.cookies.p_d;
  let spl = p.split("_");
  let ref_key = spl[0] + "_";
  let id = Number(spl[1]);
    
  console.log("_______", p, spl, ref_key, id,  req.cookies)
  
  return {
    id, ref_key
  }
  
}


routes.get('/project/plan', (req, res)=>{
    let {user_id} = req.session.user || req.user; 
    
    
    let {id, ref_key} = getCookie(req)
    

    
    
    return res.render("plan.ejs", {datas: {
      id,
      title: "Ok"}
    })
    
    
    
    
    
    
    
    
    
})


routes.get('/unique_prod_datas:id',    (req, res)=>{
    
    let {user_id} = req.session.user || req.user; 
    
    let {id, ref_key} = getCookie(req);
    
    id = id || Number(req.params.id.slice(1,2));
    
    
    console.log("/unique_prod_datas", id);
    
    
    GET_ALL_TASK_FROM({ id, user_id}, (err, success, datas)=>{
      
        if(err) throw err
        console.log("Success api call from db", datas)
        
        res.status(200).json(datas);
    })
    
    
    
});


module.exports = routes;




const express = require("express");
const routes = express.Router();
const db = require("../db/db.js");
const validation = require("../midelware/model.js");
let datas ;
const {AUTH, LOCKED_ROUTES, PROTECT_ROUTES} = require("../midelware/auth_midelware.js")



routes.post(`/addProd`, (req, res) => {
    let {user_id} = req.session.user;
    let {
        id, title
    } = req.body;
    
    let ref_key = id + title.slice(0, 1) + "_";

    console.log(`Recus addProd`, req.body, ref_key);
    let query = `INSERT INTO prodlist (title, ref_key, user_id) VALUES ("${title}", "${ref_key}", "${user_id}")`;
    db.query(query, (err) => {
        if (err) throw err;
        console.log("Projet ajouter avec success!");
    })

    res.status(200).send("success");
});




routes.post(`/modifProd`, (req, res) => {
    let {
        id
    } = req.body;
    console.log(`Recus modifProd`);
});

routes.post(`/deleteProd`, (req, res) => {
    let {user_id} = req.session.user;
    let {id} = req.body;
    
    
    db.query(`SELECT * FROM prodlist WHERE id="${id}" AND user_id="${user_id}"`,
        (err, result)=>{
        if(err) throw err;
        datas = result;
        
        console.log("resultt", result)
        
    })
    
    
    return
    
    
    if (true) {
        
    }
    
    let query = `DELETE FROM prodlist WHERE id="${id}" `;
    
    
    
    console.log("Formation")
    
    
    db.query(query, (err) => {
        if (err) throw err;
        console.log("Projet supprimer avec success!");
    });
    
    
    
    res.end("project");

});

let referer 

routes.get('/get_project_list',  (req, res)=>{
    
    let mode = req.headers['sec-fetch-mode'];
    referer = req.headers.referer || referer
    let {user_id} = req.session.user    
    
    console.log('Liste des projet demander', mode, user_id, referer)
    
    
    db.query(`SELECT * FROM prodlist WHERE user_id="${user_id}"`,
        (err, result)=>
    {
        if(err) throw err;
        datas = result;
        
        if(mode == "cors"){
            let datas = result || [];
            console.log("data", datas)
            
            res.status(200).json(datas)
        }else if(mode === "navigate"){
            
            res.redirect(referer)
            
        }
        else{
            
        }
        
        console.log("res ufhhfultt", result)
    })
    
    
    
})

routes.get('/project/plan:id' ,(req, res)=>{
    if(!req.session.token || !req.session.user ) {
        
        return res.redirect("/loggin")
    } 
    
    
    
    let {user_id} = req.session.user;
    console.log(user_id)
    let id = Number(req.params.id.slice(1,2));
    get_prodlist(user_id);
    
    console.log(datas)
    
    let data = datas
    .find( item => item.id === id );
    
    console.log(`: Page afficher`, data);
    res.render('plan.ejs', {data});

})



function get_prodlist (user_id){
    
    db.query(`SELECT * FROM prodlist WHERE user_id="${user_id}"`,
        (err, result)=>{
        if(err) throw err;
        datas = result;
        
    })
    
    return datas;
    
    
};




module.exports = routes;
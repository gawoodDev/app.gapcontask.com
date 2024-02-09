const express =  require("express");
const routes = express.Router();
const Joi = require("joi");
const validation = require("../midelware/model.js");
const db = require("../db/db.js");
let datas ;
get_prodlist();



routes.get('/project',(req, res)=>{
    res.render('project.ejs')
})


routes.get("/getDatas", (req, res)=>{
    db.query("SELECT * FROM tasklist",(err, result)=>{
        if (err) throw err
        res.json(result);
    })
})


routes.get('/get_project_list',(req, res)=>{
    console.log('Page demander')
    res.json(get_prodlist()).end()
})





routes.get('/plan:id',(req, res)=>{
    
    let id = Number(req.params.id.slice(1,2));
    let datas = get_prodlist();
    let data = datas.find( item => item.id === id );
    let ref = data.ref_key;
    
    let query = `SELECT * FROM tasklist WHERE ref="${ref}"`;
    
    db.query(query, 
        (err, result)=>{
            if(err) throw err;
            data.service = result;
            console.log('Envoie des donner de la ta/le')
            res.json(data)
    });
});


routes.get('/project/plan:id',(req, res)=>{
    
    let id = Number(req.params.id.slice(1,2));
    let datas = get_prodlist();
    
    let data = datas
    .find( item => item.id === id );
    
    console.log(`: Page afficher`);
    res.render('plan', {data});

})





function get_prodlist (){
    
    db.query(`SELECT * FROM prodlist`,
        (err, result)=>{
        if(err) throw err;
        datas = result;
        
    })
    return datas;
    
    
};

get_prodlist()



module.exports = routes;



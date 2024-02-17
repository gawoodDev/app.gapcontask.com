const express =  require("express");
const routes = express.Router();
const Joi = require("joi");
const validation = require("../midelware/model.js");
const passport = require("passport")
const passportJWT = require("passport-jwt")
const jwt = require("jsonwebtoken")

const db = require("../db/db.js");
let datas = [];


const {AUTH, PROTECT_ROUTES} = require("../midelware/auth_midelware.js")


let Users = require("../db/users.json") || [
{
    user_id: "001A",
    email: "a@a.com",
    password: '$2a$10$oWDfskt9Iw773LcvPeR.aeGOp6H4Gntf2sexAPvGHLMmtuKMfCsTm',
    username: "Brolly"
},
{
    user_id: "002B",
    email: "b@b.com",
    password: "$2a$10$rlcqVhfD9L2F3nCR82mJfuOUzrPcJLLEMWIGMcQpSF3EuXikmo3MG",
    username: "Goku"
}];

/*
passport.use(
        new passportJWT.Strategy({
            jwtFromRequest : req.query.token,
            secretOrKey: "MY_SECRET"
            
            
        },
            function(payload, done){
                
               
                
            }
        ) 
        
);
*/;



routes.get("/auth", AUTH, (req, res) => {
    console.log("User has beeing authenticated...", req.session)
    
    let ref = req.cookies.referer
    if (ref == "http://localhost/loggin" ||  ref == "http://localhost/signup" || ref == "http://localhost/auth" || ref === undefined )
    {
        
        
        return res.status(200).redirect("/");
        
    }
        
    res.status(200).redirect("/");
})
    






routes.get("/", PROTECT_ROUTES, (req, res) => {
    
    
    console.log("Home page access")
    
    
    
    if (!req.session.user) return res.redirect("/auth")
    
    
    console.log(req.cookies.values, JSON.parse(req.cookies.values)[0] )

        
    res.render("index.ejs", {username: req.session.user.username })
        
    
    
    res.render("index.ejs", {username: req.session.user.username })
    
})
    




routes.get('/project', PROTECT_ROUTES,(req, res)=>{
    res.render('project.ejs');
})


routes.get('/plan:id',  (req, res)=>{
    
    
    
    let {user_id} = req.session.user;
    let id = Number(req.params.id.slice(1,2));
    
    
    db.query(`SELECT * FROM prodlist WHERE user_id="${user_id}"`,
        (err, result)=>{
        if(err) throw err;
        console.log(result, typeof result, typeof id, id)
        
        
        
        if(result.length > 1){
            
        }
        
        
        let data = result.find( item => Number(item.id) === Number(id) );
        
        console.log(data, "Doremi")
        let ref = data.ref_key;
        
        let query = `SELECT * FROM tasklist WHERE ref="${ref}" AND user_id="${user_id}"`;
        
        
        
        
        
        db.query(query, 
            (err, result)=>{
                if(err) throw err;
                data.service = result;
                console.log('Envoie des donner de la ta/le')
                res.json(data)
        });
    
    
            
    
    })
    
    
    
    
});





routes.get("/test", (req, res)=>{
    
    
    require("bcryptjs").hash("b", 10)
    .then((hash)=>{
      
        if(!hash) return res.status(401).json({msg: "Erreur serveur"})
      
        console.log(hash)
        
        res.json(hash)
        
    });
    
    
    
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



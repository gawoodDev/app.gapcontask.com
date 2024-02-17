const express = require("express");
const app = express();
const db = require("./db/db.js");
const Joi = require("joi");
const validation = require("./midelware/model.js");
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken")



const router = require("./routes/routes")
const taskRoutes = require('./routes/taskRoutes.js')
const projectRoutes = require('./routes/projectRoutes.js')
const authRoutes = require('./routes/authRoutes.js')


app.use(cookieParser())
app.use(express.urlencoded({
    extended: true
}));
app.use(express.json());
app.use(express.static('public'));
app.set("view engine", "ejs");
app.use(require("express-session")({
    secret: 'keyboard',
    resave: false,
    saveUninitialized: true,
    maxAge: 3 * 60 * 1000
}))




//app.use(PROTECT_ROUTES)
app.use(authRoutes);
app.use(router);
app.use(taskRoutes);
app.use(projectRoutes);








app.listen(8000,
    () => {
        console.log("Ist ok running at 8000")
    })
    
    
    
function PROTECT_ROUTES (req, res, next){
    
    let token = null;
    
    if(req.path === "/loggin" || req.path === "/signup"  || req.path === "/auth"   ){
        
        console.log("Cesroutes sont libre ", req.path)
        
        res.redirect()
        
        return
    }
    
    try {
        
        token = req.cookies.token 
        //console.log(req.cookies)
        
    } catch (e) {
        res.status(401).json({msg : "no cookie"})
    }
    
    
    
    
    
    if(token){
        
        jwt.verify(token, "MY_SECRET", (err, payload)=>{
            
            if (err) return res.status(401).redirect("/loggin");
            
            // console.log(err)
            
            next()
            
        })
    }else{
        res.status(403).redirect("/loggin")
            
    }
    
}


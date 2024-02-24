const express = require("express");
const app = express();
const db = require("./db/db.js");
const Joi = require("joi");
const validation = require("./midelware/model.js");
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken")
let passport = require("passport")


const router = require("./routes/routes")
const taskRoutes = require('./routes/taskRoutes.js')
const projectRoutes = require('./routes/projectRoutes.js')
const authRoutes = require('./routes/authRoutes.js')

const {addTask, updateTask, deleteTask} = require("./api/taskApi.js");

app.use(require("cors")())
app.use(cookieParser())
app.use(express.urlencoded({  extended: true }));
app.use(express.json());
app.use(express.static('public'));
app.set("view engine", "ejs");
app.use(require("express-session")({
    secret: 'keyboard',
    resave: false,
    saveUninitialized: true,
    maxAge: 3 * 60 * 1000
}))
app.use(passport.initialize())
app.use(passport.session());

app.get('/get',  (req, res)=>{
  let mode = req.headers['sec-fetch-mode'];
    if(mode === "cors"){
      console.log("Corsing...")
    }
    console.log("Testinng...", mode)
    res.status(200).json({mode: "social"})
});



app.use(authRoutes);

app.use(function(req, res, next){
  
    if(req.isAuthenticated() && (req.user || req.session.user) )
        {
       return  next()
    }
    
    res.redirect("/loggin");
    
})

app.use(router);
app.use(taskRoutes);
app.use(projectRoutes);

app.use(function(req, res, next){
    
    return next()
    
    if(!req.isAuthenticated() && !req.user) return  res.redirect("/loggin") 
    let c  = req.cookies.values ||  [];
    console.log(c)
    if(c.length < 1) return next()
    
    const cookies = JSON.parse(c);
    
    
    
 
    let {user_id} = req.session.user || req.user; 
    

    console.log("cookies ", cookies);
    
    for (let item of cookies){
        if (item.state === 1) {
            
            updateTask(item,user_id,function(error, success) {
                
                if(err) throw err
                
                console.log("is successfull updateTask")
                
            })
            
            
        }
        if (item.state === 2) {
            
            addTask(item, user_id,function(error, success) {
                
                if(err) throw err
                
                console.log("is successfull")
                
            })
            
        }
        
        if (item.state === 3) {
            
            deleteTask(item, user_id, function(err, success){
                if(err) throw err
                console.log("Delete avec success !")
            })
            
        }
    }
    
    
    next()
});




app.listen(8000, () => console.log("Ist ok running at 8000"));
    
    


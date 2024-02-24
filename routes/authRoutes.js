const express =  require("express");
const app = express.Router();

const {UNACCESS_LOGGIN_SIGNUP} = require("../midelware/auth_midelware.js")

const {FIND_USER_BY} = require("../api/authApi.js");

const {authenticate, loggin, signup} = require("../controllers/ctrlsAuth.js");


                
authenticate(
        (email)=>
    {
        console.log("Authentication by email")
        return FIND_USER_BY("email", email)
        
    },
        (id)=>
    {
        console.log("Authentication by id")
        return FIND_USER_BY("user_id", id)
    }
);



app.post("/loggin", loggin);
app.post("/signup", signup);

app.get("/loggin", UNACCESS_LOGGIN_SIGNUP,  onLoggin);
app.get("/signup", UNACCESS_LOGGIN_SIGNUP, onSignup);


function onLoggin (req, res, next){
  console.log("Loggin")
  
  
  res.cookie("referer", req.headers.referer)
  res.render("loggin")
  
}

function onSignup (req, res, next){
  console.log("SignUp")
  res.render("signup")
  
}





module.exports = app;

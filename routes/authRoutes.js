const express =  require("express");
const app = express.Router();
const {loggin, signup} = require("../controllers/ctrlsAuth.js");

const {VERIFY, UNACCESS_LOGGIN_SIGNUP} = require("../midelware/auth_midelware.js")



app.post("/loggin", loggin)
app.post("/signup", signup)

app.get("/loggin",UNACCESS_LOGGIN_SIGNUP, onLoggin)
app.get("/signup", UNACCESS_LOGGIN_SIGNUP, onSignup)


function onLoggin (req, res, next){
  console.log("Loggin")
  
  console.log(req.headers);
  res.cookie("referer", req.headers.referer)
  res.render("loggin")
  
}
function onSignup (req, res, next){
  console.log("SignUp")
  res.render("signup")
  
}





module.exports = app;

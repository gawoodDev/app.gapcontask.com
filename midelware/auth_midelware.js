const jwt = require("jsonwebtoken");


function UNACCESS_LOGGIN_SIGNUP (req, res, next){
    
    if(req.isAuthenticated()){
       return  res.redirect("/")
    }

    next()
    
}

function PROTECT_ROUTES(req, res, next){
    if(req.isAuthenticated() && (req.user || req.session.user) )
        {
            
       return  next()
    }
    
    res.redirect("/loggin")
}

function LOCKED_ROUTES(req, res, next){
    
    
    next()
}

function VERIFY(req, res, next){
    
    next()
}






module.exports = {
  VERIFY : VERIFY,
  UNACCESS_LOGGIN_SIGNUP : UNACCESS_LOGGIN_SIGNUP,
   PROTECT_ROUTES,
  LOCKED_ROUTES
}






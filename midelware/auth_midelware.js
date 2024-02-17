const jwt = require("jsonwebtoken");











function AUTH(req, res, next){
    
    let token = req.session.token;
    console.log("Authentification...")
    if(!token) {
        console.log("Pas de token")
        return res.status(403).redirect("/loggin");
            
    }
    //console.log(req.headers)
    
    
    VERIFY(token, (err, good, decoded)=>{
            
            if (err) {
                if (err.message === "jwt expired") {
                    req.session.token = null
                }
                console.log(err.message);
                
                return res.status(403).redirect("/loggin")
            }
            
            if (good) {
                next()
            }
    })
    
    
    
    
}



function PROTECT_ROUTES (req, res, next){
    
    if(!req.session.token || !req.session.user ) {
        
        return res.redirect("/loggin")
    } 
    
    
    let token = null;
    
    try {
        token = req.session.token || null
        console.log("prottect")
    } catch (e) {
        res.status(401).json({msg : "no cookie"})
    }
    
    if(!token){
        console.log("Veillez cree un token!");
        return res.status(403).redirect("/loggin")
    }
        
    VERIFY(token, (err, good, decoded)=>{
            
        if (err) {
            console.log(err.message);
            return res.status(403).redirect("/loggin")
        }
            
        if (good) {
            next()
        }
            
    });
    

    
    
}


const UNACCESS_LOGGIN_SIGNUP = function (req, res, next){
    
    

    
    if(!req.session.token) {
        console.log("no token")
        next();
    }else{
        return res.redirect("/auth")
    }
    
    
    
    
    
}


const LOCKED_ROUTES = function (req, res, next){
    
    
    
    if(req.session && req.session.user){
        
        res.redirect("/")
        
    }
    else{
        
        res.redirect("loggin")
    }
}


const VERIFY = function (token, done) {
    try{
        let playload = jwt.verify(token, "MY_SECRET");
        return done(null, true, playload)
    } catch(e){
        done(e,false, null)
    }
}


/*




function AUTH(req, res, next){
    
    
    
    next()
}

function UNACCESS_LOGGIN_SIGNUP(req, res, next){

    next()
    
}

function PROTECT_ROUTES(req, res, next){

    next()
}

function LOCKED_ROUTES(req, res, next){
    
    next()
}

function VERIFY(req, res, next){
    
    next()
}


*/



module.exports = {
  VERIFY : VERIFY,
  UNACCESS_LOGGIN_SIGNUP : UNACCESS_LOGGIN_SIGNUP,
  AUTH, PROTECT_ROUTES,
  LOCKED_ROUTES
}






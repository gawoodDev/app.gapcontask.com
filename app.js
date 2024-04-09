const express = require("express");
const app = express();
//const db = require("./db/db.js");
const Joi = require("joi");
const validation = require("./midelware/model.js");
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");
const passport = require("passport");
const routes = require("./routes/routes");
const taskRoutes = require('./routes/taskRoutes.js')
const projectRoutes = require('./routes/projectRoutes.js');
const authRoutes = require('./routes/authRoutes.js');
const userRoutes = require('./routes/userRoutes.js');
const adminRoutes = require('./routes/adminRoutes.js');

const { addTask, updateTask, deleteTask } = require("./api/taskApi.js");
const flash = require('express-flash-message').default;

const asyncError = require("express-async-handler");
const methodOverride = require('method-override')


//app.use(methodOverride('X-HTTP-Method-Override'));

app.use(methodOverride('_method'));

app.use(require("cors")())
app.use(cookieParser())
app.use(express.urlencoded({ extended: true }));

app.use(express.json());
app.use(express.static('public'));
app.set("view engine", "ejs");
app.use(require("express-session")({
   secret: 'keyboard',
   resave: false,
   saveUninitialized: true,
   maxAge: 3 * 60 * 1000
}))


app.use(
   flash({
      sessionKeyName: 'express-flash-message',
      // below are optional property you can pass in to track
      onAddFlash: (type, message) => { },
      onConsumeFlash: (type, messages) => { }
   })
);

app.use(passport.initialize())
app.use(passport.session());


// isAuthentication rootes
app.use(asyncError(authRoutes));




app.use("/app", PROTECTION,
   asyncError(routes));

app.use("/api", asyncError(taskRoutes));
app.use("/api", asyncError(projectRoutes));
app.use("/api", asyncError(userRoutes));
app.use("/admin", asyncError(adminRoutes));


app.get("/*", (req, res) => {
   let url = ["/login", "/signup", "profile"]
   // for(let )
   console.log(req.originalUrl)
   if (req.originalUrl == "/signup") {
      res.redirect("/app/signup")
   }

   res.redirect("/app")
})

app.use(function (err, res, req, next) {

   if (err) {

      let ErrorObject = {
         path: generatePathError(err), type: err.type, message: err.message
      }

      console.log(ErrorObject)

   }

})

app.listen(8080, () => console.log("Ist ok running at 8080"));


function generatePathError(err) {
   let string = ["/api", "/routes"];
   let arr = err.stack.split(" at ");
   let path = [];
   for (let str of string) {
      arr.forEach((item) => {
         if (item.includes(str)) {
            let index = item.indexOf(str);
            if (index) {
               path.push(item.slice(index).replace(`\n`, "").trim());
            }
         }
      })
   }
   return path;

}
function PROTECTION(req, res, next) {
   if (req.isAuthenticated() || req.user) {
      if (req.originalUrl == "/app/login" || req.originalUrl == "/app/signup") {
         res.redirect("/app")
      }
      else {
         return next()
      }
   } else {
      if (req.originalUrl == "/app/login" || req.originalUrl == "/app/signup") {
         return next()
      }
      else {
         res.redirect("/app/login")
      }
   }
}









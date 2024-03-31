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


// protect rootes
app.use(asyncError(function (req, res, next) {

   if (req.isAuthenticated() && (req.user || req.session.user)) {
      return next()
   }

   console.log(req.baseurl)

   res.redirect("/loggin");

}));

//


app.use(asyncError(routes));
app.use(asyncError(taskRoutes));
app.use(asyncError(projectRoutes));
app.use(asyncError(userRoutes));
app.use("/admin", asyncError(adminRoutes));



app.use(function (err, res, req, next) {

   if (err) {

      console.log(":::::::::::::", err)

   }

})



app.listen(8000, () => console.log("Ist ok running at 8000"));




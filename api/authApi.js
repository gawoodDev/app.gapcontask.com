const express = require("express");
const bcrypt = require("bcryptjs");
const passport = require("passport");
const localStrategy = require("passport-local").Strategy;
const handError = require("../controllers/errorHandling.js");

const db = require("../api/userApi.js");
const validation = require("../midelware/model.js");
const jwt = require("jsonwebtoken");





function HANDLER(code, message, res) {
   let _error = new handError({ code, message });
}

exports.REGISTER_NEW_USER = function (req, res, next) {



   console.log("New user")
   // return


   try {

      console.log("signup")

      let body = req.body;
      let {
         error
      } = validation(body).userValidationSignup;


      if (error) {
         res.flash("error", error.details[0].message);
         error.type = "Datas Validation Error"
         error.message = error.details[0].message;

         throw error
      };


      bcrypt.hash(body.password, 10)
         .then(async (hash) => {

            if (!hash) {
               let err = new Error("Impossible de hasher le mots de passe, server error, retry later!")
               err.type = "Hashing bcryptjs"
               err.message = err.message;
               throw err
            }

            delete body.password;

            body.user_id = Date.now() + body.username.slice(0, 2);

            let { err, success } = await db.addUser({ ...body, password: hash });

            if (err) throw err

            console.log("User registered succcefuly",)
            if (success) {
               res.status(202).json({
                  msg: "User created"
               })
            }

         })

      return { success: true };
   }
   catch (error) {
      error.type = error.type || "Server Error";
      res.status(401).json({
         msg: "Serveur failled"
      })
      console.log(error)

      throw error
   }

}



/*
exports.signup = async function (req, res) {
   try {

      console.log("signup")

      let body = req.body;
      let {
         error
      } = validation(body).userValidationSignup;


      if (error) {
         res.flash("error", error.details[0].message);
         error.type = "Datas Validation Error"
         error.message = error.details[0].message;

         throw error
      };


      bcrypt.hash(body.password, 10).then(async (hash) => {

         if (!hash) {
            let err = new Error("Impossible de hasher le mots de passe, server error, retry later!")
            err.type = "Hashing bcryptjs"
            err.message = err.message;
            throw err
         }

         delete body.password;

         body.user_id = Date.now() + body.username.slice(0, 2);

         let response = await db.addUser({ ...body, password: hash });

         if (response.err) throw response.err;

         console.log("User registered succcefuly", response)

      }).catch((err) => console.log(err))


      return { success: true };
   }
   catch (error) {
      error.type = error.type || "Server Error";
      console.log(error)

      throw error
   }
};

*/



exports.loggin = passport.authenticate("local",
   {
      successRedirect: "/app",
      failureRedirect: "/app/loggin",
      failureFlash: false
   });

exports.authenticate = async function (getUserByEmail, getUserById, errorHandle) {
   try {
      passport.use(new localStrategy({ usernameField: "email" },
         async function (email, password, done) {
            try {

               let user = await getUserByEmail(email);


               if (user === null || user.password === undefined) {
                  return done(new Error("No user with the email"), false, {
                     type: "Bad Datas Validation",
                     message: "No user with the email!"
                  });
               }


               if (await bcrypt.compare(password, user.password)) {

                  console.log(" Connection successful ", user.username);
                  return done(null, user);

               } else {

                  return done(new Error("Bcryptjs n'arrive pas a comfirmer votre mot de passe !"), false, { message: "Bcrypt.js n'arrive pas a comfirmer votre mot de passe !" });

               }


            } catch (e) {
               e.isFailled = true;
               e.type = "Validation Errors "
               console.log(e)
               return done(e)
            }

         }));


      passport.serializeUser((user,
         done) => {

         return done(null,
            user.user_id)
      });


      passport.deserializeUser(async (id,
         done) => {
         return done(null,
            await getUserById(id))
      });

   }
   catch (err) {
      err.type = "Authentication Failed!"
      console.log("Errrrr", err)
      throw err
   }

};






exports.onLoggin = function (req, res, next) {

   res.cookie("referer", req.headers.referer)
   res.status(200);
   res.render("loggin");

}

exports.onSignup = function (req, res, next) {

   res.render("signup");
}

exports.logout = function (req, res, next) {
   req.logOut(() => res.redirect("/app/loggin"));
}











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

exports.signup = async function (req, res) {
   try {

      console.log("signup")

      let body = req.body;
      let {
         error
      } = validation(body).userValidationSignup;


      if (error) {
         res.flash("error", error.details[0].message);
         res.redirect("/signup")
         throw error
      };


      bcrypt.hash(body.password, 10).then(async (hash) => {

         if (!hash) {
            throw HANDLER(401, "Veiller reesayer un autre mots de pass", res);
         }

         delete body.password;

         body.user_id = Date.now() + body.username.slice(0, 2);

         let { err, success } = db.addUser({ ...body, password: hash })

         if (err) throw err

         console.log("User registered succcefuly")

      }).catch((err) => console.log(err))


      return { success: true };
   }
   catch (error) {

      return console.log(error)

      // throw HANDLER(401, error.details[0].message, res)
   }




};



exports.loggin = passport.authenticate("local",
   {
      successRedirect: "/",
      failureRedirect: "/loggin",
      failureFlash: false
   });


exports.authenticate = async function (getUserByEmail, getUserById) {
   try {
      passport.use(new localStrategy({
         usernameField: "email"
      },
         async function (email, password, done) {
            try {

               let user = await getUserByEmail(email);


               if (user === null) return done(null, false, {
                  message: "No user with the email!"
               })

               if (await bcrypt.compare(password, user.password)) {

                  return done(null, user)

               } else {


                  return done(null, false, {
                     message: "Incorect password !"
                  })

               }


               console.log(" Connection successful ", user.username);

            } catch (e) {
               return done(e)
            }

         }))


      passport.serializeUser((user,
         done) => done(null,
            user.user_id));

      passport.deserializeUser(async (id,
         done) => {
         return done(null,
            await getUserById(id))
      })

   }
   catch (err) {
      console.log("Errrrr", err)
   }

};











const express = require("express");
const app = express.Router();

const api = require("../api/userApi.js")
const db = require("../api/userApi.js")
const validation = require("../midelware/model.js");
const bcrypt = require("bcryptjs");

const {
   UNACCESS_LOGGIN_SIGNUP
} = require("../midelware/auth_midelware.js")

const {
   authenticate,
   loggin, signup, REGISTER_NEW_USER
} = require("../api/authApi.js");



console.log("Errror")



try {
   authenticate(
      async (email) => await api.findBy({
         key: "email", value: email
      }),
      async (id) => await api.findBy({
         key: "user_id", value: id
      }),
      (err) => {

         if (err) {


         }
      }
   );
} catch (err) {

   console.log("Mon err", err)
}


app.post("/api/loggin", loggin, (req, res) => {

   console.log("A to get more followers and ", req)
   
   
   

   if (req.error) {
      console.log(req.err)
   }
   
   

});

app.post("/api/signup", REGISTER_NEW_USER)






/****
function REGISTER_NEW(req, res, next) {

   console.log("New user")
   return

   let body = req.body;
   let { error } = validation(body).userValidationSignup;

   if (error) {
      return res.status(401).json({ msg: error.details[0].message });
   }


   bcrypt.hash(body.password, 10)
      .then(async (hash) => {

         if (!hash) return res.status(401).json({ msg: "Erreur serveur" });

         console.log(hash)
         delete body.password;

         body.user_id = Date.now() + body.username.slice(0, 2);




         let response = await db.addUser({ ...body, password: hash });

         //console.log(response)

         if (response) {
            res.status(202).json({
               msg: "User created"
            })
            console.log("User registered succcefuly")
         }


      })
      .catch((err) => res.status(401).json({
         msg: "Serveur failled"
      }))

}
function REGISTER_NEW_USER(req, res, next) {



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





   let body = req.body;
   let { error } = validation(body).userValidationSignup;

   if (error) {
      return res.status(401).json({ msg: error.details[0].message });
   }


   bcrypt.hash(body.password, 10)
      .then(async (hash) => {

         if (!hash) return res.status(401).json({ msg: "Erreur serveur" });

         console.log(hash)
         delete body.password;

         body.user_id = Date.now() + body.username.slice(0, 2);




         let response = await db.addUser({ ...body, password: hash });

         //console.log(response)

         if (response) {
            res.status(202).json({
               msg: "User created"
            })
            console.log("User registered succcefuly")
         }


      })
      .catch((err) => res.status(401).json({
         msg: "Serveur failled"
      }))
   
***/









module.exports = app;
const express = require("express");
const routes = express.Router();
const upload = require("../function/multerUpload.js");
const db = require("../api/userApi.js");
const asyncError = require("express-async-handler");


routes.post("/updateuser", upload.single("photo"), asyncError(updateUserInfo));

routes.get("/removeuser", asyncError(removeUser));

async function removeUser(req, res, next) {

   console.log("Removing ")

   let user_id = req.user.user_id,
      sql = `DELETE FROM users WHERE user_id=?`;

   db.removeUser({
      user_id
   })
      .then((db) => {
         req.logOut(function () {
            require("../db/db-2.js").query(sql, [user_id])
               .then(() => res.redirect("/app/loggin"));
         });
      }).catch(err => {
         err.type = "SERVER ERRORS "
         throw err
      });
}

async function updateUserInfo(req, res) {
   let user_id = req.user.user_id, profil_path = null;
   if (req.file && req.file.path) {
      profil_path = req.file.path;
   }


   db.updateUser({ username: req.body.username, profil_path, user_id })
      .then((response) => {
         console.log("User update fully")
         return res.redirect("/profile");
      }).catch(err => {
         throw err
      });

};



module.exports = routes;



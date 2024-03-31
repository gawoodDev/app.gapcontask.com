const express = require("express");
const routes = express.Router();
const upload = require("../function/multerUpload.js");
const db = require("../api/userApi.js");










routes.post("/updateuser", upload.single("photo"), updateUserInfo);
routes.get("/removeuser", removeUser);




function removeUser(req, res, next) {
   let user_id = req.user.user_id,
      sql = `DELETE FROM users WHERE user_id=?`;

   db.removeUser({
      user_id
   })
      .then((db) => {
         req.logOut(function () {
            db.promise.query(sql, [user_id])
               .then(() => res.redirect("/loggin"));
         });
      }).catch(err => console.log);
}

function updateUserInfo(req, res) {
   let user_id = req.user.user_id, profil_path = null;
   if (req.file && req.file.path) {
      profil_path = req.file.path;
   }


   db.updateUser({ username: req.body.username, profil_path, user_id })
      .then((response) => {
         console.log("User update fully")
         return res.redirect("/profile");
      }).catch(err => console.log);

};



module.exports = routes;



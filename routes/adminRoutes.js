const express = require("express");
const routes = express.Router();

const db = require("../db/db-2.js");



routes.get("/", controller, (req, res) => {
   res.render("dashboard.ejs")

});//security, base);

let Issues = [
   {
      type: "Server Errors",
      message: "Fuck you!"
   },
   {
      type: "MySql Errors",
      message: "You have a girlfriend you?"
   },
   {
      type: "API Errors",
      message: "I will make you bleed."
   }
]


routes.get("/api/errors", (req, res) => {
   console.log("Getting Errors...")

   res.status(200).json(Issues)
});


routes.post("/", controller);


async function base(req, res) {

   res.status(200)
   res.render("dashboard.ejs")

}


async function security(req, res, next) {

   res.status(202)
   res.render("adminLoggin.ejs")

}


async function controller(req, res, next) {
   try {
      let { user_id } = req.user;

      let [userRole] = await db.execute('SELECT role FROM roles WHERE user_id=?', [user_id]);

      if (userRole.length > 0) {
         if (userRole[0].role === "user") {
            next()
         }
         if (userRole[0].role === "admin") {
            res.status(401)
            res.render("adminLoggin.ejs")
         }
      } else {
         res.redirect("/")

      }

      console.log(userRole)

   } catch (err) {
      console.log(err)
      res.redirect("/app/profile")
   }

}









module.exports = routes;




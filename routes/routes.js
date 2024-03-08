const express = require("express");
const routes = express.Router();
const Joi = require("joi");
const validation = require("../midelware/model.js");
const passport = require("passport")
const passportJWT = require("passport-jwt")
const jwt = require("jsonwebtoken")
const moment = require("moment")
//const db = require("../db/db.js");
let datas = [];


const { PROTECT_ROUTES, UNACCESS_LOGGIN_SIGNUP } = require("../midelware/auth_midelware.js")







routes.get("/", (req, res) => {
  console.log("Home page access")
  res.render("index.ejs", { username: req.user.username })

})





routes.get('/project', (req, res) => {
  res.render('project.ejs');
})


console.log(moment("2024-03-02T13:33:34.000Z", "YYYY-MM-DD HH:mm:ss:SSS").isValid());          

//.format("YYYY-MM-DD HH:mm:ss:SSSZ"))

console.log(moment().format("2024-03-02T13:33:34.000[Z]"))



/***

routes.get("/get", (req, res) => {
  res.render("loggin.ejs")
})

function go() {

  console.log(moment("2025-06-11 24:00:00.000"))
  console.log(moment("10-20-1990", "MM-DD-YYYY"))
  console.log(moment({ y: 2024, M: 0, d: 3, h: 12, m: 30, s: 40, ms: 100 }));
  console.log(moment.unix(15e8).utc())
  console.log(moment(2024, "YYYY"))
  console.log(moment().format("[Today] dddd D MMMM YYYY, HH:mm:ss"))
  console.log(moment().format("LTS"))
  let date = moment("2024-02-28")
  console.log(date.fromNow())
  console.log(moment("2000").from("2022"))
  console.log(moment("2005-06-12").toNow())
  console.log(moment("2005-06-12").diff(moment(), "years"))
  console.log(moment().toDate());
  console.log(moment().toISOString());
  console.log(moment().toObject());
  console.log(moment("2024-03-03", "YYYY-MM-DD").format("YYYY-MM-DD HH:mm:ss"))

}



go()


routes.get("/test", (req, res) => {
  res.render("composant/bottomAddTask_page.ejs")
  return

  require("bcryptjs").hash("b", 10)
    .then((hash) => {
      if (!hash) return res.status(401).json({ msg: "Erreur serveur" })

      console.log(hash)

      res.json(hash)
    });



})


routes.post("/data", (req, res) => {


  console.log(req.body)


});


***/






module.exports = routes;



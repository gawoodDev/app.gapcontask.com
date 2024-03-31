const express = require("express");
const routes = express.Router();

const db = require("../api/userApi.js");



routes.get("/", security, base)
routes.post("/", controller)


async function base(req, res) {

   res.status(200)
   res.render("dashboard.ejs")

}
async function security(req, res, next) {



   res.status(202)
   res.render("adminLoggin.ejs")



}
async function controller(req, res, next) {

   let { user_id } = req.user;

   db.execute('h')





}









module.exports = routes;




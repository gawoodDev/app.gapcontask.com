const express = require("express");
const routes = express.Router();


routes.get("/login", (req, res) => {
   console.log("log")
   res.render("loggin.ejs")
})
routes.get("/signup", (req, res) => {
   console.log("up")
   res.render("signup.ejs")
})
routes.get("/logout", (req, res) => {
   req.logOut(() => {
      console.log("Logout...")
      res.redirect("/app/login")
   })
})



routes.get('/get', (req, res) => {
   res.flash("err", "Sorry")
   res.status(200).render("try.ejs")
});

routes.post('/get', (req, res) => {
   let { text } = req.body;

   if (text.length < 8) {
      res.flash("err", "Veilliez inséré un texte de plus de 8 caractères.")
   } else {
      res.flash("success", "Ajouter avec success!")
   }

   res.status(200).redirect("/get")
});




routes.get("/", (req, res) => {
   req.user = req.user ? req.user : { username: "Math" };
   res.render("index.ejs", { username: req.user.username });
});

routes.get('/project', (req, res) => {
   res.render('project.ejs');
});

routes.get('/profile', async (req, res) => {

   try {

      let promise = require("../db/db-2.js")
      let [rows] = await promise.execute(`SELECT profil_path, username, email  FROM users WHERE
	user_id="${req.user.user_id}"`);

      let profil_path = rows[0].profil_path

      if (!profil_path || profil_path.length < 1) {
         profil_path = "../upload/photo.jpg"
      } else {

         profil_path = profil_path.replace("public", ".")

      }

      console.log("You are", profil_path);

      res.render('profile.ejs', {
         url: profil_path, username: rows[0].username,
         email: rows[0].email
      });
   }
   catch (err) {
      res.redirect("/")
      console.log(err)
      throw err
   }

});

routes.get('/project/plan:id', (req, res) => {
   let {
      user_id
   } = req.user;
   let id = req.params.id.replace(":",
      "");
      
   let ref_key = req.query.ref;


   res.render("plan.ejs", { id: id, ref_key, title: "Ok" });

});





module.exports = routes;
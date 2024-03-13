const express = require("express");
const routes = express.Router();



routes.get('/get', (req, res) => {
	let mode = req.headers['sec-fetch-mode'];
	if (mode === "cors") {
		console.log("Corsing...")
	}
	console.log("Testinng...", mode)
	res.status(200).json({ mode: "social" })
});





routes.get("/", (req, res) => {
	console.log("Home page access")
	res.render("index.ejs", { username: req.user.username })

})

routes.get('/project', (req, res) => {
	res.render('project.ejs');
})


routes.get('/project/plan:id', (req, res) => {
	let {
		user_id
	} = req.user;
	let id = req.params.id.replace(":",
		"");
	let ref_key = req.query.ref;


	res.render("plan.ejs", {id: id,ref_key,title: "Ok"});

})





module.exports = routes;
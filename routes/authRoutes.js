const express = require("express");
const app = express.Router();
const api = require("../api/userApi.js");

const {
	UNACCESS_LOGGIN_SIGNUP
} = require("../midelware/auth_midelware.js")




const {
	authenticate,
	loggin,
	signup
} = require("../api/authApi.js");







authenticate(
	async (email) => await api.findBy({
		key: "email", value: email
	}),
	async (id) => await api.findBy({
		key: "user_id", value: id
	})

);




app.get("/logout", logout);

app.post("/loggin", loggin);

app.post("/signup", signup);

app.get("/loggin", UNACCESS_LOGGIN_SIGNUP, onLoggin);
app.get("/signup", UNACCESS_LOGGIN_SIGNUP, onSignup);


function onLoggin(req, res, next) {

	res.cookie("referer", req.headers.referer)
	res.render("loggin");

}

function onSignup(req, res, next) {

	res.render("signup");
}



function logout(req, res) {
	req.logOut(() => res.redirect("/loggin"));
}








module.exports = app;
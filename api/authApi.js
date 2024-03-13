const express = require("express");
const bcrypt = require("bcryptjs");
const passport = require("passport");
const localStrategy = require("passport-local").Strategy;

const db = require("../api/userApi.js")
const validation = require("../midelware/model.js");
const jwt = require("jsonwebtoken");


exports.signup = function (req, res) {


	console.log("signup")
	let body = req.body;
	let {
		error
	} = validation(body).userValidationSignup;

	if (error) {
		return res.status(401).json(error.details[0].message)
	}


	bcrypt.hash(body.password, 10)
		.then(async (hash) => {

			if (!hash) return res.status(401).json({
				msg: "Erreur serveur"
			})

			console.log(hash)
			delete body.password;

			body.user_id = Date.now() + body.username.slice(0, 2);


			db.addUser({
				...body, password: hash
			}).then((response) => {

				console.log(response)

				if (response) {
					res.status(202).json({
						msg: "User created"
					})
					console.log("User registered succcefuly")
				}

			})

		})
		.catch((err) => res.status(401).json({
			msg: "Serveur failled"
		}))

}


exports.loggin = passport.authenticate("local",
	{
		successRedirect: "/",
		failureRedirect: "/loggin",
		failureFlash: false
	})



exports.authenticate = async function (getUserByEmail, getUserById) {

	passport.use(new localStrategy({
		usernameField: "email"
	},
		async function (email, password, done) {
			try {
				let user = await getUserByEmail(email);

				console.log(user);

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




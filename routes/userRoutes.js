const express = require("express");
const routes = express.Router();

const db = require("../api/userApi.js");



routes.post("/updateuserinfo", updateUserInfo)

routes.get("/removeuser", removeUser)


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
			})

		}).catch(err => console.log);
}

	function updateUserInfo(req, res) {
		let user_id = req.user.user_id


		db.updateUser(req.body)
			.then((response) => {
				return res.status(200).json(response)
			}).catch(err => console.log);

	}



	module.exports = routes;

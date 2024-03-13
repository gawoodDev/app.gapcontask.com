const promise = require("../db/db-2.js");
const {
	getRandom,
	generateID
} = require("../function/ids.js")

const {
	ADD_PROD
} = require("../api/prodApi.js")





async function removeUser({
	user_id, req
}) {

	let query = `DELETE FROM tasklist WHERE user_id=?`;
	let qry = `DELETE FROM prodlist WHERE user_id=?`;


	return promise.query(query, [user_id])
		.then((res) => {
			return promise.query(qry, [user_id])
				.then((res) => {
					return {
						promise, vi: true
					}
				})
		})
		.catch((err) => {
			console.log(err)
		})

}

async function addUser({
	username, password, email
}) {

	let sql = `INSERT INTO users (username, password, email, user_id) VALUES (?,?,?,?)`;

	let user_id = generateID("user_id", username);

	try {
		let [datas] = await promise.execute(sql, [username, password, email, user_id]);
		console.log(datas)

		if (datas.serverStatus === 2) {


			return ADD_PROD({
				title: "Bôite de récéption", user_id
			}).then(() => {

				console.log("PROJET PAR DEFAUT CREE AVEC SUCCESS")
				return true;
			})
				.catch((err) => {
					console.log(err)
					return false
				})

		}


	} catch (e) {
		console.log(e)
	}

}

async function findBy({
	key, value
}) {

	let sql = `SELECT * FROM users WHERE ${key}=?`;

	try {
		let [datas] = await promise.execute(sql, [value]);
		if (datas.length >= 1) {
			return datas[0];
		}

		return null

	} catch (e) {
		console.log(e)
	}

}




module.exports = {
	addUser: addUser,
	findBy: findBy,
	removeUser: removeUser
};


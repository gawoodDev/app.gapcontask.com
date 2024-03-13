const express = require("express");
const routes = express.Router();
const db = require("../db/db.js");
const validation = require("../midelware/model.js")

const {
	ADD_PROD,
	GET_ALL_USER_PROD,
	DELETE_PROD,
	GET_PROD_BY,
	GET_ALL_TASK_FROM,
	UPDATE_PROD
} = require("../api/prodApi.js");






routes.post(`/addProd`, (req, res) => {
	let {
		user_id
	} = req.user;
	let {
		title
	} = req.body;



	ADD_PROD({
		title, user_id
	})
		.then(({
			project_id
		}) => {
			res.status(200).json({
				project_id
			})
		}).catch((err) => console.log)

});


routes.post(`/modifProd`, (req, res) => {
	let {
		user_id
	} = req.user;
	let {
		id, title
	} = req.body;

	UPDATE_PROD({
		id,
		user_id,
		title
	})
		.then(
			(data) => {
				res.status(200).send("success")
			})
		.catch(err => console.log);


});

routes.post(`/deleteProd`, (req, res) => {
	let {
		user_id
	} = req.session.user || req.user;

	DELETE_PROD({
		id: req.body.id,
		user_id,
		ref_key: req.body.ref_key
	})
		.then(
			(data) => {
				res.status(200).send("success")
			})
		.catch(err => console.log);
})

routes.get('/get_project_list', async (req, res) => {

	try {
		let {
			user_id
		} = await req.user;
		let datas = await GET_ALL_USER_PROD({
			user_id
		});
		res.status(200).json(datas);
	}
	catch (e) {
		console.log(e)
	}

})


routes.get('/unique_prod_datas:id', (req, res) => {
	let {
		user_id
	} = req.user, id;

	id = req.params.id.replace(":",
		"");

	GET_ALL_TASK_FROM({ id, user_id }).then((datas) => res.status(200).json(datas))
		.catch(err => console.log)


});


module.exports = routes;





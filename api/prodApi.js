
const mysql = require("mysql2");

const db = mysql.createConnection({
	host: "localhost",
	user: "root",
	password: "root",
	database: "skyapper"
});




async function GET() {
	let datas = await db.promise().query("SELECT * FROM tasklist");

	return datas;

	console.log(datas)
}

/*

GET()

/
db.connect((err) => {
  if (err) throw err;
  console.log("Connection a la base de donnee reussit !")
});
*/



async function QR(title, ref_key, user_id, project_id) {

	let query = `INSERT INTO prodlist (title, ref_key , user_id, project_id) VALUES (?,?,?,?)`;

	let field = await db.promise().query(query, [title, ref_key, user_id, project_id]);
}



//QR("Bienvenu", "RVM_66", "001A", 465)

/**
 

const {
  2 ADD_PROD,
  GET_ALL_USER_PROD,
  DELETE_PROD,
  GET_PROD_BY,
  GET_ALL_TASK_FROM,
  UPDATE_PROD
} = require("../api/prodApi.js")
***/


function getRandom(min, max) {
	return Math.ceil(Math.random() * (max - min) + min);
}
function generateID() {
	let timeStamp = Date.now()
	return timeStamp.toString().slice(4, 13) + getRandom(0, 10000);
}
async function ADD_PROD({ title, ref_key, user_id }) {

	let query = `INSERT INTO prodlist (title, ref_key , user_id, project_id) VALUES (?,?,?,?)`;

	let project_id = generateID();

	let field = await db.promise().query(query, [title, ref_key, user_id, project_id]);


	return { project_id }

}
async function DELETE_PROD({ ref_key, user_id, id }) {

	let qryTask = `DELETE FROM tasklist WHERE user_id=? AND ref=?`;


	let query = `DELETE FROM prodlist WHERE user_id=? AND project_id=? OR id=?`;

	let fieldTask = await db.promise().query(qryTask, [user_id, ref_key]);

	let field = await db.promise().query(query, [user_id, id, id]);

	return { user_id }

}
async function UPDATE_PROD({ title, user_id, id }) {

	let query = `UPDATE prodlist SET title=? WHERE id="${id}" OR project_id="?"`;

	let field = await db.promise().query(query, [title, id, id]);

	return true

}
async function GET_ALL_TASK_FROM({ user_id, id }) {

	let qryProd = `SELECT * FROM prodlist WHERE user_id=? AND id=? OR project_id=? `;

	let prodItem = await db.promise().query(qryProd, [user_id, id, id]);

	let datas = prodItem[0][0];

	let ref_key = datas.ref_key;

	let query = `SELECT * FROM tasklist WHERE ref=?`;

	let taskList = await db.promise().query(query, [ref_key]);

	let tasks = taskList[0]

	datas.service = tasks;

	return datas;

}
async function GET_ALL_USER_PROD({ title, ref_key, user_id, project_id }) {

	let query = `SELECT * FROM prodlist WHERE user_id=?`;

	let datas = await db.promise().query(query, [user_id]);

	return [...datas[0]]

}















module.exports = { ADD_PROD, DELETE_PROD, UPDATE_PROD, GET_ALL_TASK_FROM, GET_ALL_USER_PROD }






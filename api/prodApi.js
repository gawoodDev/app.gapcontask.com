const db = require("../db/db-2.js")
const {
   getRandom,
   generateID
} = require("../function/ids.js")
let success = true;



async function ADD_PROD({
   title, user_id
}) {

   try {

      let query = `INSERT INTO prodlist (title, ref_key , user_id, project_id) VALUES (?,?,?,?)`;

      let ref_key = Date.now().toString().slice(5, 11) + '_' + title.slice(0, 3) + "_" + user_id;


      let project_id = generateID("project_id");

      let field = await db.query(query, [title, ref_key, user_id, project_id]);

      return {
         project_id
      }
   }
   catch (err) {

      return { err }
   }

}


async function DELETE_PROD({
   ref_key, user_id, id
}) {

   try {
      let qryTask = `DELETE FROM tasklist WHERE user_id=? AND ref=?`;

      let query = `DELETE FROM prodlist WHERE user_id=? AND project_id=? OR id=?`;

      let fieldTask = await db.query(qryTask, [user_id, ref_key]);

      let field = await db.query(query, [user_id, id, id]);

      return {
         user_id, success
      }
   }
   catch (err) {

      return { err }
   }

}


async function UPDATE_PROD({
   title, user_id, id
}) {
   try {
      let query = `UPDATE prodlist SET title=? WHERE id="${id}" OR project_id="?"`;

      let field = await db.query(query, [title, id, id]);

      return { success: true }
   }
   catch (err) {

      return { err }
   }
}


async function GET_ALL_TASK_FROM({
   user_id, id
}) {

   try {

      let qryProd = `SELECT * FROM prodlist WHERE user_id=? AND id=? OR project_id=? `;

      let [prodItem] = await db.query(qryProd, [user_id, id, id]);

      let rows = prodItem[0];


      let [taskList] = await db.query(`SELECT * FROM tasklist WHERE ref=?`, [rows.ref_key]);

      rows.service = taskList;
      console.log(rows);

      return { rows: rows, success }

   } catch (err) {
      console.log(err);
      return { err }
   }

}


async function GET_ALL_USER_PROD({
   user_id
}) {

   try {

      let query = `SELECT * FROM prodlist WHERE user_id=?`;

      let [rows] = await db.execute(query, [user_id]);

      return { rows }

   }
   catch (err) {
      return { err }
   }

}















module.exports = {
   ADD_PROD,
   DELETE_PROD,
   UPDATE_PROD,
   GET_ALL_TASK_FROM,
   GET_ALL_USER_PROD
}

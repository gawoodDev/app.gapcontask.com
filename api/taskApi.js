const db = require("../db/db.js");
let dbs = require("../db/db-2.js")
const validation = require("../midelware/model.js"),
   {
      getRandom,
      generateID
   } = require("../function/ids.js")
const success = true;
//console.log(generateID("001A"));

let by = [
   "user_id", "id", "ref", "echeance", "priority", "createdDate"
]


exports.addTask = async function (data, user_id) {

   try {

      let { err, value } = validation(data).schemaTask;

      if (err) {
         console.log(err.details[0].message);
         return { err }
      }

      let { title, body, isdone, ref } = value

      isdone = isdone === true ? 1 : 0;

      let task_id = generateID("task_id", user_id)

      console.log("Api data _________", task_id, value);

      let query = `INSERT INTO tasklist (title,body,isdone,ref,user_id, task_id) VALUES    ("${title}","${body}","${isdone}","${ref}", "${user_id}", "${task_id}")`;

      let rows = await dbs.execute(query);

      return {
         task_id
      }

   }
   catch (err) {

      return { err }
   }
}



exports.REMOVE_SELECTED = async function (content, user_id) {

   try {

      let { data } = content;

      for (let id in data) {
         let query = `DELErTE FROM tasklist WHERE task_id=? AND user_id=?`;

         console.log("La tache " + id + " a ete supprimer  avec succes !")

         if ((data.length - 1)) {
            console.log("End______")
            return { success: true };

            break
         }



         //let rows = await dbs.execute(query, [data[id], user_id]);

      }

   } catch (err) {
      console.log("_-++---____", err)
      return { err }
   }

}



exports.deleteTask = async function (data, user_id) {

   try {

      let query = `DELETE FROM tasklist WHERE   user_id="${user_id}" AND task_id="${data.id}" OR id="${data.id}"`;

      let rows = await dbs.execute(query);

      return { success };
   }
   catch (err) {

      return { err }
   }
}



exports.updateTask = async function (data, user_id) {

   console.log("Its work! UPDATED ...");
   try {
      let {
         id, title, body, isdone, ref, finish_at
      } = data;

      isdone = isdone === true ? 1 : 0;


      let query = `UPDATE tasklist SET title="${title}",  body="${body}", finish_at="${finish_at}",  ref='${ref}', isdone='${isdone}'  WHERE id='${id}' AND  user_id="${user_id}"`;

      let rows = await dbs.execute(query);


      return { success: true }

   } catch (err) {

      return {
         err
      }
   }


}



exports.getAllTask = async function (data, user_id) {

   try {
      let [rows] = await dbs.execute(`SELECT * FROM tasklist WHERE user_id="${user_id}"`)

      console.log("Select all task from db")

      return { rows, success: true };
   }
   catch (err) {
      console.log(err)
      return { err }
   }
}



exports.doneTask = async function (data, user_id) {
   try {
      let {
         id, isdone
      } = data;
      isdone = isdone === true ? 1 : 0;

      let query = `UPDAT tasklist SET isdone=?  WHERE user_id=?  AND task_id=? `;

      await dbs.execute(query, [isdone, user_id, id]);

      console.log("Achevement de la tache done ")

      return { success };
   }
   catch (err) {
      console.log(err)
      return { err }
   }

}











//(type, user_id, key) user_id => []
//(type, user_id, key) ref => []
//(type, user_id, key) priority => []
//(type, user_id, key) echeance => []

//(type, user_id, key) id => {}


const getTaskBy = async function ({
   type,
   user_id,
   key
}) {

   try {

      let query;

      if (!type && !key) return done("No key", false, null);


      query = `SELECT * FROM tasklist WHERE user_id="${user_id}" AND ${type}="${key}"`;


      let [rows] = await dbs.execute(query);


      console.log("Select all task from db");
      return { rows, success };
   }

   catch (err) {
      console.log(err)
      return { err }
   }

}




exports.getTaskBy = getTaskBy;




/*
getTaskBy({type: "ref", user_id: "001A", key: "0B_"}, (err, success, datas)=>{
  if (err) throw err;
   console.log(datas);
   
*/
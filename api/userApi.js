const promise = require("../db/db-2.js");
const { getRandom, generateID } = require("../function/ids.js");

const { ADD_PROD } = require("../api/prodApi.js");



async function removeUser({ user_id, req }) {
   try {
      let query = `DELETE FROM tasklist WHERE user_id=?`;
      let qry = `DELETE FROM prodlist WHERE user_id=?`;


      await promise.query(query, [user_id])
         .then(() => {

            return promise.query(qry, [user_id])

         }).catch((err) => {

            err.type = "MySql Error";
            err.message = err.message || err.sqlMessage;
            return { err }
         })
   } catch (err) {
      console.log(err)
      err.type = "MySql Error"
      err.message = err.message || err.sqlMessage;

      return { err }
   }
}



async function addUser({ username, password, email }) {

   try {

      let sql = ` INSERT INTO users (username, password, email, user_id) VALUES(?,?,?,?)        `;

      let user_id = generateID("user_id", username);

      try {
         let [datas] = await promise.execute(sql, [username, password, email, user_id]);

      if (datas.serverStatus === 2) {

         return await ADD_PROD({
            title: "Boite de récéption", user_id
         }).then((project_id) => {
            console.log(project_id)
            return project_id
         })

         return { success: true, err: undefined }
      }
      
      } catch (error) {
         error.type = "MySql Error";
         error.message = error.message || error.sqlMessage;
         return { error }
      }

   }
   catch (err) {
      console.log(err);
      err.type = "MySql Error";
      err.message = err.message || err.sqlMessage;
      return { err }
   }

}



async function findBy({ key, value }) {

   try {

      let sql = `SELECT * FROM 
         users WHERE ${key}=?`

      let [datas] = await promise.execute(sql, [value]);

      console.log(datas)

      if (datas.length >= 1) {
         //delete datas[0].password
         return datas[0];
      }
      return []

   } catch (err) {
      console.log(err)
      err.type = "MySql Error";
      err.message = err.message || err.sqlMessage;
      return false
   }

};



async function updateUser({ username, profil_path, user_id }) {

   try {

      let sql = `UPDATE users SET username=?,
         profil_path=? WHERE user_id=?`


      let [datas] = await promise.execute(sql, [username, profil_path, user_id]);

      return { success: true }

   } catch (err) {
      console.log(err)
      err.type = "MySql Error"
      err.message = err.message || err.sqlMessage;
      return { err }
   }


};




module.exports = {
   addUser: addUser,
   findBy: findBy,
   removeUser: removeUser,
   updateUser: updateUser
};








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

   try {

      let query = `DELETE FROM tasklist WHERE user_id=?`;
      let qry = `DELETE FROM prodlist WHERE user_id=?`;


      await promise.query(query, [user_id])
         .then((res) => {
            return promise.query(qry, [user_id])
               .then((res) => {
                  return {
                     promise, vi: true
                  }
               })
         })

      return {
         success: true
      }

   }
   catch (err) {
      return { err }
   }

}

async function addUser({
   username, password, email
}) {

   try {

      let sql = `INSERT INTO users (username, password, email, user_id) VALUES (?,?,?,?)`;

      let user_id = generateID("user_id", username);

      let [datas] = await promise.execute(sql, [username, password, email, user_id]);

      console.log(datas)

      if (datas.serverStatus === 2) {

         await ADD_PROD({
            title: "Bôite de récéption", user_id
         });

      }

   } catch (e) {
      console.log(e)
   }

}

async function findBy({
   key, value
}) {

   try {

      let sql = `SELECT * FROM users WHERE ${key}=?`;

      let [datas] = await promise.execute(sql, [value]);
      if (datas.length >= 1) {
         return datas[0];
      }

      return true

   } catch (e) {
      console.log(e)
      return false
   }

}


async function updateUser({ username, profil_path, user_id }) {

   try {

      console.log(username, profil_path, user_id)

      let sql = `UPDATE users SET username="${username}",
	      profil_path="${profil_path}" WHERE user_id="${user_id}"`

      if (profil_path === null) {
         sql = `UPDATE users SET username="${username}" WHERE user_id="${user_id}"`;
      }



      let [datas] = await promise.execute(sql);

      return { success: true };

   } catch (err) {
      console.log(err)

      return { err }
   }


}

module.exports = {
   addUser: addUser,
   findBy: findBy,
   removeUser: removeUser,
   updateUser: updateUser
};


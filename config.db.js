let mysql = require("mysql2");
let bcrypt = require("bcryptjs");
const func = require("./function/ids.js");

const db = {
   database: "gapcontask",
   host: "localhost",
   user: "root",
   password: "root"
}

const admin = {
   email: "root@gmail.com",
   password: "root",
   username: "admin"
}

try {

   async function main() {

      let connect = mysql.createConnection({
         host: "localhost",
         user: "root"
      });

      let con = connect.promise();


      await con.connect(function (err) {
         if (err) throw err
         console.log("The connection is etablished!")
      });



      await con.query("CREATE DATABASE gapcontask").then(() => {
         console.log(" 0 : La base de donnée gapcontask a bien été créé avec succès!")
      });

      con.end()

      return true
   }


   async function QUERY() {

      let connect = mysql.createConnection({ ...db });

      let con = connect.promise();

      await con.connect(function (err) {
         if (err) throw err
         console.log("The connection is etablished!")
      });

      await con.query("CREATE TABLE users ( id INT AUTO_INCREMENT NOT NULL ,email  VARCHAR(200) UNIQUE, password VARCHAR(250), username VARCHAR(100), user_id VARCHAR(50),profil_path VARCHAR(250), registered_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP(), PRIMARY KEY(id)) ").then(() => {
         console.log("1 : La table USERS a bien été créé avec succès!  ")
      });



      await con.execute("CREATE TABLE tasklist (id INT AUTO_INCREMENT NOT NULL,  user_id VARCHAR(50) , task_id  VARCHAR(50) UNIQUE , title VARCHAR(150) , body VARCHAR(250), isdone INT(1),  created_at DATETIME DEFAULT CURRENT_TIMESTAMP, finished_at DATETIME DEFAULT CURRENT_TIMESTAMP, ref VARCHAR(59), PRIMARY KEY(id))").then(() => { console.log(" 2 : La table TASKLIST (Contient la liste des tâches) a bien été créé avec succès!   ") });


      await con.execute("CREATE TABLE projectlist (id INT AUTO_INCREMENT NOT NULL, user_id VARCHAR(50) , project_id  VARCHAR(50) UNIQUE , title VARCHAR(150) , created_at DATETIME DEFAULT CURRENT_TIMESTAMP, finished_at DATETIME DEFAULT CURRENT_TIMESTAMP, ref_key VARCHAR(60), PRIMARY KEY(id))").then(() => { console.log(" 3 : La table TASKLIST (Contient la liste des tâches) a bien été créé avec succès! ") });

      ADMIN_INIT(con)

      return true;


   }

   async function ADMIN_INIT(con) {
      const { ADD_PROD } = require("./api/prodApi.js");

      let user_id = func.generateID("user_id", admin.username);
      try {

         let sql = `INSERT INTO users (username, password, email, user_id) VALUES (?,?,?,?)`;


         let password = await bcrypt.hash(admin.password, 10);




         let [rows] = await con.execute(sql, ["Admin", password, "root@gmail.com", user_id])



      } catch (e) {
         throw e
      }



      try {

         let query = `INSERT INTO projectlist (title, ref_key , user_id, project_id) VALUES (?,?,?,?)`;

         let title = "Boîte de réception "

         let ref_key = Date.now().toString().slice(5, 11) + '_' + title.slice(0, 3) + "_" + user_id;


         let project_id = func.generateID("project_id");

         let field = await con.query(query, [title, ref_key, user_id, project_id])
            .then(() => {
               console.log(" 5 : Le project par défaut été créé avec succès!")
               con.end();
            })



      }
      catch (err) {

         throw err
      }



   }



   main().then(() => {
      QUERY().then(() => {
         console.error("  4 : La basse de donnée est configuré !", "Lancé `npm run dev` pour démarrer l'application !")

      });

   }).catch((err) => { throw err });


}
catch (err) {
   console.log(err)
}


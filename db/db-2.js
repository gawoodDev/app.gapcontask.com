const mysql = require("mysql2");

const db = mysql.createConnection({
	host: "localhost",
	user: "root",
	password: "root",
	database: "gapcontask"
});

db.connect((err) => {
   if (err) throw err;
   console.log("Connection a la base de donnee reussit !")
});


module.exports = db.promise()













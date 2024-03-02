const db = require("../db/db.js");
const validation = require("../midelware/model.js");


exports.addTask = function (data, user_id, done) {

    let {
        err,
        value
    } = validation(data).schemaTask;

    if (err) {
        console.log(err.details[0].message);
        done(err, false)
    }

    let {
        title,
        body,
        isdone,
        ref
    } = value


    console.log("Api data _________");



    let query = `INSERT INTO tasklist (title,body,isdone,ref,user_id) VALUES ("${title}","${body}","${isdone}","${ref}", "${user_id}")`;

    db.query(query, (err) => {
        if (err) return done(err, false)

        console.log("Ajouter a la base de donnee avec succes !")
        
        
        
        done(null, true)

    });


}




exports.deleteTask = function (data, user_id, done) {

    id = Number(data.id);

    let query = `DELETE FROM tasklist WHERE id=${id} AND user_id="${user_id}"`;

    console.log("supprimer  avec succes !")




    db.query(query,
        (err) => {
            if (err) return done(err, false)
            return done(null, true)
            console.log("La tache " + id + " a ete supprimer  avec succes !")
        })

}



exports.updateTask = function (data, user_id, done) {

    let {
        id, title, body, isdone, ref
    } = data;
    isdone = isdone === true ? 1: 0;


    let query = `UPDATE tasklist SET title="${title}",  body="${body}",  ref='${ref}', isdone='${isdone}'  WHERE id='${id}' AND  user_id="${user_id}"`;

    db.query(query,
        (err) => {
            if (err) throw err;
            console.log("Its work! UPDATED ...");
        })

}



exports.getAllTask = function (data, user_id, done) {
    console.log("Select all task from db")

    db.query(`SELECT * FROM tasklist WHERE user_id="${user_id}"`,
        (err, result) => {
            if (err) done(err, false)
            done(null, true, result);
        })


}

let by = [
    "user_id", "id", "ref", "echeance", "priority", "createdDate"
]

//(type, user_id, key) user_id => []
//(type, user_id, key) ref => []
//(type, user_id, key) priority => []
//(type, user_id, key) echeance => []

//(type, user_id, key) id => {}


const getTaskBy = function ( {
    type,
    user_id,
    key
}, done) {

    console.log("Select all task from db",
        user_id)

    let query;

    if (!type && !key) return done("No key", false, null);


    query = `SELECT * FROM tasklist WHERE user_id="${user_id}" AND ${type}="${key}"`;


    db.query(query,
        (err, result) => {
            if (err) done(err, false)
            return done(null, true, result);
        })
}


exports.getTaskBy = getTaskBy;




/*
getTaskBy({type: "ref", user_id: "001A", key: "0B_"}, (err, success, datas)=>{
  if (err) throw err;
   console.log(datas);
})
*/
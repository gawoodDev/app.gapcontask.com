const db = require("../db/db.js");
const validation = require("../midelware/model.js");

function getRandom(min, max){
    return Math.ceil(Math.random() * (max - min ) + min);
}



function generateID (user_id){
    let timeStamp = Date.now()
    return timeStamp.toString().slice(4, 13) + `_${user_id}_` + getRandom(0, 1000);
}

//console.log(generateID("001A"));


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

    isdone = isdone === true ? 1: 0;
    
    
    let task_id = generateID(user_id)


    console.log("Api data _________", task_id, value);



    let query = `INSERT INTO tasklist (title,body,isdone,ref,user_id, task_id) VALUES    ("${title}","${body}","${isdone}","${ref}", "${user_id}", "${task_id}")`;

    db.query(query, (err) => {
        if (err) return done(err, false)

        console.log("Ajouter a la base de donnee avec succes pour revues ...!")

        done(null, true, task_id);

    });


}




exports.deleteTask = function (data, user_id, done) {
    
    let id = Number(data.id);


    let query = `DELETE FROM tasklist WHERE id=${id} AND user_id="${user_id}"`;


    if(isNaN(id)){
        query = `DELETE FROM tasklist WHERE task_id="${data.id}" AND user_id="${user_id}"`;
    }

    

    db.query(query,
        (err) => {
            if (err) return done(err, false)
            return done(null, true)
            console.log("La tache " + id + " a ete supprimer  avec succes !")
        })

}



exports.updateTask = function (data, user_id, done) {

    let {
        id, title, body, isdone, ref, finish_at
    } = data;

    isdone = isdone === true ? 1: 0;


    let query = `UPDATE tasklist SET title="${title}",  body="${body}", finish_at="${finish_at}",  ref='${ref}', isdone='${isdone}'  WHERE id='${id}' AND  user_id="${user_id}"`;

    db.query(query,
        (err) => {
            if (err) return done(err, false);
            console.log("Its work! UPDATED ...", finish_at);
            done(null, true);
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


exports.doneTask = function (data, user_id, done) {

    let {
        id, isdone
    } = data;
    isdone = isdone === true ? 1: 0;

    let query = `UPDATE tasklist SET isdone='${isdone}'  WHERE id='${id}' AND  user_id="${user_id}"`;

    db.query(query,
        (err) => {
            if (err) done(err, false)
            console.log("Its again working Done " + id + "! UPDATED ...");
            done(null, true)
        })


}



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
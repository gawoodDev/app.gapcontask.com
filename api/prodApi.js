const db = require("../db/db-2.js")
const {
    getRandom,
    generateID
} = require("../function/ids.js")




async function ADD_PROD( {
    title, user_id
}) {

    let query = `INSERT INTO prodlist (title, ref_key , user_id, project_id) VALUES (?,?,?,?)`;

    let ref_key = Date.now().toString().slice(5, 11) + '_' + title.slice(0, 3) + "_" + user_id;


    let project_id = generateID("project_id");

    let field = await db.query(query, [title, ref_key, user_id, project_id]);

    return {
        project_id
    }

}


async function DELETE_PROD( {
    ref_key, user_id, id
}) {

    let qryTask = `DELETE FROM tasklist WHERE user_id=? AND ref=?`;
    try {


        let query = `DELETE FROM prodlist WHERE user_id=? AND project_id=? OR id=?`;

        let fieldTask = await db.query(qryTask, [user_id, ref_key]);

        let field = await db.query(query, [user_id, id, id]);

        return {
            user_id
        }
    } catch (e) {}

}


async function UPDATE_PROD( {
    title, user_id, id
}) {

    let query = `UPDATE prodlist SET title=? WHERE id="${id}" OR project_id="?"`;

    let field = await db.query(query, [title, id, id]);

    return true

}
async function GET_ALL_TASK_FROM( {
    user_id, id
}) {

    let qryProd = `SELECT * FROM prodlist WHERE user_id=? AND id=? OR project_id=? `;

    let prodItem = await db.query(qryProd, [user_id, id, id]);

    let datas = prodItem[0][0];


    let ref_key = datas.ref_key;

    let query = `SELECT * FROM tasklist WHERE ref=?`;

    let taskList = await db.query(query, [ref_key]);
    let tasks = taskList[0]

    datas.service = tasks;

    return datas;

}
async function GET_ALL_USER_PROD( {
    user_id
}) {

    let query = `SELECT * FROM prodlist WHERE user_id=?`;

    let [datas] = await db.query(query, [user_id]);


    return datas

}















module.exports = {
    ADD_PROD,
    DELETE_PROD,
    UPDATE_PROD,
    GET_ALL_TASK_FROM,
    GET_ALL_USER_PROD
}

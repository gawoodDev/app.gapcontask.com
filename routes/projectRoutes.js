const express = require("express");
const routes = express.Router();
const db = require("../db/db.js");
const validation = require("../midelware/model.js");



routes.post(`/addProd`, (req, res) => {
    let {
        id, title
    } = req.body;
    let ref_key = id + title.slice(0, 1) + "_";

    console.log(`Recus addProd`, req.body, ref_key)
    let query = `INSERT INTO prodlist (title, ref_key) VALUES ("${title}", "${ref_key}")`;
    db.query(query, (err) => {
        if (err) throw err;
        console.log("Projet ajouter avec success!")
    })

    res.status(200).send("success");
});




routes.post(`/modifProd`, (req, res) => {
    let {
        id
    } = req.body;
    console.log(`Recus modifProd `)
});

routes.post(`/deleteProd`, (req, res) => {
    let {
        id
    } = req.body;
    let query = `DELETE FROM prodlist WHERE id="${id}"`;
    db.query(query,
        (err) => {
            if (err) throw err;
            console.log("Projet supprimer avec success!")
        })
    console.log(`Recus deleteProd`)
});



module.exports = routes;
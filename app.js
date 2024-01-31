const express = require("express");
const app = express();
const db = require("./db/db.js");
const Joi = require("joi");
const validation = require("./midelware/model.js");


const router = require("./routes/routes")


app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(express.static('public'));
app.set("view engine", "ejs");



app.use(router);

app.get("/",(req, res)=>{
    res.render("index.ejs")
})

app.get("/getDatas", (req, res)=>{
    
    db.query("SELECT * FROM tasklist",(err, result)=>{
        if (err) throw err
        res.json(result);
    })
})






app.listen(8000, ()=>{
    console.log("Ist ok running at 8000")
})



































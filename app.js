const express = require("express");
const app = express();
const mysql = require("mysql");

app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(express.static('public'));
app.set("view engine", "ejs");

const db = mysql.createConnection({
    host: "localhost",
    user : "root",
    password: "root",
    database : "skyapper"
})



db.connect((err)=> {
    if (err) throw err; 
    //console.log("Connection a la base de donne reussit!");
});







app.get("/",(req, res)=>{
    res.render("index.ejs")
})

app.get("/getDatas", (req, res)=>{
    
    db.query("SELECT * FROM tasklist",(err, result)=>{
        if (err) throw err
        res.json(result);
    })
})




app.post("/addTask",(req, res)=>{
    console.log(req.body)
})





app.listen(8000, ()=>{
    console.log("Ist ok running at 8000")
})



































const express = require("express");
const app = express();
//const db = require("./db/db.js");
const Joi = require("joi");
const validation = require("./midelware/model.js");
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");
let passport = require("passport");


const routes = require("./routes/routes");
const taskRoutes = require('./routes/taskRoutes.js')
const projectRoutes = require('./routes/projectRoutes.js');
const authRoutes = require('./routes/authRoutes.js');
const userRoutes = require('./routes/userRoutes.js');





const { addTask, updateTask, deleteTask } = require("./api/taskApi.js");

app.use(require("cors")())
app.use(cookieParser())
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));
app.set("view engine", "ejs");
app.use(require("express-session")({
	secret: 'keyboard',
	resave: false,
	saveUninitialized: true,
	maxAge: 3 * 60 * 1000
}))





app.use(passport.initialize())
app.use(passport.session());



app.use(authRoutes);
app.use(function (req, res, next) {

	if (req.isAuthenticated() && (req.user || req.session.user)) {
		return next()
	}

	res.redirect("/loggin");

})

app.use(routes);
app.use(taskRoutes);
app.use(projectRoutes);
app.use(authRoutes);
app.use(userRoutes);

app.listen(8000, () => console.log("Ist ok running at 8000"));




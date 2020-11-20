const dotenv = require("dotenv");
dotenv.config();

const express = require("express");
const path = require("path");
const logger = require("morgan");
const bodyParser = require("body-parser");
const session = require("express-session");

const app = express();

//configure express
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname,'public')));

// body parser middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//Configure Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

// configuring morgan
app.use(logger("dev"));

// setting up template engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// routing
// const defaultRoutes = require("./routes/")

app.get("/", ( req, res) => {
    res.send("Hello World!!!")
})

// Error handling
app.use(( req, res, next) => {
    let pagetitle = "Error";
    res.render("error_page", {pagetitle})
})


app.listen(process.env.PORT, process.env.HOSTNAME, () => {
    console.log(`Server on http://${process.env.HOSTNAME}:${process.env.PORT}`)
});
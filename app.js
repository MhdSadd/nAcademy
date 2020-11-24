const dotenv = require("dotenv");
dotenv.config();

require("./misc/database");
const {globalVariable} = require("./config/default");

const express = require("express");
const path = require("path");
const logger = require("morgan");
const flash = require("connect-flash");
const passport = require("passport");
require("./config/passport")(passport);
const bodyParser = require("body-parser");
const session = require("express-session");


const app = express();

// body parser middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname,'public')));

//Configure Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

// configuring morgan
app.use(logger("dev"));

// SET UP EXPRESS_SESSION MIDDLEWARE
app.use(
    session({
        secret: `${process.env.NODE_SESSION}`,
        resave: true,
        saveUninitialized: true,
        cookie: { secure: true}
    })
);

//initiallize passport
app.use(passport.initialize());
app.use(passport.session());

//connect flash
app.use(flash());

// Global variables
app.use(globalVariable) 

// setting up template engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');


// routing
const defaultRoutes = require("./routes/default/defaultRoutes");
const auth = require("./routes/auth/authRoutes");
const admin = require("./routes/admin/adminRoutes");
const users = require("./routes/users/usersRoutes");

// routes
app.use("/", defaultRoutes);
app.use("/auth", auth);
app.use("/admin", admin);
app.use("/user", users);


// Error handling
app.use(( req, res, next) => {
    let pagetitle = "Error";
    res.render("error_page", {pagetitle})
})


app.listen(process.env.PORT, process.env.HOSTNAME, () => {
    console.log(`Server on http://${process.env.HOSTNAME}:${process.env.PORT}`)
});
const dotenv = require("dotenv");
dotenv.config();


const express = require("express");
const cookieParser = require('cookie-parser')
const methodOverride = require("method-override");
const app = express();
const path = require("path");
const logger = require("morgan");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const session = require("express-session");
const MongoStore = require('connect-mongo')(session);
const flash = require("connect-flash");
const passport = require("passport");
require("./config/passport")(passport);
const {globalVariable} = require("./config/configurations");
const mongoose = require("mongoose");
const MONGO_URI = require('./config/dev').MONGO_URI


// connect DB
   // DATABASE CONNECTION
   mongoose.connect(MONGO_URI, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
})
.then((res) => {
    console.log(`Database Connected at MongoURI...`)
})
.catch((err) => {
    console.log(`Database connection failed ${err}`)
})

// morgan init
app.use(logger('dev'))
app.use(cookieParser())
app.use(methodOverride('_method'))


// Connecting to static files
app.use(express.static(path.join(__dirname,'public')));

// setting up template engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

//Configure Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));



// SET UP EXPRESS_SESSION MIDDLEWARE
app.use(
    session({
        secret: `${process.env.NODE_SESSION}`,
        resave: true,
        saveUninitialized: true,
        cookie: { secure: false, maxAge: Date.now() + 3600000},
        store: new MongoStore({
            mongooseConnection: mongoose.connection,
            ttl: 14 * 24 * 60 * 60 // = 14 days. Default
            })
    })
);

//initiallize passport
app.use(passport.initialize());
app.use(passport.session());

//connect flash
app.use(flash());

// Global variables
app.use(globalVariable) 



// routing
const defaultRoutes = require("./routes/default/default");
const auth = require("./routes/auth/auth");
const coursesRoutes = require("./routes/courses/course");
const admin = require("./routes/admin/admin");
const instructors = require("./routes/instructors/instructor");
const { ensureAuthenticated } = require("./config/auth");

// routes
app.use("/", defaultRoutes);
app.use("/auth", auth);
app.use("/courses", coursesRoutes)
app.use("/admin", admin);
app.use("/instructor", ensureAuthenticated, instructors);


// Error handling
app.use(( req, res, next) => {
    let pagetitle = "Error";
    res.render("error_page", {pagetitle})
})


app.listen(process.env.PORT, process.env.HOSTNAME, () => {
    console.log(`Server on http://localhost:${process.env.PORT}`)
});
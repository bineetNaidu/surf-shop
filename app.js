require("dotenv").config();

const createError = require("http-errors");
const express = require("express");
const engine = require("ejs-mate");
const path = require("path");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const logger = require("morgan");
const passport = require("passport");
const passportLocal = require("passport-local");
const User = require("./models/user");
const session = require("express-session");
const mongoose = require("mongoose");
const methodOverride = require("method-override");

// conectin
mongoose
    .connect("mongodb://localhost:27017/surf-shop", {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => console.log("Connected to DB"))
    .catch((err) => console.log(err));

// requering routes
const indexRouter = require("./routes/index");
const postsRouter = require("./routes/posts");
const reviewsRouter = require("./routes/reviews");

const app = express();

// use ejs-locals for all ejs templates:
app.engine("ejs", engine);
// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(logger("dev"));
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use(methodOverride("_method"));

app.use(
    session({
        secret: "keyboard quearling",
        resave: false,
        saveUninitialized: true,
    })
);
app.use(passport.initialize());
app.use(passport.session());

//config Passport and Sessions
// CHANGE: USE "createStrategy" INSTEAD OF "authenticate"
passport.use(User.createStrategy());
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// set local variables  middleware
app.use((req, res, next) => {
    // set defaut page title
    res.locals.title = "Surf Shop";
    // set success msg
    res.locals.success = req.session.success || " ";
    delete req.session.success;
    // set error msg
    res.locals.error = req.session.error || " ";
    delete req.session.error;

    next();
});

// mount routes
app.use("/", indexRouter);
app.use("/posts", postsRouter);
app.use("/posts/:id/reviews", reviewsRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
    // // set locals, only providing error in development
    // res.locals.message = err.message;
    // res.locals.error = req.app.get("env") === "development" ? err : {};

    // // render the error page
    // res.status(err.status || 500);
    // res.render("error");

    console.log(err);
    req.session.error = err.message;
    res.redirect("back");
});

module.exports = app;

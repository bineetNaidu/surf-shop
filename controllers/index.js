const passport = require("passport");
const User = require("../models/user");
const Post = require("../models/post");

module.exports = {
    // Get /
    async landingPage(req, res, next) {
        const posts = await Post.find({});
        res.render("index", {
            posts,
            mapboxToken: process.env.MAPBOX_TOKEN,
            title: "Surf Shop | Home",
        });
    },

    // get register
    getRegister(req, res, next) {
        res.render("register", { title: "Register" });
    },

    // postRegister method
    async postRegister(req, res, next) {
        let newUser = new User({
            username: req.body.username,
            email: req.body.email,
            image: req.body.image,
        });

        let user = await User.register(newUser, req.body.password);
        req.login(user, (err) => {
            if (err) {
                return next(err);
            }
            req.session.success = `Welcome to Surf Shop, ${user.username}!`;
            res.redirect("/");
        });
    },

    // get login
    getLogin(req, res, next) {
        res.render("login", { title: "Login" });
    },

    // postLogin method
    async postLogin(req, res, next) {
        const { username, password } = req.body;
        const { user, error } = await User.authenticate()(username, password);
        if (!user && error) {
            next(error);
        }
        req.login(user, (err) => {
            if (err) {
                return next(err);
            }
            req.session.success = `Welcome Back, ${username}`;
            const redirectUrl = req.session.redirectTo || "/";
            delete req.session.redirectTo;
            res.redirect(redirectUrl);
        });
    },
    // getLogout method
    getLogout(req, res, next) {
        req.logout();
        res.redirect("/");
    },
};

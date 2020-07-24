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
        res.render("register", {
            title: "Surf Shop | Register",
            username: "",
            email: "",
        });
    },

    // postRegister method
    async postRegister(req, res, next) {
        try {
            const user = await User.register(
                new User(req.body),
                req.body.password
            );
            req.login(user, (err) => {
                if (err) {
                    return next(err);
                }
                req.session.success = `Welcome to Surf Shop, ${user.username}!`;
                res.redirect("/");
            });
        } catch (err) {
            const { username, email } = req.body;
            let error = err.message;
            if (
                error.includes("duplicate") &&
                error.includes("index : email_1 dup key")
            ) {
                error = "A user with given email is already registered";
            }
            res.render("register", {
                title: "Surf Shop | Register",
                username,
                email,
                error,
            });
        }
    },

    // get login
    getLogin(req, res, next) {
        if (req.isAuthenticated()) {
            return res.redirect("/");
        }
        if (req.query.returnTo) {
            req.session.redirectTo = req.headers.referer;
        }
        res.render("login", { title: "Surf Shop | Login" });
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

    // Profile
    async getProfile(req, res, next) {
        const posts = await Post.find()
            .where("author")
            .equals(req.user._id)
            .limit(10)
            .exec();
        res.render("profile", { posts });
    },
};

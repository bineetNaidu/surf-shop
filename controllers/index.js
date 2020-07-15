const passport = require("passport");
const { request } = require("../app");

const User = require("../models/user");
module.exports = {
    // postRegister method
    async postRegister(req, res, next) {
        let newUser = new User({
            username: req.body.username,
            email: req.body.email,
            image: req.body.image,
        });

        await User.register(newUser, req.body.password);
        res.redirect("/");
    },
    // postLogin method
    async postLogin(req, res, next) {
        passport.authenticate("local", {
            successRedirect: "/",
            failureRedirect: "/login",
        })(req, res, next);
    },
    // getLogout method
    getLogout(req, res, next) {
        req.logout();
        res.redirect("/");
    },
};

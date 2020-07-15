const express = require("express");
const router = express.Router();
const { postRegister } = require("../controllers/index");

/* GET home page. */
router.get("/", (req, res, next) => {
    res.render("index", { title: "Surf Shop | Home" });
});

/* GET register page. /register */
router.get("/register", (req, res, next) => {
    res.send("register route");
});

/* POST register page. /register */
router.post("/register", postRegister);

/* GET login page. /login */
router.get("/login", (req, res, next) => {
    res.send("login route");
});

/* POST login page. /login */
router.post("/login", (req, res, next) => {
    res.send("post login route");
});

/* GET profile page. /profile */
router.get("/profile", (req, res, next) => {
    res.send(" profile route");
});

/* PUT profile page. /profile/:user_id */
router.put("/profile/:user_id", (req, res, next) => {
    res.send("POST profile route");
});

/* GET forgot-pwd page. /forgot-pw */
router.get("/forgot-pw", (req, res, next) => {
    res.send(" forgot-pw route");
});

/* PUT forgot-pwd page. /forgot-pw */
router.put("/forgot-pw/", (req, res, next) => {
    res.send("PUT forgot-pw");
});

/* GET reset-pwd page. /reset-pw/:token */
router.get("/reset-pw/:token", (req, res, next) => {
    res.send(" reset-pw  with a token route");
});

/* PUT reset-pwd page. /reset-pw/:token */
router.put("/reset-pw/:token", (req, res, next) => {
    res.send(" reset-pw  with a token route");
});

module.exports = router;

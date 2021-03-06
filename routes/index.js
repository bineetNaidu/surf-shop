const express = require("express");
const router = express.Router();
const {
    postRegister,
    postLogin,
    getLogout,
    landingPage,
    getRegister,
    getLogin,
    getProfile,
    updateProfile,
} = require("../controllers");
const {
    asyncErrorHandler,
    isLoggedIn,
    isValidPassword,
    changePassword,
} = require("../middleware");

/* GET home page. */
router.get("/", asyncErrorHandler(landingPage));

/* GET register page. /register */
router.get("/register", getRegister);

/* POST register page. /register */
router.post("/register", asyncErrorHandler(postRegister));

/* GET login page. /login */
router.get("/login", getLogin);

/* POST login page. /login */
router.post("/login", asyncErrorHandler(postLogin));

// GET /logout
router.get("/logout", getLogout);

/* GET profile page. /profile */
router.get("/profile", isLoggedIn, asyncErrorHandler(getProfile));

/* PUT profile page. /profile/:user_id */
router.put(
    "/profile",
    isLoggedIn,
    asyncErrorHandler(isValidPassword),
    asyncErrorHandler(changePassword),
    asyncErrorHandler(updateProfile)
);

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

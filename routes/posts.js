const express = require("express");
const router = express.Router();
const { getPosts } = require("../controllers/posts");
const { errorHandler } = require("../middleware");

/* GET post index /posts */
router.get("/", errorHandler(getPosts));

/* GET post new /posts/new */
router.get("/new", (req, res, next) => {
    res.send("GET post new /posts/new");
});

/* POST post create /posts */
router.post("/", (req, res, next) => {
    res.send("POST post create /post");
});

/* GET post show /post/:id */
router.get("/:id", (req, res, next) => {
    res.send("GET post show /post/:id");
});

/* GET post edit /post/:id/edit */
router.get("/:id/edit", (req, res, next) => {
    res.send("GET post edit /post/:id/edit");
});

/* PUT post update /post/:id */
router.put("/:id", (req, res, next) => {
    res.send("PUT post update /post/:id");
});

/* DELETE post destroy /post/:id */
router.delete("/:id", (req, res, next) => {
    res.send("DELETE post destroy /post/:id");
});

module.exports = router;

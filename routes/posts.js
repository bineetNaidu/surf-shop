const express = require("express");
const router = express.Router();
const {
    postIndex,
    postNew,
    postCreate,
    postShow,
    postEdit,
} = require("../controllers/posts");
const { asyncErrorHandler } = require("../middleware");

/* GET post index /posts */
router.get("/", asyncErrorHandler(postIndex));

/* GET post new /posts/new */
router.get("/new", postNew);

/* POST post create /posts */
router.post("/", asyncErrorHandler(postCreate));

/* GET post show /post/:id */
router.get("/:id", asyncErrorHandler(postShow));

/* GET post edit /post/:id/edit */
router.get("/:id/edit", asyncErrorHandler(postEdit));

/* PUT post update /post/:id */
router.put("/:id", (req, res, next) => {
    res.send("PUT post update /post/:id");
});

/* DELETE post destroy /post/:id */
router.delete("/:id", (req, res, next) => {
    res.send("DELETE post destroy /post/:id");
});

module.exports = router;

const express = require("express");
const router = express.Router();
const {
    getPosts,
    newPost,
    createPost,
    showPost,
    editPost,
} = require("../controllers/posts");
const { errorHandler } = require("../middleware");

/* GET post index /posts */
router.get("/", errorHandler(getPosts));

/* GET post new /posts/new */
router.get("/new", newPost);

/* POST post create /posts */
router.post("/", errorHandler(createPost));

/* GET post show /post/:id */
router.get("/:id", errorHandler(showPost));

/* GET post edit /post/:id/edit */
router.get("/:id/edit", errorHandler(editPost));

/* PUT post update /post/:id */
router.put("/:id", (req, res, next) => {
    res.send("PUT post update /post/:id");
});

/* DELETE post destroy /post/:id */
router.delete("/:id", (req, res, next) => {
    res.send("DELETE post destroy /post/:id");
});

module.exports = router;

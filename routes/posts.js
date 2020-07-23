const express = require("express");
const router = express.Router();
const multer = require("multer");
const upload = multer({ dest: "uploads/" });
const {
    postIndex,
    postNew,
    postCreate,
    postShow,
    postEdit,
    postUpdate,
    postDestroy,
} = require("../controllers/posts");
const { asyncErrorHandler, isLoggedIn, isAuthor } = require("../middleware");

/* GET post index /posts */
router.get("/", asyncErrorHandler(postIndex));

/* GET post new /posts/new */
router.get("/new", isLoggedIn, postNew);

/* POST post create /posts */
router.post(
    "/",
    isLoggedIn,
    upload.array("images", 4),
    asyncErrorHandler(postCreate)
);

/* GET post show /post/:id */
router.get("/:id", asyncErrorHandler(postShow));

/* GET post edit /post/:id/edit */
router.get(
    "/:id/edit",
    isLoggedIn,
    asyncErrorHandler(isAuthor),
    asyncErrorHandler(postEdit)
);

/* PUT post update /post/:id */
router.put(
    "/:id",
    isLoggedIn,
    asyncErrorHandler(isAuthor),
    upload.array("images", 4),
    asyncErrorHandler(postUpdate)
);

/* DELETE post destroy /post/:id */
router.delete(
    "/:id",
    isLoggedIn,
    asyncErrorHandler(isAuthor),
    asyncErrorHandler(postDestroy)
);

module.exports = router;

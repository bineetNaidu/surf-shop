const express = require("express");
const router = express.Router({ mergeParams: true });
const {
    reviewCreate,
    reviewUpdate,
    reviewDestroy,
} = require("../controllers/reviews");
const { asyncErrorHandler } = require("../middleware");

/* POST review create posts/:id/reviews */
router.post("/", asyncErrorHandler(reviewCreate));

/* PUT review update posts/:id/review/:id */
router.put("/:review_id", (req, res, next) => {
    res.send("PUT review update posts/:id/review/:review_id");
});

/* DELETE review destroy /review/:id */
router.delete("/review_:id", (req, res, next) => {
    res.send("DELETE review destroy posts/:id/review/:review_:id");
});

module.exports = router;

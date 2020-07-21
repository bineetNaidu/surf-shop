const express = require("express");
const router = express.Router({ mergeParams: true });
const {
    reviewCreate,
    reviewUpdate,
    reviewDestroy,
} = require("../controllers/reviews");
const { asyncErrorHandler, isReviewAuthor } = require("../middleware");

/* POST review create posts/:id/reviews */
router.post("/", asyncErrorHandler(reviewCreate));

/* PUT review update posts/:id/review/:id */
router.put("/:review_id", isReviewAuthor, asyncErrorHandler(reviewUpdate));

/* DELETE review destroy /review/:id */
router.delete("/:review_id", isReviewAuthor, asyncErrorHandler(reviewDestroy));

module.exports = router;

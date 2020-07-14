const express = require("express");
const router = express.Router({ mergeParams: true });

/* GET review index posts/:id/reviews */
router.get("/", (req, res, next) => {
    res.send("GET review index posts/:id/reviews");
});

/* POST review create posts/:id/reviews */
router.post("/", (req, res, next) => {
    res.send("POST reviews create posts/:id/review");
});

/* GET review show /review/:id */
router.get("/:review_id", (req, res, next) => {
    res.send("GET reviews show posts/:id/review/:review_id");
});

/* GET review edit posts/:id/review/:id/edit */
router.get("/:id/edit", (req, res, next) => {
    res.send("GET reviews edit posts/:id/review/:id/edit");
});

/* PUT review update posts/:id/review/:id */
router.put("/:review_id", (req, res, next) => {
    res.send("PUT review update posts/:id/review/:review_id");
});

/* DELETE review destroy /review/:id */
router.delete("/review_:id", (req, res, next) => {
    res.send("DELETE review destroy posts/:id/review/:review_:id");
});

module.exports = router;

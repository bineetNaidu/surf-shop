const Post = require("../models/post");
const Review = require("../models/review");

module.exports = {
    // create REVIEW
    async reviewCreate(req, res, next) {
        // find the post by its ID
        let post = await Post.findById(req.params.id);
        // lets create the review
        // req.body.author = req.user._id
        let review = await Review.create(req.body.review);
        // assign review to posts
        post.reviews.push(review);
        // save the posts
        post.save();
        // redirect to the post
        req.session.success = "Review created successfully";
        res.redirect("/posts/" + post._id);
    },

    // updating the REVEIW
    async reviewUpdate(req, res, next) {},
    // destroy REVIEWS
    async reviewDestroy(req, res, next) {},
};

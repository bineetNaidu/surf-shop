const Post = require("../models/post");

module.exports = {
    // POST index
    async getPosts(req, res, next) {
        let posts = await Post.find({});
        res.render("posts/index", { posts });
    },
    // POST new
    async newPost(rqe, res, next) {
        res.render("posts/new");
    },
};

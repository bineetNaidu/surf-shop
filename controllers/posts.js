const Post = require("../models/post");

module.exports = {
    // POST index
    async getPosts(req, res, next) {
        let posts = await Post.find({});
        res.render("posts/index", { posts });
    },
    // POST new
    newPost(rqe, res, next) {
        res.render("posts/new");
    },
    // create post
    async createPost(req, res, next) {
        let createPost = await Post.create(req.body);
        res.redirect(`/posts/${createPost.id}`);
    },
};

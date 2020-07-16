const Post = require("../models/post");

module.exports = {
    // POST index
    async postIndex(req, res, next) {
        let posts = await Post.find({});
        res.render("posts/index", { posts });
    },
    // POST new
    postNew(rqe, res, next) {
        res.render("posts/new");
    },
    // create post
    async postCreate(req, res, next) {
        let createPost = await Post.create(req.body);
        res.redirect(`/posts/${createPost.id}`);
    },
    // show POSTS
    async postShow(req, res, next) {
        let foundPost = await Post.findById(req.params.id);
        res.render("posts/show", { post: foundPost });
    },
    // POST edit
    async postEdit(req, res, next) {
        let editPOST = await Post.findById(req.params.id);
        res.render("posts/edit", { post: editPOST });
    },
    // updating the post
    async postUpdate(req, res, next) {
        let updateposts = await Post.findByIdAndUpdate(
            req.params.id,
            req.body.post
        );
        res.redirect("/posts/" + updateposts.id);
    },
};

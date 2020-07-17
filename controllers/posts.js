const Post = require("../models/post");
const cloudinary = require("cloudinary");
cloudinary.config({
    cloud_name: "bineet",
    api_key: process.env.CLOUDINARY_KEY,
    api_secret: process.env.CLOUDINARY_SECRET,
});

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
        req.body.post.images = [];
        for (const file of req.files) {
            let image = await cloudinary.v2.uploader.upload(file.path);
            req.body.post.images.push({
                url: image.secure_url,
                public_id: image.public_id,
            });
        }
        let createPost = await Post.create(req.body.post);
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
        // handle any deletion of existing images

        // handle upload of any new images
        let updateposts = await Post.findByIdAndUpdate(
            req.params.id,
            req.body.post
        );
        res.redirect("/posts/" + updateposts.id);
    },
    // destroy post
    async postDestroy(req, res, next) {
        let dstroyedPost = await Post.findByIdAndDelete(req.params.id);
        res.redirect("/posts");
    },
};

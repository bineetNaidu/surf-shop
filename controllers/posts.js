const Post = require("../models/post");
const mbxGeocdoding = require("@mapbox/mapbox-sdk/services/geocoding");
const geocodingClient = mbxGeocdoding({
    accessToken: process.env.MAPBOX_TOKEN,
});
const cloudinary = require("cloudinary");
const post = require("../models/post");
cloudinary.config({
    cloud_name: "bineet",
    api_key: process.env.CLOUDINARY_KEY,
    api_secret: process.env.CLOUDINARY_SECRET,
});
const mapboxToken = process.env.MAPBOX_TOKEN;

module.exports = {
    // POST index
    async postIndex(req, res, next) {
        let posts = await Post.paginate(
            {},
            {
                page: req.query.page || 1,
                limit: 10,
                sort: {
                    _id: -1,
                },
            }
        );
        posts.page = Number(posts.page);
        res.render("posts/index", {
            posts,
            mapboxToken,
        });
    },
    // POST new
    postNew(req, res, next) {
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
        let response = await geocodingClient
            .forwardGeocode({
                query: req.body.post.location,
                limit: 1,
            })
            .send();
        req.body.post.geometry = response.body.features[0].geometry;
        req.body.post.author = req.user._id;
        let post = new Post(req.body.post);
        post.properties.description = `<strong><a href="/posts/${post._id}">${
            post.title
        }</a></strong><p>${post.location}</p><p>${post.description.substring(
            0,
            20
        )}...</p>`;
        await post.save();
        req.session.success = "Post Created Successfully";
        res.redirect(`/posts/${post.id}`);
    },
    // show POSTS
    async postShow(req, res, next) {
        let post = await Post.findById(req.params.id).populate({
            path: "reviews",
            options: { sort: { _id: -1 } },
            populate: {
                path: "author",
                model: "User",
            },
        });
        const floorRating = post.calculateAvgRating();
        res.render("posts/show", { post, floorRating, mapboxToken });
    },
    // POST edit
    postEdit(req, res, next) {
        res.render("posts/edit");
    },
    // updating the post
    async postUpdate(req, res, next) {
        // get post form res.locals
        const { post } = res.locals;
        // check if there's any image for deletion
        if (req.body.deleteImages && req.body.deleteImages.length) {
            // assign deleteImages from req.body on its own var
            let deleteImages = req.body.deleteImages;
            // loop over the deleteImages
            for (const public_id of deleteImages) {
                // delete images from cloudinary
                await cloudinary.v2.uploader.destroy(public_id);
                // delete images from post.images
                for (const image of post.images) {
                    if (image.public_id === public_id) {
                        let index = post.images.indexOf(image);
                        post.images.splice(index, 1);
                    }
                }
            }
        }
        // check if there are any new images for upload
        if (req.files) {
            //upload images
            for (const file of req.files) {
                let image = await cloudinary.v2.uploader.upload(file.path);
                // add images to post.images array
                post.images.push({
                    url: image.secure_url,
                    public_id: image.public_id,
                });
            }
        }
        // check if location has been updated
        if (req.body.post.location !== post.location) {
            let response = await geocodingClient
                .forwardGeocode({
                    query: req.body.post.location,
                    limit: 1,
                })
                .send();
            post.geometry = response.body.features[0].geometry;
            post.location = req.body.post.location;
        }

        // updated the post with new any properties
        post.title = req.body.post.title;
        post.description = req.body.post.description;
        post.price = req.body.post.price;
        post.properties.description = `<strong><a href="/posts/${post._id}">${
            post.title
        }</a></strong><p>${post.location}</p><p>${post.description.substring(
            0,
            20
        )}...</p>`;

        // save the updated post into the db
        await post.save();
        // redirect to show page
        res.redirect("/posts/" + post.id);
    },
    // destroy post
    async postDestroy(req, res, next) {
        const { post } = res.locals;
        for (const image of destroyPost.images) {
            await cloudinary.v2.uploader.destroy(image.public_id);
        }
        await destroyPost.remove();
        req.session.success = "Post deleted successfully!";
        res.redirect("/posts");
    },
};

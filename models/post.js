const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PostSchema = new Schema({
    title: String,
    price: String,
    description: String,
    location: String,
    images: [
        {
            url: String,
            public_id: String,
        },
    ],
    coordinates: Array,
    author: {
        type: Schema.Types.ObjectId,
        ref: "User",
    },
    reviews: {
        type: Schema.Types.ObjectId,
        ref: "Review",
    },
});

module.exports = mongoose.model("Post", PostSchema);

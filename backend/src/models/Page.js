const mongoose = require("mongoose");

const blockSchema = new mongoose.Schema(
    {
        id: String,
        type: {
            type: String,
            enum: ["text", "image", "banner", "product"],
            required: true,
        },
        content: String,
        url: String,
        caption: String,

        product: {
            name: String,
            price: Number,
            description: String,
            imageUrl: String,
            isMustTry: Boolean,
        },
    },
    {
        _id: false,
    },
);

const pageSchema = new mongoose.Schema(
    {
        slug: {
            type: String,
            required: true,
            unique: true,
        },
        title: {
            type: String,
            required: true,
        },
        subtitle: String,
        blocks: [blockSchema],
    },
    {
        timestamps: true,
    },
);

module.exports = mongoose.models.Page || mongoose.model("Page", pageSchema);

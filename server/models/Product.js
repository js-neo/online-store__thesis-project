const { Schema, model } = require("mongoose");

const schema = new Schema(
    {
        brand: {
            type: String,
            required: true
        },
        title: {
            type: String,
            required: true
        },
        description: { type: String, required: true },
        image: String,
        categories: [{ type: Schema.Types.ObjectId, ref: "Category" }],
        price: { type: Number, required: true },
        sizes: [{ type: Schema.Types.ObjectId, ref: "Size" }],
        colors: [{ type: Schema.Types.ObjectId, ref: "Color" }],
        inStock: { type: Boolean, default: true }
    },
    {
        timestamps: true
    }
);

module.exports = model("Product", schema);

const { Schema, model } = require("mongoose");

const schema = new Schema(
    {
        userId: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true
        },
        products: [
            {
                productId: { type: Schema.Types.ObjectId, ref: "Product" },
                quantity: { type: Number, default: 1 }
            }
        ],
        amount: { type: Number, required: true },
        address: { type: Object, required: true },
        status: { type: String, default: "pending" }
    },
    {
        timestamps: true
    }
);

module.exports = model("Order", schema);

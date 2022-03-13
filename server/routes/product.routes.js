const express = require("express");
const router = express.Router({ mergeParams: true });
const {
    verifyIsAdmin,
    verifyAuthById
} = require("../middleware/auth.middleware");
const Product = require("../models/Product");

router.patch("/:productId", verifyAuthById, async (req, res) => {
    try {
        const { productId } = req.params;
        const updatedProduct = await Product.findByIdAndUpdate(
            productId,
            req.body,
            {
                new: true
            }
        );
        res.send(updatedProduct);
    } catch (error) {
        res.status(500).json({
            message: "An error occurred on the server. Please try again later."
        });
    }
});

router.delete("/:productId", verifyAuthById, async (req, res) => {
    try {
        const { productId } = req.params;
        await Product.findByIdAndDelete(productId);
        res.json({
            message: "Product has been deleted"
        });
    } catch (error) {
        res.status(500).json({
            message: "An error occurred on the server.Please try again later."
        });
    }
});

router.get("/:productId", async (req, res) => {
    try {
        const { productId } = req.params;
        const product = await Product.findById(productId);
        res.send(product);
    } catch (err) {
        res.status(500).json({
            message: "An error occurred on the server.Please try again later."
        });
    }
});

router.get("/", async (req, res) => {
    const queryNew = req.query.new;
    const queryCategory = req.query.category;
    console.log("QueryCategory:", queryCategory);
    try {
        let products;

        if (queryNew) {
            products = await Product.find().sort({ createdAt: -1 }).limit(1);
        } else if (queryCategory) {
            console.log("queryCategory:", queryCategory);
            products = await Product.find({
                categories: {
                    $in: [queryCategory]
                }
            });
        } else {
            products = await Product.find();
        }

        res.send(products);
    } catch (error) {
        res.status(500).json({
            message: "An error occurred on the server.Please try again later."
        });
    }
});

module.exports = router;

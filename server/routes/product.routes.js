const express = require("express");
const router = express.Router({ mergeParams: true });
const {
    verifyIsAdmin,
    verifyAuthById
} = require("../middleware/auth.middleware");
const Product = require("../models/Product");

const handleError = (res) => {
    res.status(500).json({
        message: "An error occurred on the server. Please try again later."
    });
};

router.patch("/:productId", verifyAuthById, verifyIsAdmin, async (req, res) => {
    try {
        const { productId } = req.params;
        const updatedProduct = await Product.findByIdAndUpdate(
            productId,
            req.body,
            { new: true }
        );
        if (!updatedProduct) {
            return res.status(404).json({ message: "Product not found" });
        }
        res.send(updatedProduct);
    } catch (error) {
        console.error("Error occurred:", error);
        handleError(res);
    }
});

router.delete(
    "/:productId",
    verifyAuthById,
    verifyIsAdmin,
    async (req, res) => {
        try {
            const { productId } = req.params;
            const deletedProduct = await Product.findByIdAndDelete(productId);
            if (!deletedProduct) {
                return res.status(404).json({ message: "Product not found" });
            }
            res.json({ message: "Product has been deleted" });
        } catch (error) {
            console.error("Error occurred:", error);
            handleError(res);
        }
    }
);

router.get("/:productId", async (req, res) => {
    try {
        const { productId } = req.params;
        const product = await Product.findById(productId);
        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }
        res.send(product);
    } catch (err) {
        console.error("Error occurred:", err);
        handleError(res);
    }
});

router.get("/", async (req, res) => {
    const queryNew = req.query.new;
    const queryCategory = req.query.category;
    try {
        let products;
        if (queryNew) {
            products = await Product.find().sort({ createdAt: -1 }).limit(1);
        } else if (queryCategory) {
            products = await Product.find({
                categories: { $in: [queryCategory] }
            });
        } else {
            products = await Product.find();
            console.log("Products: ", products);
        }
        res.send(products);
    } catch (error) {
        console.error("Error occurred:", error);
        handleError(res);
    }
});

module.exports = router;

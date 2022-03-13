const express = require("express");
const Product = require("../models/Product");
const router = express.Router({ mergeParams: true });

router.post("/", async (req, res) => {
    try {
        const newProduct = await Product.create({ ...req.body });
        const savedProduct = await newProduct.save();
        res.send(savedProduct);
    } catch (error) {
        res.status(500).json({
            message: "An error occurred on the server. Please try again later."
        });
    }
});

module.exports = router;

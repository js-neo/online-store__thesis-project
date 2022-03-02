const express = require("express");
const router = express.Router({ mergeParams: true });
const Cart = require("../models/Cart");
const {
    auth,
    verifyAuthById,
    verifyIsAdmin
} = require("../middleware/auth.middleware");

router.post("/", auth, async (req, res) => {
    const newCart = Cart.create({ ...req.body });
    try {
        const savedCart = await newCart.save();
        res.status(200).json(savedCart);
    } catch (error) {
        res.status(500).json({
            message: "An error occurred on the server. Please try again later."
        });
    }
});

router.patch("/:userId", verifyAuthById, async (req, res) => {
    try {
        const { userId } = req.params;
        const updatedCart = await Cart.findByIdAndUpdate(userId, req.body, {
            new: true
        });
        res.send(updatedCart);
    } catch (error) {
        res.status(500).json({
            message: "An error occurred on the server. Please try again later."
        });
    }
});

router.delete("/:userId", verifyAuthById, async (req, res) => {
    try {
        const { userId } = req.params;
        await Cart.findByIdAndDelete(userId);
        res.json({
            message: "User has been deleted"
        });
    } catch (error) {
        res.status(500).json({
            message: "An error occurred on the server.Please try again later."
        });
    }
});

router.get("/find/:userId", verifyAuthById, async (req, res) => {
    try {
        const { userId } = req.params;
        const cart = await Cart.findOne({ userId });
        res.send(cart);
    } catch (err) {
        res.status(500).json({
            message: "An error occurred on the server.Please try again later."
        });
    }
});

module.exports = router;

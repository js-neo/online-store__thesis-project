const express = require("express");
const router = express.Router({ mergeParams: true });
const Cart = require("../models/Cart");
const {
    auth,
    verifyAuthById,
    verifyIsAdmin
} = require("../middleware/auth.middleware");

router.post("/", auth, async (req, res) => {
    const newCart = await Cart.create({ ...req.body });
    console.log("req.body", req.body);
    try {
        const savedCart = await newCart.save();
        res.send(savedCart);
    } catch (error) {
        res.status(500).json({
            message: "An error occurred on the server. Please try again later."
        });
    }
});

router.patch("/:cartId", verifyAuthById, async (req, res) => {
    try {
        const { cartId } = req.params;
        const updatedCart = await Cart.findByIdAndUpdate(cartId, req.body, {
            new: true
        });
        res.send(updatedCart);
    } catch (error) {
        res.status(500).json({
            message: "An error occurred on the server. Please try again later."
        });
    }
});

router.delete("/:cartId", verifyAuthById, async (req, res) => {
    try {
        const { cartId } = req.params;
        await Cart.findByIdAndDelete(cartId);
        res.json({
            message: "Cart has been deleted"
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

router.get("/", verifyIsAdmin, async (req, res) => {
    try {
        const carts = await Cart.find();
        res.send(carts);
    } catch (err) {
        res.status(500).json({
            message: "An error occurred on the server.Please try again later."
        });
    }
});

module.exports = router;

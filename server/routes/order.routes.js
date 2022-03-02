const express = require("express");
const router = express.Router({ mergeParams: true });

const Order = require("../models/Order");
const {
    auth,
    verifyAuthById,
    verifyIsAdmin
} = require("../middleware/auth.middleware");

router.post("/", auth, async (req, res) => {
    const newOrder = await Order.create({ ...req.body });
    console.log("req.body", req.body);
    try {
        const savedOrder = await newOrder.save();
        res.send(savedOrder);
    } catch (error) {
        res.status(500).json({
            message: "An error occurred on the server. Please try again later."
        });
    }
});

router.patch("/:orderId", verifyAuthById, async (req, res) => {
    try {
        const { orderId } = req.params;
        const updatedOrder = await Order.findByIdAndUpdate(orderId, req.body, {
            new: true
        });
        res.send(updatedOrder);
    } catch (error) {
        res.status(500).json({
            message: "An error occurred on the server. Please try again later."
        });
    }
});

router.delete("/:orderId", verifyAuthById, async (req, res) => {
    try {
        const { orderId } = req.params;
        await Order.findByIdAndDelete(orderId);
        res.json({
            message: "Order has been deleted"
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
        const order = await Order.find({ userId });
        res.send(order);
    } catch (err) {
        res.status(500).json({
            message: "An error occurred on the server.Please try again later."
        });
    }
});

router.get("/", verifyIsAdmin, async (req, res) => {
    try {
        const orders = await Order.find();
        res.send(orders);
    } catch (err) {
        res.status(500).json({
            message: "An error occurred on the server.Please try again later."
        });
    }
});

module.exports = router;

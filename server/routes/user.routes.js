const express = require("express");
const User = require("../models/User");
const {
    verifyAuthById,
    verifyIsAdmin
} = require("../middleware/auth.middleware");
const bcrypt = require("bcryptjs");
const router = express.Router({ mergeParams: true });

router.patch("/:userId", verifyAuthById, async (req, res) => {
    if (req.body.password) {
        req.body.password = await bcrypt.hash(req.body.password, 12);
    }
    try {
        const { userId } = req.params;

        const updatedUser = await User.findByIdAndUpdate(userId, req.body, {
            new: true
        });
        res.send(updatedUser);
    } catch (error) {
        res.status(500).json({
            message: "An error occurred on the server.Please try again later."
        });
    }
});

router.delete("/:userId", verifyAuthById, async (req, res) => {
    const { userId } = req.params;
    try {
        await User.findByIdAndDelete(userId);
        res.json({
            message: "User has been deleted"
        });
    } catch (error) {
        res.status(500).json({
            message: "An error occurred on the server.Please try again later."
        });
    }
});

router.get("/", verifyIsAdmin, async (req, res) => {
    const query = req.query.new;
    try {
        const list = query
            ? await User.find().sort({ _id: -1 }).limit(5)
            : User.find();
        return res.send(list);
    } catch (error) {
        res.status(500).json({
            message: "An error occurred on the server. Please try again later."
        });
    }
});

module.exports = router;

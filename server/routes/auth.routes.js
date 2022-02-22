const express = require("express");
const router = express.Router({ mergeParams: true });

router.post("/signUp", async (req, res) => {
    try {
    } catch (error) {
        res.status(500).json({
            message: "An error occurred on the server. Please try again later."
        });
    }
});

router.post("/signInWithPassword", async (req, res) => {
    res.json;
});

router.post("/token", async (req, res) => {
    res.json;
});

module.exports = router;

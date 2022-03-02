const express = require("express");
const router = express.Router({ mergeParams: true });

router.use("/auth", require("./auth.routes"));
router.use("/users", require("./user.routes"));
router.use("/carts", require("./cart.routes"));
router.use("/products", require("./product.routes"));
router.use("/orders", require("./order.routes"));

module.exports = router;

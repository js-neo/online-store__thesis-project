const express = require("express");
const router = express.Router({ mergeParams: true });

router.use("/category", require("./category.routes"));
router.use("/size", require("./size.routes"));
router.use("/color", require("./color.routes"));
router.use("/addProduct", require("./addProduct.routes"));

module.exports = router;

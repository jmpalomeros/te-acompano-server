const router = require("express").Router();

router.get("/", (req, res, next) => {
  res.json("All good in here");
});

const authRoutes = require("./auth.routes")
router.use("/auth", authRoutes )

const serviceRoutes = require("./service.routes")
router.use("/service", serviceRoutes )

const reviewRoutes = require("./review.routes")
router.use("/review", reviewRoutes )

const userRoutes = require("./user.routes")
router.use("/user", userRoutes )

module.exports = router;

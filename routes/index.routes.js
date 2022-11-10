const router = require("express").Router();

router.get("/", (req, res, next) => {
  res.json("All good in here");
});

const authRoutes = require("./auth.routes")
router.use("/auth", authRoutes )

const serviceRoutes = require("./service.routes")
router.use("/service", serviceRoutes )

module.exports = router;

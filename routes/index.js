const express = require("express");

const router = express.Router();

router.get("/", (req, res) => {
  res.send("Hello World to Preciuos");
});

router.use("/attendance", require("./attendance"));
router.use("/users", require("./users"));
router.use("/events", require("./events"));
router.use("/members", require("./members"));

module.exports = router;
// router.use("/users", require("./users"));

// router.use("/members", require("./members"));

// router.use("/events", require("./events"));

// router.use("/attendance", require("./attendance"));

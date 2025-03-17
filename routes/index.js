const express = require("express");
const router = express.Router();
const auth = require("../middleware/authenticate")
const passport = require("passport");



router.get("/logout", function (req, res, next) {
  req.logout(function (err) {
    if (err) {
      next(err);
    }
    res.redirect("/");
  });
});


router.use("/", require("./swagger"));
router.use("/experience",   require("./experience"))
router.use("/attendance", require("./attendance"));
router.use("/users", require("./users"));
router.use("/events", require("./events"));
router.use("/members", auth.isAuthenticated, require("./members"));



module.exports = router;


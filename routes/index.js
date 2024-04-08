const express = require("express");
const router = express.Router();

const passport = require("passport");
const passwordUtils = require("../lib/passwordUtils");
const { User } = require("../models/models");

router.post("/login", passport.authenticate("local"), (req, res) => {
  req.session.user = req.user;
  res.status(200).json({ message: "You logged in" });
});
router.get("/logout", function (req, res, next) {
  req.logout(function (err) {
    if (err) {
      next(err);
    }
    res.redirect("/");
  });
});

router.use("/register", require("./users"));
router.use("/", require("./swagger"));

router.use("/attendance", require("./attendance"));
router.use("/users", require("./users"));
router.use("/events", require("./events"));
router.use("/members", require("./members"));

module.exports = router;

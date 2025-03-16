const router = require("express").Router();
const usercontroller = require("../controllers/users.js");

const passport = require("passport");

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

router.post("/register", usercontroller.createUser);

module.exports = router;

const passport = require("passport");
const localStrategy = require("passport-local");
const mongoDb = require("./database");
const passwordFunc = require("../lib/passwordUtils");
const { User } = require("../models/models");

const customFields = {
  usernameField: "username",
  passwordField: "password",
};
const verifiedCallback = (username, password, done) => {
  User.findOne({ username: username })
    .then((user) => {
      if (!user) {
        return done(null, false);
      }
      const isValid = passwordFunc.validPassword(
        password,
        user.hash,
        user.salt
      );

      if (isValid) {
        return done(null, user);
      } else {
        return done(null, false);
      }
    })
    .catch((err) => {
      done(err);
    });
};
const strategy = new localStrategy(customFields, verifiedCallback);

passport.use(strategy);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((userId, done) => {
  User.findById(userId)
    .then((user) => {
      done(null, user);
    })
    .catch((err) => {
      done(err);
    });
});

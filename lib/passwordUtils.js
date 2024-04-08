const crypto = require("crypto");


const validPassword = (password, hash, salt) => {
  var harshVerify = crypto
    .pbkdf2Sync(password, salt, 1000, 64, "sha512")
    .toString("hex");
  return hash === harshVerify;
};

const genPassword = (password) => {
  let salt = crypto.randomBytes(32).toString("hex");
  let genhash = crypto
    .pbkdf2Sync(password, salt, 1000, 64, "sha512")
    .toString("hex");

  return {
    salt: salt,
    hash: genhash,
  };
};

module.exports = {
  validPassword,
  genPassword,
};

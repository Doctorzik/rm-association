const dotenv = require("dotenv").config();
const { User } = require("../models/models");
const passwordUtils = require("../lib/passwordUtils");


const createUser = async (req, res) => {
    const salthash = passwordUtils.genPassword(req.body.password)
    const salt = salthash.salt;
    const hash = salthash.hash;

    User.validate(req.body).then((validatedData) => {

        const user = new User({
            username : validatedData.username,
            hash: hash,
            salt: salt

        })

        user.save().then(() => {
            res.status(201).json({message: " User Successfully created"});
          }).catch((error) => {
            if(error.code === 11000 && error.keyPattern.username){
                res.status(401).json("User already Exist")
            }
            else {
                res.status(500).json({message: error.message})
            }
          })

    }).catch((validatedError) => {
       res.status(401).json({error: validatedError.message})
    })

}

// const creatUser = (req, res) => ({
//     const salthash = passwordUtils.genPassword(req.body.password)
  
//     const salt = salthash.salt;
//     const hash = salthash.hash;
  
//     const newUser = new User({
//       username: req.body.username,
//       hash: hash,
//       salt: salt,
//     });
  
//     newUser
//       .save()
//       .then((user) => {
//         console.log(user);
//         res.status(201).json({ message: "You have successfully Registered" });
//       })
//       .catch((error) => {
//         res.status(400).json({ message: error.message });
//       });
//   });

  module.exports = {
    createUser
  }




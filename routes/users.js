const router = require("express").Router()
const usercontroller = require("../controllers/users.js")




router.post("/", usercontroller.createUser)







module.exports = router





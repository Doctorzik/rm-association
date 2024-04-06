const router = require("express").Router();
const eventcontroller = require("../controllers/events")

router.post("/", eventcontroller.createEvent);

module.exports = router;

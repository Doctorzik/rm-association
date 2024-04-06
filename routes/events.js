const router = require("express").Router();
const eventcontroller = require("../controllers/events");
const singleDocument = require("../middleware/index");

router.get("/", eventcontroller.getAllEvents);

router.get(
  "/:id",
  singleDocument.singleDocument,
  eventcontroller.getSingleEventById
);

router.post("/", eventcontroller.createEvent);

router.delete("/:id", singleDocument.singleDocument, eventcontroller.deleteEvent);

router.put("/:id", singleDocument.singleDocument, eventcontroller.updateEvent);

module.exports = router;

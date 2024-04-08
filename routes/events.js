const router = require("express").Router();
const eventcontroller = require("../controllers/events");
const singleDocument = require("../middleware/index");
const authenticate = require("../middleware/authenticate")


router.get("/", eventcontroller.getAllEvents);

router.get(
  "/:id",
  singleDocument.eventSingleDocument,
  eventcontroller.getSingleEventById
);

router.post("/", authenticate.isAuthenticated, eventcontroller.createEvent);

router.delete(
  "/:id",
  authenticate.isAuthenticated,
  singleDocument.eventSingleDocument,
  eventcontroller.deleteEvent
);

router.put("/:id", authenticate.isAuthenticated, singleDocument.eventSingleDocument, eventcontroller.updateEvent);

module.exports = router;

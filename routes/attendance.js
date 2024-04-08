const router = require("express").Router();
const authenticate = require("../middleware/authenticate")

const attendanceController = require("../controllers/attendance");
const singleDocument = require("../middleware/index");

router.get("/", attendanceController.getAllAttendances);

router.get(
  "/:id",
  singleDocument.attendanceSingleDocument,
  attendanceController.getSingleAttendanceById
);

router.post("/", authenticate.isAuthenticated, attendanceController.createAttendance);

router.delete(
  "/:id",
  authenticate.isAuthenticated,
  singleDocument.attendanceSingleDocument,
  attendanceController.deleteAttendance
);

router.put(
  "/:id",
  authenticate.isAuthenticated,
  singleDocument.attendanceSingleDocument,
  attendanceController.updateAttendance
);

module.exports = router;

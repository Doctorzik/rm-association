const router = require("express").Router();
const experiencecontroller = require("../controllers/experience");
const singleDocument = require("../middleware/index");
const authenticate = require("../middleware/authenticate");

router.get("/", experiencecontroller.getAllExperience); // get all experience

router.get(
  "/:id",

  experiencecontroller.getMemberExperience
); // get all experience by member id
router.post(
  "/",
  authenticate.isAuthenticated,
  experiencecontroller.createExperience
); // post an experience
router.delete(
  "/:id",
  authenticate.isAuthenticated,
  singleDocument.missionaryExperienceSingleDocument,
  experiencecontroller.deleteExperience
); // Delete an experinece
router.patch(
  "/:id",
  authenticate.isAuthenticated,
  singleDocument.missionaryExperienceSingleDocument,
  experiencecontroller.patchExperience
); // Pacth an experince

module.exports = router;

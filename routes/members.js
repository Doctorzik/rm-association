const router = require("express").Router();

const memberController = require("../controllers/members");
const singleDocument = require("../middleware/index");
const authenticate = require("../middleware/authenticate")

router.get("/", memberController.getAllMembers);

router.get(
  "/:id",
  singleDocument.memberSingleDocument,
  memberController.getSingleMemberById
);

router.post("/", authenticate.isAuthenticated, memberController.createMember);

router.delete(
  "/:id",
  authenticate.isAuthenticated,
  singleDocument.memberSingleDocument,
  memberController.deleteMember
);

router.put(
  "/:id",
  authenticate.isAuthenticated,
  singleDocument.memberSingleDocument,
  memberController.updateMember
);

module.exports = router;

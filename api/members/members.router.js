const router = require("express").Router();
const { checkToken } = require("../../auth/token_validation");
const {
  createMember,
  MemberLogin,
  getMemberById
} = require("./members.controller");

router.post("/", createMember);
router.post("/login", MemberLogin);
router.get("/:id", checkToken, getMemberById);


module.exports = router;

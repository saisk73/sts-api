const router = require("express").Router();
const { checkToken } = require("../../auth/token_validation");
const {
  createMember,
  MemberLogin,
  getMemberById,
  getSpouseBymemberId,
  getChildrensBymemberId,
  TestMail
} = require("./members.controller");

router.post("/", createMember);
router.post("/login", MemberLogin);
router.get("/", checkToken, getMemberById);
router.get("/spouse/", checkToken, getSpouseBymemberId);
router.get("/childrens/", checkToken, getChildrensBymemberId);
router.get("/mail", checkToken, TestMail);


module.exports = router;

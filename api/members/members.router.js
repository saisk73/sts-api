const router = require("express").Router();
const { checkToken } = require("../../auth/token_validation");
const {
  createMember,
  MemberLogin,
  getMemberById,
  getSpouseBymemberId,
  getChildrensBymemberId,
  updateUsers,
  changepasswordBymemberId,
  Forgotpassword,
  Updatememberpassword,
  VerifyEmail,
  VerifyOtp,
  UpdateSpouse,
  UpdateChildrens,
  UpdateMemberShip,
  TestMail
} = require("./members.controller");

router.post("/", createMember);
router.post("/login", MemberLogin);
router.get("/", checkToken, getMemberById);
router.get("/spouse", checkToken, getSpouseBymemberId);
router.get("/childrens", checkToken, getChildrensBymemberId);
router.patch("/reset", updateUsers);
router.post("/changepassword", checkToken, changepasswordBymemberId);
router.patch("/forgotpassword", Forgotpassword);
router.patch("/updatepassword", Updatememberpassword);
router.get("/mail", TestMail);
router.patch("/verifyemail",VerifyEmail);
router.patch("/verifyotp",VerifyOtp);
router.patch("/updatespouse", checkToken, UpdateSpouse);
router.patch("/updatechildrens", checkToken, UpdateChildrens);
router.patch("/updatemembership", checkToken, UpdateMemberShip);

module.exports = router;

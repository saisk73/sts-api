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
  VerifyLoginOtp,
  AdminLogin,
  VerifyAdminLoginOtp,
  getMembersList,
  UpdateMemberVerifyStatus,
  getMemberDetails,
  TestMail
} = require("./members.controller");

router.post("/", createMember);
router.post("/login", MemberLogin);
router.post("/verifyloginotp", VerifyLoginOtp);
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

router.post("/adminlogin", AdminLogin);
router.post("/verifyAdminLoginotp", VerifyAdminLoginOtp);
router.get("/memberslist", checkToken, getMembersList);
router.get("/memberdetails/:id", checkToken, getMemberDetails);
router.get("/updatememberverifystatus", checkToken, UpdateMemberVerifyStatus);






module.exports = router;

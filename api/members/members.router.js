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
  ForgotUser,
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
  getVerifiedMembersList,
  UpdateMemberVerifyStatus,
  getMemberDetails,
  MemberShipRenewal,
  getArrearsDetails,
  UpdateVerifyEmail,
  UpdateVerifyOtp,
  UploadProfileImage,
  RenewalWithArrears,
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
router.post("/forgotuser", ForgotUser);
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
router.get("/verifiedmemberslist", checkToken, getVerifiedMembersList);
router.get("/memberdetails/:id", checkToken, getMemberDetails);
router.post("/updatememberverifystatus", checkToken, UpdateMemberVerifyStatus);

router.patch("/membershiprenewal", checkToken, MemberShipRenewal);
router.patch("/updateverifyemail",UpdateVerifyEmail);
router.patch("/updateverifyotp",UpdateVerifyOtp);

router.get("/arrearsdetails", checkToken, getArrearsDetails);
router.patch("/renewalwitharrears", checkToken, RenewalWithArrears);


router.post("/uploadprofileimage",checkToken,UploadProfileImage);








module.exports = router;

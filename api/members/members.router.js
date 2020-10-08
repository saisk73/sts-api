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
  RejectMemberShip,
  getMemberDetails,
  MemberShipRenewal,
  getArrearsDetails,
  UpdateVerifyEmail,
  UpdateVerifyOtp,
  UploadProfileImage,
  RenewalWithArrears,
  AddSliders,
  getSliders,
  DeleteSlider,
  AddSponsor,
  getSponsor,
  DeleteSponsor,
  AddMedia,
  getMedia,
  DeleteMedia,
  AboutUs,
  getAboutUs,
  AddNewsLetter,
  getNewsLetter,
  DeleteNewsLetter,
  AddForums,
  getForums,
  DeleteForums,
  AddVolunteer,
  getVolunteer,
  AddNewsGallery,
  getNewsGallery,
  DeleteNewsGallery,
  AddPhotoGallery,
  getPhotoGallery,
  DeletePhotoGallery,
  AddVideoGallery,
  getVideoGallery,
  DeleteVideoGallery,
  UpdateMemberShipByTreasurer,
  ChangeMemberPasswordByTreasurer,
  TerminateMember,
  MemberShipPaymentsHistory,
  EventsPaymentsHistory,
  AddDownloadRequest,
  UpdateDownloadRequest,
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
router.post("/updatememberverifystatus", UpdateMemberVerifyStatus);
router.post("/rejectmembership", RejectMemberShip);

router.post("/addsliders", AddSliders);
router.get("/sliders", getSliders);
router.get("/deletesliders/:id", DeleteSlider);

router.post("/addsponsors", AddSponsor);
router.get("/sponsors", getSponsor);
router.get("/deletesponsor/:id", DeleteSponsor);

router.post("/addmedia", AddMedia);
router.get("/media", getMedia);
router.get("/deletemedia/:id", DeleteMedia);

router.post("/addnewsletter", AddNewsLetter);
router.get("/newsletter", getNewsLetter);
router.get("/deletenewsletter/:id", DeleteNewsLetter);

router.post("/addforums", AddForums);
router.get("/forums", getForums);
router.get("/deleteforums/:id", DeleteForums);

router.post("/volunteer", AddVolunteer);
router.get("/volunteer", getVolunteer);


router.post("/aboutus", AboutUs);
router.get("/aboutus", getAboutUs);

router.post("/addnewsgallery", AddNewsGallery);
router.get("/newsgallery", getNewsGallery);
router.get("/deletenewsgallery/:id", DeleteNewsGallery);

router.post("/addphotogallery", AddPhotoGallery);
router.get("/photogallery", getPhotoGallery);
router.get("/deletephotogallery/:id", DeletePhotoGallery);

router.post("/addvideogallery", AddVideoGallery);
router.get("/videogallery", getVideoGallery);
router.get("/deletevideogallery/:id", DeleteVideoGallery);




router.patch("/membershiprenewal", checkToken, MemberShipRenewal);
router.patch("/updateverifyemail",UpdateVerifyEmail);
router.patch("/updateverifyotp",UpdateVerifyOtp);

router.get("/arrearsdetails", checkToken, getArrearsDetails);
router.patch("/renewalwitharrears", checkToken, RenewalWithArrears);


router.post("/uploadprofileimage",checkToken,UploadProfileImage);

router.post("/updatemembershipbytreasurer",checkToken,UpdateMemberShipByTreasurer);
router.post("/changememberpasswordbytreasurer",checkToken,ChangeMemberPasswordByTreasurer);
router.post("/terminatemember",checkToken,TerminateMember);
router.get("/membershippaymentshistory",checkToken,MemberShipPaymentsHistory);
router.get("/eventspaymentshistory",checkToken,EventsPaymentsHistory);
router.post("/adddownloadrequest",checkToken,AddDownloadRequest);
router.post("/updatedownloadrequest",checkToken,UpdateDownloadRequest);










module.exports = router;

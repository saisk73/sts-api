const router = require("express").Router();
const { checkToken } = require("../../auth/token_validation");
const upload = require("../../middlewares/upload");
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
  DeleteChild,
  UpdateMemberShip,
  MemberShipUpdate,
  MemberShipHistory,
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
  StartTransaction,
  CheckTransaction,
  getDownloadRequests,
  getMyDownloadRequests,
  VerifyMemberShip,
  getPaymentsDetails,
  AddIntroduction,
  getIntroduction,
  getNewsLetterById,
  getForumsById,
  getRejectedMembersList,
  UploadMembersData,
  getTerminatedMembersList,
  UpdateMemberStatus,
  InvoiceConfig,
  getInvoiceConfig,
  EmailSmtp,
  getEmailSmtp,
  GateWay,
  getGateWayStatus,
  EmailTemplate,
  getEmailTemplate,
  AddEvent,
  getEvents,
  getEventById,
  DeleteEvent,
  getUpcomingEvents,
  getPastEvents,
  getRecentEvents,
  changemailidBymemberId,
  addeventimages,
  DeleteEventImage,
  getEventImages,
  AddCommitee,
  getCommitee,
  getCommitteeById,
  getCommiteeDesignations,
  AddCommiteeMembers,
  getCommiteeMembers,
  getCommitteeMemberById,
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
router.post("/changemailidbymember", checkToken, changemailidBymemberId);
router.patch("/forgotpassword", Forgotpassword);
router.post("/forgotuser", ForgotUser);
router.patch("/updatepassword", Updatememberpassword);
router.get("/mail", TestMail);
router.patch("/verifyemail",VerifyEmail);
router.patch("/verifyotp",VerifyOtp);
router.patch("/updatespouse", checkToken, UpdateSpouse);
router.patch("/updatechildrens", checkToken, UpdateChildrens);
router.patch("/updatemembership", checkToken, UpdateMemberShip);
router.patch("/membershipupdate", checkToken, MemberShipUpdate);
router.get("/membershiphistory", checkToken, MemberShipHistory);
router.get("/deletechild/:id", DeleteChild);

router.post("/verifymembership",VerifyMemberShip);

router.post("/starttransaction", StartTransaction);
router.post("/checktransaction", CheckTransaction);

router.post("/adminlogin", AdminLogin);
router.post("/verifyAdminLoginotp", VerifyAdminLoginOtp);
router.get("/memberslist", checkToken, getMembersList);
router.get("/verifiedmemberslist", checkToken, getVerifiedMembersList);
router.get("/memberdetails/:id", checkToken, getMemberDetails);
router.post("/updatememberverifystatus", UpdateMemberVerifyStatus);
router.post("/rejectmembership", RejectMemberShip);
router.get("/rejectedmemberslist", checkToken, getRejectedMembersList);
router.get("/terminatedmemberslist", checkToken, getTerminatedMembersList);
router.post("/updatememberstatus", UpdateMemberStatus);


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
router.get("/newsletter/:id", getNewsLetterById);

router.post("/addforums", AddForums);
router.get("/forums", getForums);
router.get("/deleteforums/:id", DeleteForums);
router.get("/forums/:id", getForumsById);

router.post("/volunteer", AddVolunteer);
router.get("/volunteer", getVolunteer);


router.post("/aboutus", AboutUs);
router.get("/aboutus", getAboutUs);

router.post("/introduction", AddIntroduction);
router.get("/introduction", getIntroduction);

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

router.post("/updatemembershipbytreasurer",UpdateMemberShipByTreasurer);
router.post("/changememberpasswordbytreasurer",checkToken,ChangeMemberPasswordByTreasurer);
router.post("/terminatemember",checkToken,TerminateMember);
router.get("/membershippaymentshistory",checkToken,MemberShipPaymentsHistory);
router.get("/eventspaymentshistory",checkToken,EventsPaymentsHistory);
router.post("/adddownloadrequest",checkToken,AddDownloadRequest);
router.post("/updatedownloadrequest",checkToken,UpdateDownloadRequest);
router.get("/alldownloadrequests",checkToken,getDownloadRequests);
router.get("/mydownloadrequests",checkToken,getMyDownloadRequests);

router.get("/paymentdetails/:id",checkToken,getPaymentsDetails);
router.post("/uploadfile",upload.single("file"),UploadMembersData);

router.post("/conf_invoice", InvoiceConfig);
router.get("/conf_invoice", getInvoiceConfig);

router.post("/emailsmtp", EmailSmtp);
router.get("/emailsmtp", getEmailSmtp);

router.post("/gateway", GateWay);
router.get("/gateway", getGateWayStatus);

router.post("/emailtemplate", EmailTemplate);
router.get("/emailtemplate", getEmailTemplate);

router.post("/addevent", AddEvent);
router.get("/events", getEvents);
router.get("/events/:id", getEventById);
router.get("/deleteevent/:id", DeleteEvent);

router.get("/upcomingevents", getUpcomingEvents);
router.get("/pastevents", getPastEvents);
router.get("/recentevents", getRecentEvents);

router.post("/addeventimages", addeventimages);
router.get("/deleteeventimage/:id", DeleteEventImage);
router.get("/eventimages/:event_id", getEventImages);

router.post("/addcommitee", AddCommitee);
router.get("/commitee", getCommitee);
router.get("/committee/:id", getCommitteeById);

router.get("/commiteedesignations", getCommiteeDesignations);

router.post("/commiteemembers", AddCommiteeMembers);
router.get("/commiteemembers/:committee_id", getCommiteeMembers);
router.get("/commiteemember/:id", getCommitteeMemberById);


module.exports = router;

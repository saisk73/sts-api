const pool = require("../../config/database");
const {
 createMember,
 createSpouseMember,
 createChildrens,
 getUserByMemberEmail,
 AddMemberOtp,
 getMemberById,
 getSpouseBymemberId,
 getChildrensBymemberId,
 // ResetPassword, 
 getUserBymembermerificationid,
 updateUsers,
 changepasswordBymemberId,
 updateUsersVerification,
// Forgotpassword,
Updatememberpassword,
Updatepassworddetails,
getMemberotpverification,
// VerifyEmail,
// VerifyOtp,
deleteOtp,
UpdateSpouse,
UpdateChildrens,
DeleteChild,
UpdateMemberShipByMember,
UpdateMemberByMemberId,
UpdateSpouseBySpouseId,
UpdateMemberShip_spouse,
UpdateMemberShip_SpouseInactive,
UpdateMemberShip_ChildrensInactive,
UpdateMemberShipBySpouse,
UpdateMemberShip_Member,
createMemberShipHistory,
createMemberShipHistory1,
MemberShipHistory,
UpdateLoginOtp,
getAdminByMemberEmail,
UpdateAdminLoginOtp,
getMembersList,
getVerifiedMembersList,
UpdateMemberVerifyStatus,
UpdateSpouseVerifyStatus,
getMemberDetails,
createMemberLoginHistory,
MemberShipRenewalByMember,
MemberShipRenewalBySpouse,
UploadProfileImage,
UpdateMemberShipDetails,
ForgotUser,
InactiveSpouseMemberShip,
InactiveMemberShip,
Createsliders,
getSliders,
DeleteSlider,
CreateSponsor,
getSponsor,
DeleteSponsor,
CreateMedia,
getMedia,
DeleteMedia,
CreateAboutus,
UpdateAboutus,
getAboutUs,
CreateNewsLetter,
getNewsLetter,
DeleteNewsLetter,
CreateForum,
getForums,
DeleteForums,
CreateVolunteerImage,
CreateVolunteerDescription,
UpdateVolunteerImage,
UpdateVolunteerDescription,
getVolunteer,
CreateNewsGallery,
getNewsGallery,
DeleteNewsGallery,
CreatePhotoGallery,
getPhotoGallery,
DeletePhotoGallery,
CreateVideoGallery,
getVideoGallery,
DeleteVideoGallery,
TerminateMember,
TerminateSpouse,
UpdateMemberShipByTreasurer,
UpdateSpouseMemberShipByTreasurer,
getMemberShipHistoryByMemberId,
MemberShipPaymentsHistory,
EventsPaymentsHistory,
AddDownloadRequest,
UpdateDownloadRequestByPresident,
UpdateDownloadRequestBySecretery,
StartTransaction,
CheckTransaction,
createAdminLoginHistory,
getEventsHistoryByMemberId,
getDownloadRequests,
getMyDownloadRequests,
getLastLerialNumber,
deleteOldMemberOtp,
VerifyMemberShip,
getPaymentsDetails,
CreateIntroduction,
UpdateIntroduction,
UpdateNewsGallery,
UpdateNewsGallerywithimage,
UpdateNewsLetterwithimage,
UpdateNewsLetter,
UpdateForumwithimg,
UpdateForum,
getNewsLetterById,
getForumsById,
getRejectedMembersList,
getTerminatedMembersList,
UpdateMemberVerify_Status,
getInvoiceConfig,
UpdateInvoiceConfig,
CreateInvoiceConfig,
getEmailSmtp,
UpdateEmailSmtp,
CreateEmailSmtp,
getGateWayStatus,
CreateGateWayStatus,
UpdateGateWayStatus,
CreateEmailTemplate,
UpdateEmailTemplate,
getEmailTemplate,
getEmailTemplatecheck,
createMemberByExcel,
createSpouseMemberByExcel,
createChildrensByExcel,
CreateEvent,
UpdateEvent,
UpdateEventwithimg,
getEvents,
getEventById,
DeleteEvent,
getUpcomingEvents,
getPastEvents,
getRecentEvents,
changeemailidBymemberId,
addeventimages,
DeleteEventImage,
getEventImages,
UpdateCommitee,
AddCommitee,
getCommitee,
getCommitteeById,
getCommiteeDesignations,
AddCommiteeMembers,
UpdateCommiteeMemberswithimg,
UpdateCommiteeMembers,
getCommiteeMembers,
getCommitteeMemberById,
addService,
UpdateServicewithimg,
UpdateService,
getServices,
getServiceById,
getServiceContents,
addServiceContent,
UpdateServiceContent,
getServiceGallery,
addServiceGallery,
DeleteServiceGallery,
getEventstypes,
AddEventBooking,
CheckMemberShipid,
getEventBookings,
getMemberEventsBookings,
getEventbookingById,
CreateEventType,
UpdateEventType

} = require("./members.service");
require("dotenv").config();
const ejs = require("ejs");
const path=require("path");
const { hashSync, genSaltSync, compareSync } = require("bcryptjs");
const { sign } = require("jsonwebtoken");
var imageDataURI = require('image-data-uri');
var moment = require('moment');
var preciseDiff = require('moment-precise-range-plugin');
var nodeMailer = require('nodemailer');
var current_date =  moment().format('YYYY-MM-DD');
var current_year =  moment().format('YYYY');
var current_datetime =  moment().format('YYYY-MM-DD HH:mm:ss');
var otpexpiry_datetime = moment(current_datetime).add(10, 'minutes').format('YYYY-MM-DD HH:mm:ss');

const fs = require('fs');
const mysql = require('mysql');
const multer = require('multer');
const express = require('express');
const readXlsxFile = require('read-excel-file/node');
const app = express(); 
global.__basedir = __dirname;




var rand,rand2,host,link,links,linkse,rand3;
module.exports = {
  createMember: (req, res) => {
    const body = req.body;
    // console.log(body);
    body.created_on = current_date;
    const salt = genSaltSync(10);
    body.password = hashSync(body.password, salt);
    getUserByMemberEmail(body.email, (err, results) => {
      if (err) {
        console.log(err);
      }
      if (results) {
        return res.json({
          success: 0,
          data: "Email already exist."
        });
      }
 
    if(body.membershiptype_id==1 || body.membershiptype_id==2){
      getLastLerialNumber(current_year,(err, sresult) => {  
        if (sresult) {
          var serial_no = sresult.serial_no+1;
        }else{
          var serial_no = 10001;
        }
      // var uniqueid = new Date().valueOf();
      // body.registration_id = uniqueid;
      body.serial_no = serial_no;
      body.registration_id = 'STS-'+current_year+'-'+serial_no;
      body.member_id = '';
      body.member_type = 0;
      //Create MEmbership end date-start
      body.membership_enddate = null;
    if(body.membershiptype_id==1){
    var d = new Date();
    var year = d.getFullYear();
    var month = d.getMonth();
    var day = d.getDate();
    var fulldate = new Date(year + 1, month, day);
    var toDate = fulldate.toISOString().slice(0, 10);
    body.membership_enddate = toDate;
    body.membership_type = 0;
    }else{
      body.membership_type = 1;
    }
    //Create MEmbership end date-end

        rand3=Math.floor((Math.random() * 30000000000000000) + 34);
        body.member_verifycode=rand3;
      createMember(body, (err, results) => {
      if (err) {
        console.log(err);
        return res.status(500).json({
          success: 0,
          message: "Database connection errror"
        });
      }
      // console.log(results.insertId);
      //Create Membership History - Start
      body.id = results.insertId;
      body.created_on=current_date;
      createMemberShipHistory(body, (err, results) => {
       if(err){
          console.log(err);
        }
      });
    //Create Membership History - End

      // //mail Sending//
    
  // host=req.get('host');
  host= process.env.WEB_URL;
  linkse="https://"+host+"/setpassword?token="+rand3;
       let transporter = nodeMailer.createTransport({
          host: 'mail.sts.org.sg',
          port: 465,
          secure: true,
          auth: {
              user: 'newinfo@sts.org.sg',
              pass: '@STSnewinfo1'
          }
      });
          let emailTemplatems;
    ejs
    .renderFile(path.join(__dirname, "views/member_welcome.ejs"), {
      user_firstname: req.body.full_name,
      confirm_link:"https://"+host+"/setpassword?token=" + rand3
    })
  .then(result => {
    emailTemplatems=result;
      let mailOptions = {
          from: 'newinfo@sts.org.sg', // sender address
          to: req.body.email,// list of receivers
          subject: 'New Member Registration', // Subject line
          text:'Thankyou for registering with STS', // plain text body
         //html : "Hello,"+req.body.full_name+" Thankyou for register with STS<br> Please Click on the link to verify your email.<br><a href="+linkse+">Click here to verify</a>"  // html body
     html:emailTemplatems
      };
      transporter.sendMail(mailOptions, (error, info) => {
          if (error) {
              return console.log(error);
          }
          console.log('Message %s sent: %s', info.messageId, info.response);
              res.render('index');
         })});
  
      // //mail Send//
      return res.status(200).json({
        success: 1,
        data: results
      });
    });
  })
    }else{
      getLastLerialNumber(current_year,(err, sresult) => {  
        if (sresult) {
          var serial_no = sresult.serial_no+1;
        }else{
          var serial_no = 10001;
        }
        // console.log(sresult);
      // var uniqueid = new Date().valueOf();
      // body.registration_id = uniqueid;
      body.serial_no = serial_no;
      body.registration_id = 'STS-'+current_year+'-'+serial_no;
      body.member_id = '';
      body.member_type = 0;
      var member_insertid = '';
      rand=Math.floor((Math.random() * 10000000000000000) + 94);
       body.member_verifycode=rand;

      //Create MEmbership end date-start
      body.membership_enddate = null;
    if(body.membershiptype_id==3){
    var d = new Date();
    var year = d.getFullYear();
    var month = d.getMonth();
    var day = d.getDate();
    var fulldate = new Date(year + 1, month, day);
    var toDate = fulldate.toISOString().slice(0, 10);
    body.membership_enddate = toDate;
    body.membership_type = 0;
    }else{
      body.membership_type = 1;
    }
    //Create MEmbership end date-end 
    createMember(body, (err, results) => {
      if (err) {
        console.log(err);
        return res.status(500).json({
          success: 0,
          message: "Database connection errror"
        });
      }

          //Create Membership History - Start
          body.id = results.insertId;
          body.created_on=current_date;
          createMemberShipHistory(body, (err, results) => {
           if(err){
              console.log(err);
            }
          });
        //Create Membership History - End

      
  // host=req.get('host');
  host= process.env.WEB_URL;
  link="https://"+host+"/setpassword?token="+rand;
      body.member_id = '';
      var member_insertid = '';
   
       let transporter = nodeMailer.createTransport({
          host: 'mail.sts.org.sg',
          port: 465,
          secure: true,
          auth: {
              user: 'newinfo@sts.org.sg',
              pass: '@STSnewinfo1'
          }
      });
     
        let emailTemplate;
    ejs
    .renderFile(path.join(__dirname, "views/member_welcome.ejs"), {
      user_firstname: req.body.full_name,
      confirm_link:"https://"+host+"/setpassword?token=" + rand
    })
  .then(result => {
      emailTemplate = result;
      let mailOptions = {
          from: 'newinfo@sts.org.sg', // sender address
          to: req.body.email,// list of receivers
          subject: 'New Member Registration', // Subject line
          text:'Thankyou for registering with STS', // plain text body
         //html : "Hello,"+req.body.full_name+" Thankyou for register with STS<br> Please Click on the link to verify your email.<br><a href="+link+">Click here to verify</a>"  // html body
      html: emailTemplate
      };
      transporter.sendMail(mailOptions, (error, info) => {
          if (error) {
              return console.log(error);
          }
          console.log('Message %s sent: %s', info.messageId, info.response);
              res.render('index');
          })});
    



      var member_insertid = results.insertId;
      const arr = body.childrens;
      if(arr){
    arr.forEach(element => { 
    element.member_id = member_insertid;
   createChildrens(element, (err, results) => {
      if (err) {
        console.log(err);
        return res.status(500).json({
          success: 0,
          message: "Database connection errror"
        });
      }
    });
     });
    }
    body.member_id = member_insertid;
    body.member_type = 1;
     //Create MEmbership end date-start
      body.membership_enddate = null;
    if(body.membershiptype_id==3){
    var d = new Date();
    var year = d.getFullYear();
    var month = d.getMonth();
    var day = d.getDate();
    var fulldate = new Date(year + 1, month, day);
    var toDate = fulldate.toISOString().slice(0, 10);
    body.membership_enddate = toDate;
    body.membership_type = 0;
    }else{
      body.membership_type = 1;
    }

    getLastLerialNumber(current_year,(err, spresult) => {  
      if (spresult) {
        var serial_no = spresult.serial_no+1;
      }else{
        var serial_no = 10001;
      }

    //Create MEmbership end date-end
    body.serial_no = serial_no;
    body.registration_id = 'STS-'+current_year+'-'+serial_no;
    // body.registration_id = uniqueid+'S';
    rand2=Math.floor((Math.random() * 20000000000000000) + 54);
    body.member_verifycode=rand2;
    createSpouseMember(body, (err, results) => {
      if (err) {
        console.log(err);
        return res.status(500).json({
          success: false,
          message: "Database connection error"
        });
      }

  
  // host=req.get('host');
  host= process.env.WEB_URL;
  links="https://"+host+"/setpassword?token="+rand2;
  
        let emailTemplates;
    ejs
    .renderFile(path.join(__dirname, "views/index.ejs"), {
      user_firstname: req.body.s_full_name,
      confirm_link:"https://"+host+"/setpassword?token=" + rand2
    })  .then(result => {
      emailTemplates = result;
     let mailOptionse = {
          from: 'newinfo@sts.org.sg', // sender address
          to: req.body.s_email,// list of receivers
          subject: 'New Member Registration', // Subject line
          text:'Thankyou for registering with STS', // plain text body
          //html : "Hello,"+req.body.full_name+" Thankyou for register with STS<br> Please Click on the link to verify your email.<br><a href="+links+">Click here to verify</a>"  // html body
      html:emailTemplates
      };
      transporter.sendMail(mailOptionse, (error, info) => {
          if (error) {
              return console.log(error);
          }
          console.log('Message %s sent: %s', info.messageId, info.response);
              res.render('index');
          })});

      return res.status(200).json({
        success: true,
        data: results
      });
    });
  })

    });
  })
    }
  });

  },

    MemberLogin: (req, res) => {
    const body = req.body;
    getUserByMemberEmail(body.email, (err, results) => {
      if (err) {
        console.log(err);
      }
      if (!results) {
        return res.json({
          success: 2,
          data: "Email doesn't exist"
        });
      }
      const result = compareSync(body.password, results.password);
      if (result) {
        var digits = '0123456789'; 
    let OTP = ''; 
    for (let i = 0; i < 6; i++ ) { 
        OTP += digits[Math.floor(Math.random() * 10)]; 
    } 
   body.login_otp = OTP;
   body.id= results.id;
   var current_datetime =  moment().format('YYYY-MM-DD HH:mm:ss');
   var otpexpiry_datetime = moment(current_datetime).add(10, 'minutes').format('YYYY-MM-DD HH:mm:ss');
   body.otpexpiry_datetime = otpexpiry_datetime;
   console.log(body);
    UpdateLoginOtp(body, (err, results) => {
    let transporter = nodeMailer.createTransport({
          host: 'mail.sts.org.sg',
          port: 465,
          secure: true,
          auth: {
              user: 'otp@sts.org.sg',
              pass: '@STSotpsend1'
          }
      });
          let emailTemplatemswaw;
    ejs
    .renderFile(path.join(__dirname, "views/loginotp.ejs"), {
      user_firstname: req.body.full_name,
      user_otp:body.login_otp

    })
  .then(result => {
    emailTemplatemswaw=result;
      let mailOptions = {
          from: 'otp@sts.org.sg', // sender address
          to: req.body.email,// list of receivers
          subject: 'Otp Verification', // Subject line
          text:'Please Verify Your Otp', // plain text body
         //html : "Hello,"+req.body.full_name+" Thankyou for register with STS<br> Please Click on the link to verify your email.<br><a href="+linkse+">Click here to verify</a>"  // html body
     html:emailTemplatemswaw
      };
      transporter.sendMail(mailOptions, (error, info) => {
          if (error) {
              return console.log(error);
          }
          console.log('Message %s sent: %s', info.messageId, info.response);
              res.render('index');
         })});
    
      if (err) {
        console.log(err);
    
        return;
      }
      return res.json({
        success: 1,
        message: "Otp sent to your email please verify it"
  
      });
    });



        // results.password = undefined;
        // const jsontoken = sign({ result: results }, "qwe1234", {
        //   expiresIn: "1h"
        // });
        // return res.json({
        //   success: 1,
        //   message: "login successfully",
        //   token: jsontoken
        // });

      } else {
        return res.json({
          success: 0,
          data: "Invalid email or password"
        });
      }
    });
  },

      MemberLogin: (req, res) => {
    const body = req.body;
    getUserByMemberEmail(body.email, (err, results) => {
      if (err) {
        console.log(err);
      }
      if (!results) {
        return res.json({
          success: 2,
          data: "Email doesn't exist"
        });
      }
      const result = compareSync(body.password, results.password);
      if (result) {
        var digits = '0123456789'; 
    let OTP = ''; 
    for (let i = 0; i < 6; i++ ) { 
        OTP += digits[Math.floor(Math.random() * 10)]; 
    } 
   body.login_otp = OTP;
   body.id= results.id;
    UpdateLoginOtp(body, (err, results) => {
    let transporter = nodeMailer.createTransport({
          host: 'mail.sts.org.sg',
          port: 465,
          secure: true,
          auth: {
              user: 'otp@sts.org.sg',
              pass: '@STSotpsend1'
          }
      });
          let emailTemplatemswaw;
    ejs
    .renderFile(path.join(__dirname, "views/loginotp.ejs"), {
      user_firstname: req.body.full_name,
      user_otp:body.login_otp

    })
  .then(result => {
    emailTemplatemswaw=result;
      let mailOptions = {
          from: 'otp@sts.org.sg', // sender address
          to: req.body.email,// list of receivers
          subject: 'Otp Verification', // Subject line
          text:'Please Verify Your Otp', // plain text body
         //html : "Hello,"+req.body.full_name+" Thankyou for register with STS<br> Please Click on the link to verify your email.<br><a href="+linkse+">Click here to verify</a>"  // html body
     html:emailTemplatemswaw
      };
      transporter.sendMail(mailOptions, (error, info) => {
          if (error) {
              return console.log(error);
          }
          console.log('Message %s sent: %s', info.messageId, info.response);
              res.render('index');
         })});
    
      if (err) {
        console.log(err);
    
        return;
      }
      return res.json({
        success: 1,
        message: "Otp sent to your email please verify it"
  
      });
    });



        // results.password = undefined;
        // const jsontoken = sign({ result: results }, "qwe1234", {
        //   expiresIn: "1h"
        // });
        // return res.json({
        //   success: 1,
        //   message: "login successfully",
        //   token: jsontoken
        // });

      } else {
        return res.json({
          success: 0,
          data: "Invalid email or password"
        });
      }
    });
  },

  VerifyLoginOtp: (req, res) => {
    const body = req.body;
    getUserByMemberEmail(body.email, (err, results) => {
      if (err) {
        console.log(err);
      }
      if(results){
      if (body.otp==results.login_otp) {
        results.password = undefined;
        const jsontoken = sign({ result: results }, "qwe1234", {
          expiresIn: "24h"
        });

    createMemberLoginHistory(results, (err, results) => {
      if (err) {
        console.log(err);
        return res.status(500).json({
          success: 0,
          message: "Database connection errror"
        });
      }
    });


        return res.json({
          success: 1,
          message: "login successfully",
          token: jsontoken
        });

      } else {
        return res.json({
          success: 0,
          data: "Invalid OTP1"
        });
      }
    }else{
      return res.json({
          success: 0,
          data: "Invalid OTP2"
        });
    }

    });
  },

getMemberById: (req, res) => {
    const id = req.decoded.result.id;
    getMemberById(id, (err, results) => {
      if (err) {
        console.log(err);
        return;
      }
      if (!results) {
        return res.json({
          success: 0,
          message: "Record not Found"
        });
      }
      results.password = undefined;
      return res.json({
        success: 1,
        data: results
      });
    });
  },

  getSpouseBymemberId: (req, res) => {
    const id = req.decoded.result.id;
    getSpouseBymemberId(id, (err, results) => {
      if (err) {
        console.log(err);
        return;
      }
      if (!results) {
        getMemberById(id, (err, results1) => {
          if (err) {
            console.log(err);
            return;
          }
          getMemberById(results1.member_id, (err, results2) => {
            if (err) {
              console.log(err);
              return;
            }
        if(!results2){
        return res.json({
          success: 0,
          message: "Record not Found"
        });
      }

      results2.password = undefined;
      return res.json({
        success: 1,
        data: results2
      });
      })
      })
      }else{
      // results.password = undefined;
      // console.log('hi');
      return res.json({
        success: 1,
        data: results
      });
    }
    });
  },

   getChildrensBymemberId: (req, res) => {
    const id = req.decoded.result.id;
    getChildrensBymemberId(id, (err, results) => {
      if (err) {
        console.log(err);
        return;
      }
      if (!results) {
        getMemberById(id, (err, results1) => {
          if (err) {
            console.log(err);
            return;
          }



        return res.json({
          success: 0,
          message: "Record not Found"
        });
      })
      }else{
      // results.password = undefined;
      return res.json({
        success: 1,
        data: results
      });
    }
    });
  },

  getArrearsDetails: (req, res) => {
    const id = req.decoded.result.id;
    getMemberById(id, (err, results) => {
      if (err) {
        console.log(err);
        return;
      }
      var date1 = new Date(results.membership_enddate);
      var date2 = new Date(current_date);
      if(date2>date1){
      var m1 = moment(results.membership_enddate);
      var m2 = moment(current_date);
      var diff = moment.preciseDiff(m1, m2,true);
      var membership_amount = results.membership_amount;
      var years = diff.years;
      var months = diff.months;
      var total = (years*membership_amount+(months*membership_amount/12)).toFixed(2);
      return res.json({
        success: 1,
        membership_type : results.membershiptype_id,
        last_date: results.membership_enddate,
        pending_amount : total,
        years : diff
      });
    }else{
      return res.json({
        success: 0
      });
    }
    });
  },

updateUsers: (req, res) => {
    const body = req.body;
  getUserBymembermerificationid(body.member_verifycode, (err, results) => {
         if (err) {
        console.log(err);
      }
      if (!results) {
        return res.json({
          success: 0,
          mesagee: "Invalid Verification Code"
        });
      }else{
    const salt = genSaltSync(10);
   body.password = hashSync(body.password, salt);
    updateUsers(body, (err, results) => {
      if (err) {
        console.log(err);
    
        return;
      }
      return res.json({
        success: 1,
        message: "updated successfully"
      });
    })}; 
  });
  },
 VerifyOtp: (req, res) => {
    const body = req.body;

  getMemberotpverification(body.member_verifyotp,body.member_email, (err, results) => {
         if (err) {
        console.log(err);
      }
    
      if (!results) {
        return res.json({
          success: 0,
          mesagee: "Invalid  Otp Code"
        });
      }
    else
    {
  
   
   body.member_verifyotpid = results.member_verifyotpid;
   
    deleteOtp(body, (err, results) => {
    
      if (err) {
        console.log(err);
    
        return;
      }
      return res.json({
        success: 1,
        message: "otp verified successfully"
      });
    })}; });
  },

VerifyMemberShip: (req, res) => {
    const body = req.body;
    VerifyMemberShip(body.email,body.nric, (err, results) => {
         if (err) {
        console.log(err);
          }
    
      if (!results) {
        return res.json({
          success: 0,
          mesagee: "No data found"
        });
      }else{
      return res.json({
        success: 1,
        message: "Data found"
      });
    }
  });
  },

VerifyEmail: (req, res) => {
    const body = req.body;
// console.log(body);
  getUserByMemberEmail(body.email, (err, results) => {
      if (err) {
        console.log(err);
      }
      if (results) {
        return res.json({
          success: 0,
          mesagee: "Email already registered with us"
        });
      }else{
var digits = '0123456789'; 
    let OTP = ''; 
    for (let i = 0; i < 6; i++ ) { 
        OTP += digits[Math.floor(Math.random() * 10)]; 
    } 
   body.member_verifyotp = OTP;
   body.created_on = current_date;
   var current_datetime =  moment().format('YYYY-MM-DD HH:mm:ss');
   var otpexpiry_datetime = moment(current_datetime).add(10, 'minutes').format('YYYY-MM-DD HH:mm:ss');
   body.otpexpiry_datetime = otpexpiry_datetime;
  deleteOldMemberOtp(body.email, (err, results1) => {
  AddMemberOtp(body, (err, results) => {
    let transporter = nodeMailer.createTransport({
          host: 'mail.sts.org.sg',
          port: 465,
          secure: true,
          auth: {
              user: 'otp@sts.org.sg',
              pass: '@STSotpsend1'
          }
      });
          let emailTemplatemswaw;
    ejs
    .renderFile(path.join(__dirname, "views/otp.ejs"), {
      user_firstname: req.body.full_name,
    user_otp:req.body.member_verifyotp

    })
  .then(result => {
    emailTemplatemswaw=result;
      let mailOptions = {
          from: 'otp@sts.org.sg', // sender address
          to: req.body.email,// list of receivers
          subject: 'Otp Verification', // Subject line
          text:'Please Verify Your Otp', // plain text body
         //html : "Hello,"+req.body.full_name+" Thankyou for register with STS<br> Please Click on the link to verify your email.<br><a href="+linkse+">Click here to verify</a>"  // html body
     html:emailTemplatemswaw
      };
      transporter.sendMail(mailOptions, (error, info) => {
          if (error) {
              return console.log(error);
          }
          console.log('Message %s sent: %s', info.messageId, info.response);
              res.render('index');
         })});
    
      if (err) {
        console.log(err);
    
        return;
      }
      return res.json({
        success: 1,
        message: "Otp sent to your email please verify it"
  
      });
    });
  })
  }
   });
  },

  changepasswordBymemberId: (req, res) => {
    const body = req.body;
    const id = req.decoded.result.id;
    body.id = id;
    const salt = genSaltSync(10);
    body.new_password = hashSync(body.new_password, salt);
  getMemberById(id, (err, results) => {
      if (err) {
        console.log(err);
        return;
      }
      if (!results) {
          return res.json({
          success: 0,
          message: "Record not Found"
        });
      }
  const result = compareSync(body.current_password, results.password);
  if(result){
       changepasswordBymemberId(body, (err, result) => {
      if (err) {
        console.log(err);
        return;
      }
      return res.json({
        success: 1,
        message: "updated successfully"
      });  
    });
    }else{
        return res.json({
          success: 0,
          data: "Invalid Current Password"
        });
      }
    });
  },

  changemailidBymemberId: (req, res) =>{
    const body = req.body;
    const id = req.decoded.result.id;
    body.id = id;
  getMemberById(id, (err, results) => {
      if (err) {
        console.log(err);
        return;
      }
      if (!results) {
          return res.json({
          success: 0,
          message: "Record not Found"
        });
      }
  // const result = compareSync(body.currentemailid, results.email);
  if(body.email == results.email){
       changeemailidBymemberId(body, (err, result) => {
      if (err) {
        console.log(err);
        return;
      }
      return res.json({
        success: 1,
        message: "updated successfully"
      });  
    });
    }else{
        return res.json({
          success: 0,
          data: "Invalid Current Mail ID"
        });
      }
    });
  },

  Updatememberpassword: (req, res) => {
    const body = req.body;

  getUserBymembermerificationid(body.member_verifycode, (err, results) => {
         if (err) {
        console.log(err);
      }
      if (!results) {
        return res.json({
          success: 0,
          mesagee: "Invalid Verification Code"
        });
      }
    else
    {
  
    const salt = genSaltSync(10);
   body.password = hashSync(body.password, salt);
   
    Updatepassworddetails(body, (err, results) => {
    
      if (err) {
        console.log(err);
    
        return;
      }
      return res.json({
        success: 1,
        message: "Password updated successfully"
      });
    })}; });
  },

  Forgotpassword: (req, res) => {
    const body = req.body;
    getUserByMemberEmail(body.email, (err, results) => {
         if (err) {
        console.log(err);
      }
      if (!results) {
        return res.json({
          success: 0,
          mesagee: "Email Not Found"
        });
      }else{
  
      rand4=Math.floor((Math.random() * 90000000000000000) + 34);
  // host=req.get('host');
      host= process.env.WEB_URL;
  linksef="https://"+host+"/setpassword?token="+rand4;
      body.member_verifycode=rand4;
      updateUsersVerification(body, (err, results) => {
        if (err) {
          console.log(err);
      
          return;
        }
       let transporter = nodeMailer.createTransport({
          host: 'mail.sts.org.sg',
          port: 465,
          secure: true,
          auth: {
              user: 'newinfo@sts.org.sg',
              pass: '@STSnewinfo1'
          }
      });
          let emailTemplatems;
    ejs
    .renderFile(path.join(__dirname, "views/index.ejs"), {
      user_firstname: results.full_name,
      confirm_link:"https://"+host+"/resetpassword?token=" + rand4
    })
  .then(result => {
    emailTemplatems=result;
      let mailOptions = {
          from: 'newinfo@sts.org.sg', // sender address
          to: req.body.email,// list of receivers
          subject: 'Forgot Password', // Subject line
          text:'Password Reset', // plain text body
         //html : "Hello,"+req.body.full_name+" Thankyou for register with STS<br> Please Click on the link to verify your email.<br><a href="+linkse+">Click here to verify</a>"  // html body
     html:emailTemplatems
      };

      transporter.sendMail(mailOptions, (error, info) => {
          if (error) {
              return console.log(error);
          }
          console.log('Message %s sent: %s', info.messageId, info.response);
              res.render('index');
  })});
  
      return res.json({
        success: 1,
        message: "Verification Sent successfully to your mail"
      });
    }) }; });
  },

  ForgotUser: (req, res) => {
    const body = req.body;
  getUserByMemberEmail(body.email, (err, results) => {
         if (err) {
        console.log(err);
          }
      if (!results) {
        return res.json({
          success: 0,
          mesagee: "Email Not Found"
        });
      }else{
  
      rand4=Math.floor((Math.random() * 90000000000000000) + 34);
  // host=req.get('host');
      host= process.env.WEB_URL;
  linksef="https://"+host+"/login";
      body.member_verifycode=rand4;
       let transporter = nodeMailer.createTransport({
          host: 'mail.sts.org.sg',
          port: 465,
          secure: true,
          auth: {
              user: 'newinfo@sts.org.sg',
              pass: '@STSnewinfo1'
          }
      });
          let emailTemplatems;
    ejs
    .renderFile(path.join(__dirname, "views/forgotuser.ejs"), {
      user_firstname: results.full_name,
      confirm_link:"https://"+host+"/api/members/login"
    })
  .then(result => {
    emailTemplatems=result;
      let mailOptions = {
          from: 'newinfo@sts.org.sg', // sender address
          to: req.body.email,// list of receivers
          subject: 'Username Confirmation', // Subject line
          text:'Confirmation mail from STS', // plain text body
         //html : "Hello,"+req.body.full_name+" Thankyou for register with STS<br> Please Click on the link to verify your email.<br><a href="+linkse+">Click here to verify</a>"  // html body
     html:emailTemplatems
      };

      transporter.sendMail(mailOptions, (error, info) => {
          if (error) {
              return console.log(error);
          }
          console.log('Message %s sent: %s', info.messageId, info.response);
              res.render('index');
  })});

  return res.json({
    success: 1,
    mesagee: "Email Found"
  });

  }; });
  },


UpdateSpouse: (req, res) => {
  const body = req.body;
  if(body.id){
    getUserByMemberEmail(body.s_email, (err, results) => {
      if (err) {
        console.log(err);
      }
      if (results) {
        if(results.email==body.s_email){
          UpdateSpouse(body, (err, results) => {
            if (err) {
              console.log(err);
              return;
            }
            return res.json({
              success: 1,
              message: "updated successfully"
            });
          })
          }else{
        return res.json({
          success: 0,
          mesagee: "Email already registered with us"
        });
        }
      }else{
  UpdateSpouse(body, (err, results) => {
      if (err) {
        console.log(err);
        return;
      }
      return res.json({
        success: 1,
        message: "updated successfully"
      });
    })
  }
})
  }else{
    getUserByMemberEmail(body.s_email, (err, results) => {
      if (err) {
        console.log(err);
        }
        if(results){
          return res.json({
            success: 0,
            mesagee: "Email already registered with us"
          });
        }

    getLastLerialNumber(current_year,(err, sresult) => {  
      if (sresult) {
        var serial_no = sresult.serial_no+1;
      }else{
        var serial_no = 10001;
      }
    // var uniqueid = new Date().valueOf();
    // body.registration_id = uniqueid;
    body.serial_no = serial_no;
    body.registration_id = 'STS-'+current_year+'-'+serial_no;
    body.member_id = req.decoded.result.id;
    // body.registration_id = req.decoded.result.registration_id+'S';
    body.membershiptype_id = req.decoded.result.membershiptype_id;
    body.membership_amount = req.decoded.result.membership_amount;
    body.street1 = req.decoded.result.street1;
    body.street2 = req.decoded.result.street2;
    body.unit_no = req.decoded.result.unit_no;
    body.postal_code = req.decoded.result.postal_code;
    body.habbies = req.decoded.result.habbies;
    body.reference = req.decoded.result.reference_by;
    body.introducer1 = req.decoded.result.introducer1;
    body.introducerNumber1 = req.decoded.result.introducer1_mobile;
    body.introducer2 = req.decoded.result.introducer2;
    body.introducerNumber2 = req.decoded.result.introducer2_mobile;
    body.comments = req.decoded.result.comments;
    body.membership_type = req.decoded.result.membership_type;
    body.membership_enddate = req.decoded.result.membership_enddate;
    body.created_on = current_date;
    body.member_type = 1;
    rand2=Math.floor((Math.random() * 20000000000000000) + 54);
    body.member_verifycode=rand2;
    // console.log(body);
    createSpouseMember(body, (err, results) => {
      if (err) {
        console.log(err);
        return res.status(500).json({
          success: false,
          message: "Database connection error"
        });
      }
  
  // host=req.get('host');
  // host= process.env.WEB_URL;
  // links="https://"+host+"/setpassword?token="+rand2;
  //      let transporter = nodeMailer.createTransport({
  //         host: 'mail.sts.org.sg',
  //         port: 465,
  //         secure: true,
  //         auth: {
  //             user: 'newinfo@sts.org.sg',
  //             pass: '@STSnewinfo1'
  //         }
  //     });
  
  //       let emailTemplates;
  //   ejs
  //   .renderFile(path.join(__dirname, "views/index.ejs"), {
  //     user_firstname: req.body.s_full_name,
  //     confirm_link:"https://"+host+"/setpassword?token=" + rand2
  //   })  .then(result => {
  //     emailTemplates = result;
  //    let mailOptionse = {
  //         from: 'newinfo@sts.org.sg', // sender address
  //         to: req.body.s_email,// list of receivers
  //         subject: 'New Member Registration', // Subject line
  //         text:'Thankyou for registering with STS', // plain text body
  //         //html : "Hello,"+req.body.full_name+" Thankyou for register with STS<br> Please Click on the link to verify your email.<br><a href="+links+">Click here to verify</a>"  // html body
  //     html:emailTemplates
  //     };
  //     transporter.sendMail(mailOptionse, (error, info) => {
  //         if (error) {
  //             return console.log(error);
  //         }
  //         console.log('Message %s sent: %s', info.messageId, info.response);
  //             res.render('index');
  //         })});

      return res.status(200).json({
        success: true,
        data: results
      });
    });
  });
})
  }

  },

  UpdateChildrens: (req, res) => {
    const body = req.body;
      const arr = body.childrens;
      if(arr){
    arr.forEach(element => { 
    if(element.id){
    element.member_id = req.decoded.result.id;
   UpdateChildrens(element, (err, results) => {
      if (err) {
        console.log(err);
        return res.status(500).json({
          success: 0,
          message: "Database connection errror"
        });
      }
      return res.status(200).json({
        success: true,
        data: results
      });
    });
    }else{
  element.member_id = req.decoded.result.id;
   createChildrens(element, (err, results) => {
      if (err) {
        console.log(err);
        return res.status(500).json({
          success: 0,
          message: "Database connection errror"
        });
      }

      return res.status(200).json({
        success: true,
        data: results
      });

    });
    }
     });
    }   

  },

  UpdateMemberShip: (req, res) => {
    const body = req.body;
    var membershiptype_id = body.membershiptype_id;
    if(body.member_type==0){          
            body.id = req.decoded.result.id;
            UpdateMemberByMemberId(body, (err, results) => {
            if(err){
              console.log(err);
              return;
               }
            return res.json({
              success: 1,
              message: "updated successfully"
            });
            })
      }else{
            body.id = req.decoded.result.id;
            UpdateSpouseBySpouseId(body, (err, results) => {
            if(err){
              console.log(err);
              return;
               }
            return res.json({
              success: 1,
              message: "updated successfully"
            });
            })
      }
  },

MemberShipUpdate: (req, res) => {
    const body = req.body;
    body.membership_type = '';
    var member_type = req.decoded.result.member_type;
    var id = req.decoded.result.id;
    console.log(member_type);
  getMemberDetails(id,(err, memberresult) => {
      if (err) {
        console.log(err);
        return;
      }
    var membershiptype_id = memberresult.membershiptype_id;
    var membership_enddate = memberresult.membership_enddate;
    if(member_type==0){
        if(membershiptype_id==1 && body.membershiptype_id==2){
          body.membership_type = 1; // 0-> Annual
          body.membership_enddate = null;
          body.id = req.decoded.result.id;
            UpdateMemberShipByMember(body, (err, results) => {
            if(err){
              console.log(err);
              return;
               }
            //Create Membership History - Start
            body.created_on=current_date;
            createMemberShipHistory(body, (err, results) => {
             if(err){
                console.log(err);
              }
            });
          //Create Membership History - End
            return res.json({
              success: 1,
              message: "updated successfully"
            });
            })
            }

      if(membershiptype_id==1 && body.membershiptype_id==3){

        var enddate = membership_enddate;
        var remaining_months = moment(enddate).diff(current_date, "months");

          body.membership_type = 0; // 0-> Annual
          body.membership_enddate = membership_enddate;
          // if(remaining_months<=4){
          // var d = new Date(membership_enddate);
          var d = new Date(current_date);
          var year = d.getFullYear();
          var month = d.getMonth();
          var day = d.getDate();
          var fulldate = new Date(year + 1, month, day);
          var toDate = fulldate.toISOString().slice(0, 10);
          body.membership_enddate = toDate;
          // }
          body.id = req.decoded.result.id;
            UpdateMemberShipByMember(body, (err, results) => {
            if(err){
              console.log(err);
              return;
               }
            //Create Membership History - Start
            body.created_on=current_date;
            createMemberShipHistory(body, (err, results) => {
             if(err){
                console.log(err);
              }
            });
          //Create Membership History - End

          body.member_status=0;
          UpdateMemberShip_spouse(body, (err, results) => {
          if(err){
            console.log(err);
            return;
             }
            })

            return res.json({
              success: 1,
              message: "updated successfully"
            });
            })
            }

      if(membershiptype_id==1 && body.membershiptype_id==4){
          body.membership_type = 1; // 0-> Annual
          body.membership_enddate = null;
          body.id = req.decoded.result.id;
            UpdateMemberShipByMember(body, (err, results) => {
            if(err){
              console.log(err);
              return;
               }
            //Create Membership History - Start
            body.created_on=current_date;
            createMemberShipHistory(body, (err, results) => {
             if(err){
                console.log(err);
              }
            });
          //Create Membership History - End

          body.member_status=0;
          UpdateMemberShip_spouse(body, (err, results) => {
          if(err){
            console.log(err);
            return;
             }
            })

            return res.json({
              success: 1,
              message: "updated successfully"
            });
            })
            }

      if(membershiptype_id==2 && body.membershiptype_id==3){
          var d = new Date(current_date);
          var year = d.getFullYear();
          var month = d.getMonth();
          var day = d.getDate();
          var fulldate = new Date(year + 1, month, day);
          var toDate = fulldate.toISOString().slice(0, 10);
          body.membership_type = 0; // 0-> Annual
          body.membership_enddate = toDate;
          body.id = req.decoded.result.id;
            UpdateMemberShipByMember(body, (err, results) => {
            if(err){
              console.log(err);
              return;
               }
            //Create Membership History - Start
            body.created_on=current_date;
            createMemberShipHistory(body, (err, results) => {
             if(err){
                console.log(err);
              }
            });
          //Create Membership History - End

          body.member_status=0;
          UpdateMemberShip_spouse(body, (err, results) => {
          if(err){
            console.log(err);
            return;
             }
            })

            return res.json({
              success: 1,
              message: "updated successfully"
            });
            })
            }

      if(membershiptype_id==2 && body.membershiptype_id==4){
          body.membership_type = 1; // 1-> Life
          body.membership_enddate = null;
          body.id = req.decoded.result.id;
            UpdateMemberShipByMember(body, (err, results) => {
            if(err){
              console.log(err);
              return;
               }
            //Create Membership History - Start
            body.created_on=current_date;
            createMemberShipHistory(body, (err, results) => {
             if(err){
                console.log(err);
              }
            });
          //Create Membership History - End

          body.member_status=0;
          UpdateMemberShip_spouse(body, (err, results) => {
          if(err){
            console.log(err);
            return;
             }
            })

            return res.json({
              success: 1,
              message: "updated successfully"
            });
            })
            }
      if(membershiptype_id==3 && body.membershiptype_id==4){
          body.membership_type = 1; // 1-> Life
          body.membership_enddate = null;
          body.id = req.decoded.result.id;
            UpdateMemberShipByMember(body, (err, results) => {
            if(err){
              console.log(err);
              return;
               }

            //Create Membership History - Start
            body.created_on=current_date;
            createMemberShipHistory(body, (err, results) => {
             if(err){
                console.log(err);
              }
            });
          //Create Membership History - End

              body.member_status=0;
            UpdateMemberShip_spouse(body, (err, results) => {
            if(err){
              console.log(err);
              return;
               }
              })
            return res.json({
              success: 1,
              message: "updated successfully"
            });
            })
            }

      if(membershiptype_id==4 && body.membershiptype_id==2){
          body.membership_type = 1; // 1-> Life
          body.membership_enddate = null;
          body.id = req.decoded.result.id;
            UpdateMemberShipByMember(body, (err, results) => {
            if(err){
              console.log(err);
              return;
               }

            //Create Membership History - Start
            body.created_on=current_date;
            createMemberShipHistory(body, (err, results) => {
             if(err){
                console.log(err);
              }
            });
          //Create Membership History - End

            body.member_status=1;
            UpdateMemberShip_spouse(body, (err, results) => {  //UpdateMemberShip_SpouseInactive
            if(err){
              console.log(err);
              return;
               }
              })
            body.status=1;
            UpdateMemberShip_ChildrensInactive(body, (err, results) => {
            if(err){
              console.log(err);
              return;
               }
              })
            return res.json({
              success: 1,
              message: "updated successfully"
            });
            })
            }

        if(membershiptype_id==3 && body.membershiptype_id==1){
          var enddate = membership_enddate;
          var remaining_months = moment(enddate).diff(current_date, "months");
          body.membership_type = 0; // 0-> Annual
          body.membership_enddate = membership_enddate;
          // if(remaining_months<=4){
            // var d = new Date(membership_enddate);
            var d = new Date(current_date);
            var year = d.getFullYear();
            var month = d.getMonth();
            var day = d.getDate();
            var fulldate = new Date(year + 1, month, day);
            var toDate = fulldate.toISOString().slice(0, 10);
            body.membership_enddate = toDate;
            // }
          body.id = req.decoded.result.id;
            UpdateMemberShipByMember(body, (err, results) => {
            if(err){
              console.log(err);
              return;
               }
            //Create Membership History - Start
            body.created_on=current_date;
            createMemberShipHistory(body, (err, results) => {
             if(err){
                console.log(err);
              }
            });
          //Create Membership History - End

            body.member_status=1;
            UpdateMemberShip_spouse(body, (err, results) => {  // UpdateMemberShip_SpouseInactive
            if(err){
              console.log(err);
              return;
               }
              })
            body.status=1;
            UpdateMemberShip_ChildrensInactive(body, (err, results) => {
            if(err){
              console.log(err);
              return;
               }
              })
            return res.json({
              success: 1,
              message: "updated successfully"
            });
            })
            }
          if(membershiptype_id==3 && body.membershiptype_id==2){
          body.membership_type = 1; // 1-> Life
          body.membership_enddate = null;
          body.id = req.decoded.result.id;
            UpdateMemberShipByMember(body, (err, results) => {
            if(err){
              console.log(err);
              return;
               }

            //Create Membership History - Start
            body.created_on=current_date;
            createMemberShipHistory(body, (err, results) => {
             if(err){
                console.log(err);
              }
            });
          //Create Membership History - End

            body.member_status=1;
            UpdateMemberShip_spouse(body, (err, results) => { // UpdateMemberShip_SpouseInactive
            if(err){
              console.log(err);
              return;
               }
              })
            body.status=1;
            UpdateMemberShip_ChildrensInactive(body, (err, results) => {
            if(err){
              console.log(err);
              return;
               }
              })
            return res.json({
              success: 1,
              message: "updated successfully"
            });
            })
            }

      if(membershiptype_id==body.membershiptype_id){
        var d = new Date(current_date);
        var year = d.getFullYear();
        var month = d.getMonth();
        var day = d.getDate();
        var fulldate = new Date(year + 1, month, day);
        var toDate = fulldate.toISOString().slice(0, 10);
        body.membership_type = 0; // 0-> Annual
        body.membership_enddate = toDate;
        body.id = req.decoded.result.id;
          UpdateMemberShipByMember(body, (err, results) => {
          if(err){
            console.log(err);
            return;
             }
          //Create Membership History - Start
          body.created_on=current_date;
          createMemberShipHistory(body, (err, results) => {
           if(err){
              console.log(err);
            }
          });
        //Create Membership History - End

        body.member_status=0;
        UpdateMemberShip_spouse(body, (err, results) => {
        if(err){
          console.log(err);
          return;
           }
          })

          return res.json({
            success: 1,
            message: "updated successfully"
          });
          })
            }

      }else{
          if(membershiptype_id==3 && body.membershiptype_id==4){
          body.membership_type = 1; // 1-> Life
          body.membership_enddate = null;
          body.id = req.decoded.result.id;
           UpdateMemberShipByMember(body, (err, results) => {
            if(err){
              console.log(err);
              return;
               }

              // body.member_status=0;
              body.id = req.decoded.result.member_id;
              UpdateMemberShipByMember(body, (err, results) => {
            if(err){
              console.log(err);
              return;
               }
              })

            //Create Membership History - Start
            body.id = req.decoded.result.member_id;
            body.created_on=current_date;
            createMemberShipHistory(body, (err, results) => {
             if(err){
                console.log(err);
              }
            });
          //Create Membership History - End

            return res.json({
              success: 1,
              message: "updated successfully"
            });
            })
            }

            if(membershiptype_id==body.membershiptype_id){
            body.id = req.decoded.result.id;
            UpdateSpouseBySpouseId(body, (err, results) => {
            if(err){
              console.log(err);
              return;
               }
            return res.json({
              success: 1,
              message: "updated successfully"
            });
            })
            }
      }
    })
  },

  MemberShipHistory: (req, res) => {
    member_id = req.decoded.result.id;
    MemberShipHistory(member_id,(err, results) => {
      if (err) {
        console.log(err);
        return;
      }
      return res.status(200).json({
        success: 1,
        data: results
      });
    });
  },

  UpdateMemberShipByTreasurer: (req, res) => {
    const body = req.body;
    var membershiptype_id=body.membershiptype_id;
    if(membershiptype_id){
    UpdateMemberShipByTreasurer(body, (err, results) => {
      if(err){
        console.log(err);
           }

           body.created_on=current_date;
           body.id=body.member_id;
           createMemberShipHistory1(body, (err, results) => {
            if(err){
               console.log(err);
             }
          
           UpdateSpouseMemberShipByTreasurer(body, (err, results) => {
            if(err){
              console.log(err);
              return;
               }
              
         //Create Membership History - End
           return res.json({
             success: 1,
             message: "updated successfully"
           });
          });
        });
    });
  }else{
    return res.json({
      success: 0,
      message: "Membership id is null passed"
    });
  }
  },

  AdminLogin: (req, res) => {
    const body = req.body;
    getAdminByMemberEmail(body.email, (err, results) => {
      if (err) {
        console.log(err);
      }
      if (!results) {
        return res.json({
          success: 2,
          data: "Email id doesn't exist"
        });
      }
      const result = compareSync(body.password, results.password);

      if (result) {
        var digits = '0123456789'; 
    let OTP = ''; 
    for (let i = 0; i < 6; i++ ) { 
        OTP += digits[Math.floor(Math.random() * 10)]; 
    } 
   body.login_otp = OTP;
   body.id= results.id;
   var current_datetime =  moment().format('YYYY-MM-DD HH:mm:ss');
   var otpexpiry_datetime = moment(current_datetime).add(10, 'minutes').format('YYYY-MM-DD HH:mm:ss');
   body.otpexpiry_datetime = otpexpiry_datetime;
    UpdateAdminLoginOtp(body, (err, results1) => {
    let transporter = nodeMailer.createTransport({
          host: 'mail.sts.org.sg',
          port: 465,
          secure: true,
          auth: {
              user: 'otp@sts.org.sg',
              pass: '@STSotpsend1'
          }
      });
          let emailTemplatemswaw;
    ejs
    .renderFile(path.join(__dirname, "views/loginotp.ejs"), {
      user_firstname: results.admin_type,
      user_otp:body.login_otp

    })
  .then(result => {
    emailTemplatemswaw=result;
      let mailOptions = {
          from: 'otp@sts.org.sg', // sender address
          to: results.username,// list of receivers
          subject: 'Otp Verification', // Subject line
          text:'Please Verify Your Otp', // plain text body
         //html : "Hello,"+req.body.full_name+" Thankyou for register with STS<br> Please Click on the link to verify your email.<br><a href="+linkse+">Click here to verify</a>"  // html body
     html:emailTemplatemswaw
      };
      transporter.sendMail(mailOptions, (error, info) => {
          if (error) {
              return console.log(error);
          }
          console.log('Message %s sent: %s', info.messageId, info.response);
              res.render('index');
         })});
    
      if (err) {
        console.log(err);
    
        return;
      }
      return res.json({
        success: 1,
        message: "Otp sent to your email please verify it"
  
      });
    });

      } else {
        return res.json({
          success: 0,
          data: "Invalid email or password"
        });
      }
    });
  },

  VerifyAdminLoginOtp: (req, res) => {
    const body = req.body;
    getAdminByMemberEmail(body.email, (err, results) => {
      if (err) {
        console.log(err);
      }
      if(results){
      if (body.otp==results.login_otp) {
        results.password = undefined;
        const jsontoken = sign({ result: results }, "qwe1234", {
          expiresIn: "1h"
        });

        createAdminLoginHistory(results, (err, results1) => {
          if (err) {
            console.log(err);
            return res.status(500).json({
              success: 0,
              message: "Database connection errror"
            });
          }
        });

        return res.json({
          success: 1,
          message: "login successfully",
          role_id: results.role_id,
          token: jsontoken
        });

      } else {
        return res.json({
          success: 0,
          data: "Invalid OTP"
        });
      }
    }else{
      return res.json({
          success: 0,
          data: "Invalid OTP"
        });
    }

    });
  },

getMembersList: (req, res) => {
    getMembersList((err, results) => {
      if (err) {
        console.log(err);
        return;
      }
      return res.status(200).json({
        success: 1,
        data: results
      });
    });
  },

  getVerifiedMembersList: (req, res) => {
    getVerifiedMembersList((err, results) => {
      if (err) {
        console.log(err);
        return;
      }
      return res.status(200).json({
        success: 1,
        data: results
      });
    });
  },

  getRejectedMembersList: (req, res) => {
    getRejectedMembersList((err, results) => {
      if (err) {
        console.log(err);
        return;
      }
      return res.status(200).json({
        success: 1,
        data: results
      });
    });
  },

  getTerminatedMembersList: (req, res) => {
    getTerminatedMembersList((err, results) => {
      if (err) {
        console.log(err);
        return;
      }
      return res.status(200).json({
        success: 1,
        data: results
      });
    });
  },

getMemberDetails: (req, res) => {
    // const body = req.body;
    const id = req.params.id;
    getMemberDetails(id,(err, results) => {
      if (err) {
        console.log(err);
        return;
      }

      if(results.member_type==0){
      getSpouseBymemberId(id, (err, results1) => {
      if (err) {
        console.log(err);
        return;
      }
      
      getChildrensBymemberId(id, (err, results2) => {
      if (err) {
        console.log(err);
        return;
      }

      getMemberShipHistoryByMemberId(id, (err, results3) => {
        if (err) {
          console.log(err);
          return;
        }

        getEventsHistoryByMemberId(id, (err, results4) => {
          if (err) {
            console.log(err);
            return;
          }
      
      if(results){
        return res.status(200).json({
        success: 1,
        member_data: results,
        spouse_data:results1,
        child_data:results2,
        membership_history:results3,
        events_history:results4
      });
      }else{
        return res.status(200).json({
        success: 2,
        message: 'No Data Found.',
      });
      }

    }); 
    });
      });
      });  
    }else{
      var member_id = results.member_id;
      getMemberDetails(member_id, (err, results1) => {
        if (err) {
          console.log(err);
          return;
        }
        
        getChildrensBymemberId(member_id, (err, results2) => {
        if (err) {
          console.log(err);
          return;
        }
  
        getMemberShipHistoryByMemberId(id, (err, results3) => {
          if (err) {
            console.log(err);
            return;
          }
  
          getEventsHistoryByMemberId(id, (err, results4) => {
            if (err) {
              console.log(err);
              return;
            }
        
        if(results){
          return res.status(200).json({
          success: 1,
          member_data: results,
          spouse_data:results1,
          child_data:results2,
          membership_history:results3,
          events_history:results4
        });
        }else{
          return res.status(200).json({
          success: 2,
          message: 'No Data Found.',
        });
        }
  
      }); 
      });
        });
        });


    }


    });
  },

  UpdateMemberStatus: (req, res) => {
    const body = req.body;
    const member_id = body.member_id;
    const status = body.status;
    getMemberDetails(member_id,(err, resul1) => {
      if (err) {
        console.log(err);
        return;
      }
      UpdateMemberVerify_Status(member_id,status, (err, results) => {
        if (err) {
          console.log(err);
          return res.status(500).json({
            success: 0,
            message: "Database connection errror"
          });
        }
        return res.status(200).json({
          success: 1,
          message: "Updated"
        });
      });
    });
  },

  RejectMemberShip: (req, res) => {
    const body = req.body;
    rand3=Math.floor((Math.random() * 30000000000000000) + 34);
    body.member_verifycode=rand3;
    const arr = body.id;
    arr.forEach(element => { 
     body.member_id= '';
     body.member_id= element;
    //  console.log(element);
    getMemberDetails(element,(err, resul1) => {
      if (err) {
        console.log(err);
        return;
      }
   UpdateMemberVerify_Status(element,body.status, (err, results) => {
      if (err) {
        console.log(err);
        return res.status(500).json({
          success: 0,
          message: "Database connection errror"
        });
      }
      // console.log(element);
      //mail Sending//
      host= process.env.WEB_URL;
      linkse="https://"+host+"/setpassword?token="+rand3;
       let transporter = nodeMailer.createTransport({
          host: 'mail.sts.org.sg',
          port: 465,
          secure: true,
          auth: {
              user: 'newinfo@sts.org.sg',
              pass: '@STSnewinfo1'
          }
      });
          let emailTemplatems;
    ejs
    .renderFile(path.join(__dirname, "views/rejectmember.ejs"), {
      user_firstname: resul1.full_name,
      confirm_link:"https://"+host+"/setpassword?token=" + rand3
    })
  .then(result => {
    emailTemplatems=result;
      let mailOptions = {
          from: 'newinfo@sts.org.sg', // sender address
          to: resul1.email,// list of receivers
          subject: 'New Member Registration Confirmation', // Subject line
          text:'Thankyou for registering with STS', // plain text body
         //html : "Hello,"+req.body.full_name+" Thankyou for register with STS<br> Please Click on the link to verify your email.<br><a href="+linkse+">Click here to verify</a>"  // html body
     html:emailTemplatems
      };
      transporter.sendMail(mailOptions, (error, info) => {
          if (error) {
              return console.log(error);
          }
          console.log('Message %s sent: %s', info.messageId, info.response);
              res.render('index');
         })});
      // //mail Send//
//=======================Spouse Update Start=====================================//
getSpouseBymemberId(element, (err, results1) => {
      if (err) {
        console.log(err);
        return;
      }
      if(results1){
      UpdateSpouseVerifyStatus(element,body.status, (err, resul) => {
      if (err) {
        console.log(err);
        return res.status(500).json({
          success: 0,
          message: "Database connection errror"
        });
      }

      rand=Math.floor((Math.random() * 10000000000000000) + 94);
      body.member_verifycode=rand;
      host= process.env.WEB_URL;
      link="https://"+host+"/setpassword?token="+rand;
      body.member_id = '';
      var member_insertid = '';
   
       let transporter = nodeMailer.createTransport({
          host: 'mail.sts.org.sg',
          port: 465,
          secure: true,
          auth: {
              user: 'newinfo@sts.org.sg',
              pass: '@STSnewinfo1'
          }
      });
     
        let emailTemplate;
    ejs
    .renderFile(path.join(__dirname, "views/rejectmember.ejs"), {
      user_firstname: results1.full_name,
      confirm_link:"https://"+host+"/setpassword?token=" + rand
    })
  .then(result => {
      emailTemplate = result;
      let mailOptions = {
          from: 'newinfo@sts.org.sg', // sender address
          to: results1.email,// list of receivers
          subject: 'New Member Registration Confirmation', // Subject line
          text:'Thankyou for registering with STS', // plain text body
         //html : "Hello,"+req.body.full_name+" Thankyou for register with STS<br> Please Click on the link to verify your email.<br><a href="+link+">Click here to verify</a>"  // html body
      html: emailTemplate
      };
      transporter.sendMail(mailOptions, (error, info) => {
          if (error) {
              return console.log(error);
          }
          console.log('Message %s sent: %s', info.messageId, info.response);
              res.render('index');
          })});
    });
    }
});

//=======================Spouse Update End=====================================//
    });
  });
   });

   return res.status(200).json({
    success: true,
    data: "Rejected Successfully"
  });

  },

  UpdateMemberVerifyStatus: (req, res) => {
    const body = req.body;
    rand3=Math.floor((Math.random() * 30000000000000000) + 34);
    body.member_verifycode=rand3;
    const arr = body.id;
    arr.forEach(element => { 
     body.member_id= element;
    getMemberDetails(element,(err, resul1) => {
      if (err) {
        console.log(err);
        return;
      }
   UpdateMemberVerifyStatus(element,body.status,rand3, (err, results) => {
      if (err) {
        console.log(err);
        return res.status(500).json({
          success: 0,
          message: "Database connection errror"
        });
      }
      //mail Sending//
      host= process.env.WEB_URL;
      linkse="https://"+host+"/setpassword?token="+rand3;
       let transporter = nodeMailer.createTransport({
          host: 'mail.sts.org.sg',
          port: 465,
          secure: true,
          auth: {
              user: 'otp@sts.org.sg',
              pass: '@STSotpsend1'
          }
      });
          let emailTemplatems;
    ejs
    .renderFile(path.join(__dirname, "views/index.ejs"), {
      user_firstname: resul1.full_name,
      confirm_link:"https://"+host+"/setpassword?token=" + rand3
    })
  .then(result => {
    emailTemplatems=result;
      let mailOptions = {
          from: 'otp@sts.org.sg', // sender address
          to: resul1.email,// list of receivers
          subject: 'New Member Registration Confirmation', // Subject line
          text:'Thankyou for registering with STS', // plain text body
         //html : "Hello,"+req.body.full_name+" Thankyou for register with STS<br> Please Click on the link to verify your email.<br><a href="+linkse+">Click here to verify</a>"  // html body
     html:emailTemplatems
      };
      transporter.sendMail(mailOptions, (error, info) => {
          if (error) {
              return console.log(error);
          }
          console.log('Message %s sent: %s', info.messageId, info.response);
              res.render('index');
         })});
      // //mail Send//
//=======================Spouse Update Start=====================================//
getSpouseBymemberId(element, (err, results1) => {
      if (err) {
        console.log(err);
        return;
      }
      if(results1){
      rand=Math.floor((Math.random() * 10000000000000000) + 94);
      UpdateSpouseVerifyStatus(element,body.status,rand, (err, resul) => {
      if (err) {
        console.log(err);
        return res.status(500).json({
          success: 0,
          message: "Database connection errror"
        });
      }

      body.member_verifycode=rand;
      host= process.env.WEB_URL;
      link="https://"+host+"/setpassword?token="+rand;
      body.member_id = '';
      var member_insertid = '';
   
       let transporter = nodeMailer.createTransport({
          host: 'mail.sts.org.sg',
          port: 465,
          secure: true,
          auth: {
              user: 'otp@sts.org.sg',
              pass: '@STSotpsend1'
          }
      });
     
        let emailTemplate;
    ejs
    .renderFile(path.join(__dirname, "views/index.ejs"), {
      user_firstname: results1.full_name,
      confirm_link:"https://"+host+"/setpassword?token=" + rand
    })
  .then(result => {
      emailTemplate = result;
      let mailOptions = {
          from: 'otp@sts.org.sg', // sender address
          to: results1.email,// list of receivers
          subject: 'New Member Registration Confirmation', // Subject line
          text:'Thankyou for registering with STS', // plain text body
         //html : "Hello,"+req.body.full_name+" Thankyou for register with STS<br> Please Click on the link to verify your email.<br><a href="+link+">Click here to verify</a>"  // html body
      html: emailTemplate
      };
      transporter.sendMail(mailOptions, (error, info) => {
          if (error) {
              return console.log(error);
          }
          console.log('Message %s sent: %s', info.messageId, info.response);
              res.render('index');
          })});
    });
    }
});

//=======================Spouse Update End=====================================//
    });
  });
   });

   return res.status(200).json({
    success: true,
    data: "Approved Successfully"
  });

  },

  MemberShipRenewal:(req, res) => {
    const body = req.body;
    // console.log(req);
    // const member_type = req.decoded.result.member_type;
    const member_type = body.member_type;
    console.log(member_type);
    if(member_type==0){  //member_type=0 when member
      const membership_enddate = req.decoded.result.membership_enddate;
      console.log(membership_enddate);
      body.member_id = req.decoded.result.id;
      var d = new Date(membership_enddate);
          var year = d.getFullYear();
          var month = d.getMonth();
          var day = d.getDate();
          var fulldate = new Date(year + 1, month, day);
          var toDate = fulldate.toISOString().slice(0, 10);
      body.membership_enddate = toDate;
      console.log(toDate);
      MemberShipRenewalByMember(body, (err, results) => {
            if(err){
              console.log(err);
              return;
               }
            //Create Membership History - Start
            body.created_on=current_date;
            body.id = req.decoded.result.id;
            createMemberShipHistory(body, (err, results) => {
             if(err){
                console.log(err);
              }
            });
          //Create Membership History - End
          getSpouseBymemberId(body.member_id, (err, results1) => {
              if (err) {
                console.log(err);
                return;
              }
          if(results1){ 
          body.spouse_id = results1.id;
          MemberShipRenewalBySpouse(body, (err, results) => {
            if(err){
              console.log(err);
              return;
               }
             });
        }
        });

            return res.json({
              success: 1,
              message: "updated successfully"
            });
            });
    }else{
      const membership_enddate = req.decoded.result.membership_enddate;
      body.id = req.decoded.result.id;
      var d = new Date(membership_enddate);
          var year = d.getFullYear();
          var month = d.getMonth();
          var day = d.getDate();
          var fulldate = new Date(year + 1, month, day);
          var toDate = fulldate.toISOString().slice(0, 10);
         body.membership_enddate = toDate;
         body.spouse_id = req.decoded.result.id;
      MemberShipRenewalBySpouse(body, (err, results) => {
            if(err){
              console.log(err);
              return;
               }
            //Create Membership History - Start
            body.created_on=current_date;
            body.id = req.decoded.result.member_id;
            createMemberShipHistory(body, (err, results) => {
             if(err){
                console.log(err);
              }
            });
          //Create Membership History - End
          body.member_id = req.decoded.result.member_id;
          MemberShipRenewalByMember(body, (err, results) => {
            if(err){
              console.log(err);
              return;
               }
             });
            return res.json({
              success: 1,
              message: "updated successfully"
            });
            });
    }   
  },

  UpdateVerifyEmail: (req, res) => {
    const body = req.body;
// console.log(body);
  getUserByMemberEmail(body.email, (err, results) => {
         if (err) {
        console.log(err);
      }
    if (results) {
var digits = '0123456789'; 
    let OTP = ''; 
    for (let i = 0; i < 6; i++ ) { 
        OTP += digits[Math.floor(Math.random() * 10)]; 
    } 
   body.member_verifyotp = OTP;
   body.created_on = current_date;
   var current_datetime =  moment().format('YYYY-MM-DD HH:mm:ss');
   var otpexpiry_datetime = moment(current_datetime).add(10, 'minutes').format('YYYY-MM-DD HH:mm:ss');
   body.otpexpiry_datetime = otpexpiry_datetime;
    AddMemberOtp(body, (err, results) => {
    let transporter = nodeMailer.createTransport({
          host: 'mail.sts.org.sg',
          port: 465,
          secure: true,
          auth: {
              user: 'otp@sts.org.sg',
              pass: '@STSotpsend1'
          }
      });
          let emailTemplatemswaw;
    ejs
    .renderFile(path.join(__dirname, "views/otp.ejs"), {
      user_firstname: req.body.full_name,
    user_otp:req.body.member_verifyotp

    })
  .then(result => {
    emailTemplatemswaw=result;
      let mailOptions = {
          from: 'otp@sts.org.sg', // sender address
          to: req.body.email,// list of receivers
          subject: 'Otp Verification', // Subject line
          text:'Please Verify Your Otp', // plain text body
         //html : "Hello,"+req.body.full_name+" Thankyou for register with STS<br> Please Click on the link to verify your email.<br><a href="+linkse+">Click here to verify</a>"  // html body
     html:emailTemplatemswaw
      };
      transporter.sendMail(mailOptions, (error, info) => {
          if (error) {
              return console.log(error);
          }
          console.log('Message %s sent: %s', info.messageId, info.response);
              res.render('index');
         })});
    
      if (err) {
        console.log(err);
    
        return;
      }
      return res.json({
        success: 1,
        message: "Otp sent to your email please verify it"
  
      });
    });
  }else{
    return res.json({
      success: 0,
      message: "No mail exist."
    });
   
  }
   });
  },

  UpdateVerifyOtp: (req, res) => {
  const body = req.body;
  getMemberotpverification(body.member_verifyotp,body.member_email, (err, results) => {
      if (err) {
        console.log(err);
      }
      if (!results) {
        return res.json({
          success: 0,
          mesagee: "Invalid  Otp Code"
        });
      }else{
   body.member_verifyotpid = results.member_verifyotpid;
    deleteOtp(body, (err, results) => {
      if (err) {
        console.log(err);
        return;
      }
      return res.json({
        success: 1,
        message: "otp verified successfully"
      });
    })}; });
  },

  UploadProfileImage: (req, res) => { 
     const body = req.body.image_url; 
     const id = req.decoded.result.id;
    // Some image data uri
    let dataURI = body;
    // It will create the full path in case it doesn't exist
    // If the extension is defined (e.g. fileName.png), it will be preserved, otherwise the lib will try to guess from the Data URI
    rand =Math.floor((Math.random() * 30000000000000000) + 34);
    let filePath = './uploads/profile_images/'+rand+'.png';
    var image_name = rand+'.png';
    // Returns a Promise
    imageDataURI.outputFile(dataURI, filePath)
    UploadProfileImage(id,image_name, (err, results) => {
      if(err){
         console.log(err);
        }
     return res.json({
       success: 1,
       message: "Uploaded successfully"
     });
   });
  
     // RETURNS image path of the created file 'out/path/fileName.png'
    //  .then(res => console.log(res))
    //  console.log(image_name);
   },

   RenewalWithArrears: (req, res) => {
    var member_id = req.decoded.result.id;
    const body = req.body;
    // console.log(body);
    getMemberDetails(member_id,(err, results_mem) => {
      if (err) {
        console.log(err);
        return;
      }
      results_mem.transaction_id = body.transaction_id;
      if(body.arrears_paid=='Yes'){
        if(body.membershiptype_id==results_mem.membershiptype_id){
          var d = new Date(current_date);
           var year = d.getFullYear();
           var month = d.getMonth();
           var day = d.getDate();
           var fulldate = new Date(year + 1, month, day);
           var toDate = fulldate.toISOString().slice(0, 10);
           body.membership_enddate = toDate;
           body.member_id = results_mem.id;
           MemberShipRenewalByMember(body, (err, results) => {
            if(err){
              console.log(err);
              return;
               }
           body.created_on=current_date;
           body.id = results_mem.id;
           body.membershiptype_id = results_mem.membershiptype_id;
           body.membership_amount = body.total_amount;
           createMemberShipHistory(body, (err, results) => {
            if(err){
               console.log(err);
             }
           });
           
           getSpouseBymemberId(results_mem.id, (err, results_spouse) => {
            if (err) {
              console.log(err);
              // return;
            }
            if(results_spouse){
              body.spouse_id = results_spouse.id;
              MemberShipRenewalBySpouse(body, (err, results) => {
                if(err){
                  console.log(err);
                  return;
                   }
                 });
            }
          });
          });
        }else{
          if(results_mem.membershiptype_id==1 && body.membershiptype_id==3){
            var d = new Date(current_date);
            var year = d.getFullYear();
            var month = d.getMonth();
            var day = d.getDate();
            var fulldate = new Date(year + 1, month, day);
            var toDate = fulldate.toISOString().slice(0, 10);
            body.membership_enddate = toDate;
            body.member_id = results_mem.id;
            UpdateMemberShipDetails(body, (err, results) => {
             if(err){
               console.log(err);
               return;
                }
            body.created_on=current_date;
            body.id = results_mem.id;
            body.membershiptype_id = results_mem.membershiptype_id;
            body.membership_amount = body.total_amount;
            createMemberShipHistory(body, (err, results) => {
             if(err){
                console.log(err);
              }
            });
           });
          }

          if(results_mem.membershiptype_id==3 && body.membershiptype_id==1){
            var d = new Date(current_date);
            var year = d.getFullYear();
            var month = d.getMonth();
            var day = d.getDate();
            var fulldate = new Date(year + 1, month, day);
            var toDate = fulldate.toISOString().slice(0, 10);
            body.membership_enddate = toDate;
            body.member_id = results_mem.id;
            UpdateMemberShipDetails(body, (err, results) => {
             if(err){
               console.log(err);
               return;
                }
            body.created_on=current_date;
            body.id = results_mem.id;
            body.membershiptype_id = results_mem.membershiptype_id;
            body.membership_amount = body.total_amount;
            createMemberShipHistory(body, (err, results) => {
             if(err){
                console.log(err);
              }
            });

            getSpouseBymemberId(results_mem.id, (err, results_spouse) => {
              if (err) {
                console.log(err);
                // return;
              }
              if(results_spouse){
                body.spouse_id = results_spouse.id;
                body.membership_enddate = current_date;
                body.member_status=1;
                InactiveSpouseMemberShip(body, (err, results) => {
                  if(err){
                    console.log(err);
                    return;
                     }
                   });
              }
            });

           });
          }

        }

        return res.json({
          success: 1,
          message: "Updated successfully"
        });


      }else{
        if(body.membershiptype_id==results_mem.membershiptype_id){
          var d = new Date();
          var year = d.getFullYear();
          var month = d.getMonth();
          var day = d.getDate();
          var fulldate = new Date(year + 1, month, day);
          var toDate = fulldate.toISOString().slice(0, 10);
          results_mem.membership_enddate = toDate;
          results_mem.membershiptype_id = body.membershiptype_id;
          results_mem.membership_amount = body.membership_amount;
          var uniqueid = new Date().valueOf();
          results_mem.registration_id = uniqueid;
          rand3=Math.floor((Math.random() * 30000000000000000) + 34);
          results_mem.member_verifycode=rand3;
          results_mem.created_on = current_date;
          results_mem.member_id = '';
        createMember(results_mem, (err, results) => {
        if (err) {
          console.log(err);
          return res.status(500).json({
            success: 0,
            message: "Database connection errror"
          });
        }
        // console.log(results.insertId);
  
        // //mail Sending//
      
    // host=req.get('host');
    host= process.env.WEB_URL;
    linkse="https://"+host+"/setpassword?token="+rand3;
         let transporter = nodeMailer.createTransport({
            host: 'mail.sts.org.sg',
            port: 465,
            secure: true,
            auth: {
                user: 'newinfo@sts.org.sg',
                pass: '@STSnewinfo1'
            }
        });
            let emailTemplatems;
      ejs
      .renderFile(path.join(__dirname, "views/member_welcome.ejs"), {
        user_firstname: results_mem.full_name,
        confirm_link:"https://"+host+"/setpassword?token=" + rand3
      })
    .then(result => {
      emailTemplatems=result;
        let mailOptions = {
            from: 'newinfo@sts.org.sg', // sender address
            to: results_mem.email,// list of receivers
            subject: 'New Member Registration', // Subject line
            text:'Thankyou for registering with STS', // plain text body
           //html : "Hello,"+req.body.full_name+" Thankyou for register with STS<br> Please Click on the link to verify your email.<br><a href="+linkse+">Click here to verify</a>"  // html body
       html:emailTemplatems
        };
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                return console.log(error);
            }
            console.log('Message %s sent: %s', info.messageId, info.response);
                res.render('index');
           })});

           results_mem.member_status = 1;
           results_mem.membership_enddate = current_date;
           InactiveMemberShip(results_mem, (err, results) => {
            if(err){
              console.log(err);
              return;
               }
             });

          //  body.created_on=current_date;
          //  body.id = results_mem.id;
          //  body.membershiptype_id = results_mem.membershiptype_id;
          //  body.membership_amount = results_mem.membership_amount;
          body.membership_amount = body.total_amount;
           createMemberShipHistory(results_mem, (err, results) => {
            if(err){
               console.log(err);
             }
           });

           getSpouseBymemberId(results_mem.id, (err, results_spouse) => {
            if (err) {
              console.log(err);
              // return;
            }
            if(results_spouse){
              body.spouse_id = results_spouse.id;
              body.membership_enddate = current_date;
              body.member_status=1;
              InactiveSpouseMemberShip(body, (err, results1) => {
                if(err){
                  console.log(err);
                  return;
                   }
                 });

     results_spouse.registration_id = uniqueid+'S';
     rand2=Math.floor((Math.random() * 20000000000000000) + 54);
     results_spouse.member_verifycode=rand2;
     results_spouse.membership_enddate = toDate;
     results_spouse.membershiptype_id = body.membershiptype_id;
     results_spouse.membership_amount = body.membership_amount;
     results_spouse.created_on = current_date; 
     results_spouse.member_id = results.insertId;

     createSpouseMember(body, (err, results) => {
       if (err) {
         console.log(err);
         return res.status(500).json({
           success: false,
           message: "Database connection error"
         });
       }
 
   
   // host=req.get('host');
   host= process.env.WEB_URL;
   links="https://"+host+"/setpassword?token="+rand2;
   
         let emailTemplates;
     ejs
     .renderFile(path.join(__dirname, "views/index.ejs"), {
       user_firstname: results_spouse.full_name,
       confirm_link:"https://"+host+"/setpassword?token=" + rand2
     })  .then(result => {
       emailTemplates = result;
      let mailOptionse = {
           from: 'newinfo@sts.org.sg', // sender address
           to: results_spouse.email,// list of receivers
           subject: 'New Member Registration', // Subject line
           text:'Thankyou for registering with STS', // plain text body
           //html : "Hello,"+req.body.full_name+" Thankyou for register with STS<br> Please Click on the link to verify your email.<br><a href="+links+">Click here to verify</a>"  // html body
       html:emailTemplates
       };
       transporter.sendMail(mailOptionse, (error, info) => {
           if (error) {
               return console.log(error);
           }
           console.log('Message %s sent: %s', info.messageId, info.response);
               res.render('index');
           })});
 
      //  return res.status(200).json({
      //    success: true,
      //    data: results
      //  });
     });
    }
      });
        // //mail Send//
        return res.status(200).json({
          success: 1,
          data: "Updated succesfully"
        });
      });

        }else{
          if(results_mem.membershiptype_id==1 && body.membershiptype_id==3){
          var d = new Date();
          var year = d.getFullYear();
          var month = d.getMonth();
          var day = d.getDate();
          var fulldate = new Date(year + 1, month, day);
          var toDate = fulldate.toISOString().slice(0, 10);
          results_mem.membership_enddate = toDate;
          results_mem.membershiptype_id = body.membershiptype_id;
          results_mem.membership_amount = body.membership_amount;
          var uniqueid = new Date().valueOf();
          results_mem.registration_id = uniqueid;
          rand3=Math.floor((Math.random() * 30000000000000000) + 34);
          results_mem.member_verifycode=rand3;
          results_mem.created_on = current_date;
          results_mem.member_id = '';
            createMember(results_mem, (err, results) => {
              if (err) {
                console.log(err);
                return res.status(500).json({
                  success: 0,
                  message: "Database connection errror"
                });
              }
              // console.log(results.insertId);
        
              // //mail Sending//
            
          // host=req.get('host');
          host= process.env.WEB_URL;
          linkse="https://"+host+"/setpassword?token="+rand3;
               let transporter = nodeMailer.createTransport({
                  host: 'mail.sts.org.sg',
                  port: 465,
                  secure: true,
                  auth: {
                      user: 'newinfo@sts.org.sg',
                      pass: '@STSnewinfo1'
                  }
              });
                  let emailTemplatems;
            ejs
            .renderFile(path.join(__dirname, "views/member_welcome.ejs"), {
              user_firstname: results_mem.full_name,
              confirm_link:"https://"+host+"/setpassword?token=" + rand3
            })
          .then(result => {
            emailTemplatems=result;
              let mailOptions = {
                  from: 'newinfo@sts.org.sg', // sender address
                  to: results_mem.email,// list of receivers
                  subject: 'New Member Registration', // Subject line
                  text:'Thankyou for registering with STS', // plain text body
                 //html : "Hello,"+req.body.full_name+" Thankyou for register with STS<br> Please Click on the link to verify your email.<br><a href="+linkse+">Click here to verify</a>"  // html body
             html:emailTemplatems
              };
              transporter.sendMail(mailOptions, (error, info) => {
                  if (error) {
                      return console.log(error);
                  }
                  console.log('Message %s sent: %s', info.messageId, info.response);
                      res.render('index');
                 })});
      
                 results_mem.member_status = 1;
                 results_mem.membership_enddate = current_date;
                 InactiveMemberShip(results_mem, (err, results) => {
                  if(err){
                    console.log(err);
                    return;
                     }
                   });
      
                //  body.created_on=current_date;
                //  body.id = results_mem.id;
                //  body.membershiptype_id = results_mem.membershiptype_id;
                //  body.membership_amount = results_mem.membership_amount;
                body.membership_amount = body.total_amount;
                
                 createMemberShipHistory(results_mem, (err, results) => {
                  if(err){
                     console.log(err);
                   }
                 });
                });
          }

          if(results_mem.membershiptype_id==3 && body.membershiptype_id==1){
            var d = new Date();
            var year = d.getFullYear();
            var month = d.getMonth();
            var day = d.getDate();
            var fulldate = new Date(year + 1, month, day);
            var toDate = fulldate.toISOString().slice(0, 10);
            results_mem.membership_enddate = toDate;
            results_mem.membershiptype_id = body.membershiptype_id;
            results_mem.membership_amount = body.membership_amount;
            var uniqueid = new Date().valueOf();
            results_mem.registration_id = uniqueid;
            rand3=Math.floor((Math.random() * 30000000000000000) + 34);
            results_mem.member_verifycode=rand3;
            results_mem.created_on = current_date;
            results_mem.member_id = '';
              createMember(results_mem, (err, results) => {
                if (err) {
                  console.log(err);
                  return res.status(500).json({
                    success: 0,
                    message: "Database connection errror"
                  });
                }
                // console.log(results.insertId);
          
                // //mail Sending//
              
            // host=req.get('host');
            host= process.env.WEB_URL;
            linkse="https://"+host+"/setpassword?token="+rand3;
                 let transporter = nodeMailer.createTransport({
                    host: 'mail.sts.org.sg',
                    port: 465,
                    secure: true,
                    auth: {
                        user: 'newinfo@sts.org.sg',
                        pass: '@STSnewinfo1'
                    }
                });
                    let emailTemplatems;
              ejs
              .renderFile(path.join(__dirname, "views/member_welcome.ejs"), {
                user_firstname: results_mem.full_name,
                confirm_link:"https://"+host+"/setpassword?token=" + rand3
              })
            .then(result => {
              emailTemplatems=result;
                let mailOptions = {
                    from: 'newinfo@sts.org.sg', // sender address
                    to: results_mem.email,// list of receivers
                    subject: 'New Member Registration', // Subject line
                    text:'Thankyou for registering with STS', // plain text body
                   //html : "Hello,"+req.body.full_name+" Thankyou for register with STS<br> Please Click on the link to verify your email.<br><a href="+linkse+">Click here to verify</a>"  // html body
               html:emailTemplatems
                };
                transporter.sendMail(mailOptions, (error, info) => {
                    if (error) {
                        return console.log(error);
                    }
                    console.log('Message %s sent: %s', info.messageId, info.response);
                        res.render('index');
                   })});
        
                   results_mem.member_status = 1;
                   results_mem.membership_enddate = current_date;
                   InactiveMemberShip(results_mem, (err, results) => {
                    if(err){
                      console.log(err);
                      return;
                       }
                     });
        
                  //  body.created_on=current_date;
                  //  body.id = results_mem.id;
                  //  body.membershiptype_id = results_mem.membershiptype_id;
                  //  body.membership_amount = results_mem.membership_amount;
                  body.membership_amount = body.total_amount;
                   createMemberShipHistory(results_mem, (err, results) => {
                    if(err){
                       console.log(err);
                     }
                   });

                   getSpouseBymemberId(results_mem.id, (err, results_spouse) => {
                    if (err) {
                      console.log(err);
                      // return;
                    }
                    if(results_spouse){
                      body.spouse_id = results_spouse.id;
                      body.membership_enddate = current_date;
                      body.member_status=1;
                      InactiveSpouseMemberShip(body, (err, results) => {
                        if(err){
                          console.log(err);
                          return;
                           }
                         });
                    }
                  });

                  });
            }

        }

      }
      
        return res.status(200).json({
          success: 1,
          data: "Updated Successfully"
        });
      });

  },

  
  AddSliders: (req, res) => { 
    // const body = req.body.image_url; 
    const body = req.body;
   // Some image data uri
   let dataURI = body.image_url;
   // It will create the full path in case it doesn't exist
   // If the extension is defined (e.g. fileName.png), it will be preserved, otherwise the lib will try to guess from the Data URI
   rand =Math.floor((Math.random() * 30000000000000000) + 34);
   let filePath = './uploads/sliders/'+rand+'.png';
   var image_name = rand+'.png';
   // Returns a Promise
   imageDataURI.outputFile(dataURI, filePath)
  //  console.log(image_name);
   body.image_name = image_name;
   Createsliders(body, (err, results) => {
     if(err){
        console.log(err);
       }
    return res.json({
      success: 1,
      message: "Added successfully"
    });
  });
},

getSliders: (req, res) => {
  getSliders( (err, results) => {
    if (err) {
      console.log(err);
      return;
    }
    if (!results) {
      return res.json({
        success: 0,
        message: "Record not Found"
      });
    }
    return res.json({
      success: 1,
      data: results
    });
  });
},

DeleteSlider: (req, res) => {
  // const body = req.body;
  const id = req.params.id;
  DeleteSlider(id,(err, results) => {
    if (err) {
      console.log(err);
      return;
    }
    return res.json({
      success: 1,
      data: "Deleted successfully"
    });

  });
},

DeleteChild: (req, res) => {
  // const body = req.body;
  const id = req.params.id;
  DeleteChild(id,(err, results) => {
    if (err) {
      console.log(err);
      return;
    }
    return res.json({
      success: 1,
      data: "Deleted successfully"
    });

  });
},


AddSponsor: (req, res) => { 
  // const body = req.body.image_url; 
  const body = req.body;
 // Some image data uri
 let dataURI = body.image_url;
 // It will create the full path in case it doesn't exist
 // If the extension is defined (e.g. fileName.png), it will be preserved, otherwise the lib will try to guess from the Data URI
 rand =Math.floor((Math.random() * 30000000000000000) + 34);
 let filePath = './uploads/sponsors/'+rand+'.png';
 var image_name = rand+'.png';
 // Returns a Promise
 imageDataURI.outputFile(dataURI, filePath)
//  console.log(image_name);
 body.image_name = image_name;
 CreateSponsor(body, (err, results) => {
   if(err){
      console.log(err);
     }
  return res.json({
    success: 1,
    message: "Added successfully"
  });
});
},

getSponsor: (req, res) => {
  getSponsor( (err, results) => {
  if (err) {
    console.log(err);
    return;
  }
  if (!results) {
    return res.json({
      success: 0,
      message: "Record not Found"
    });
  }
  return res.json({
    success: 1,
    data: results
  });
});
},

DeleteSponsor: (req, res) => {
// const body = req.body;
const id = req.params.id;
DeleteSponsor(id,(err, results) => {
  if (err) {
    console.log(err);
    return;
  }
  return res.json({
    success: 1,
    data: "Deleted successfully"
  });

});
},


AddMedia: (req, res) => { 
  // const body = req.body.image_url; 
  const body = req.body;
 // Some image data uri
 let dataURI = body.image_url;
 // It will create the full path in case it doesn't exist
 // If the extension is defined (e.g. fileName.png), it will be preserved, otherwise the lib will try to guess from the Data URI
 rand =Math.floor((Math.random() * 30000000000000000) + 34);
 let filePath = './uploads/media/'+rand+'.png';
 var image_name = rand+'.png';
 // Returns a Promise
 imageDataURI.outputFile(dataURI, filePath)
//  console.log(image_name);
 body.image_name = image_name;
 CreateMedia(body, (err, results) => {
   if(err){
      console.log(err);
     }
  return res.json({
    success: 1,
    message: "Added successfully"
  });
});
},

getMedia: (req, res) => {
  getMedia( (err, results) => {
  if (err) {
    console.log(err);
    return;
  }
  if (!results) {
    return res.json({
      success: 0,
      message: "Record not Found"
    });
  }
  return res.json({
    success: 1,
    data: results
  });
});
},

DeleteMedia: (req, res) => {
// const body = req.body;
const id = req.params.id;
DeleteMedia(id,(err, results) => {
  if (err) {
    console.log(err);
    return;
  }
  return res.json({
    success: 1,
    data: "Deleted successfully"
  });

});
},

AboutUs: (req, res) => { 
  var body = req.body;
  getAboutUs( (err, results) => {
    if (err) {
      console.log(err);
      return;
    }
  if(results){
    // console.log(results);
    body.id = results.id;
    UpdateAboutus(body, (err, results1) => {
      if(err){
         console.log(err);
        }
     return res.json({
       success: 1,
       message: "Updated successfully"
     });
   });

  }else{
 CreateAboutus(body, (err, results1) => {
   if(err){
      console.log(err);
     }
  return res.json({
    success: 1,
    message: "Added successfully"
  });
});
  }

  });
},

getAboutUs: (req, res) => {
  // var content = '<p>text 123</p>';
  // var txt = content.replace(/<\/?[^>]+(>|$)/g, "");
  // console.log(txt);
  getAboutUs( (err, results) => {
  if (err) {
    console.log(err);
    return;
  }
  if (!results) {
    return res.json({
      success: 0,
      message: "Record not Found"
    });
  }
  return res.json({
    success: 1,
    data: results
  });
});
},

InvoiceConfig: (req, res) => { 
  var body = req.body;
  getInvoiceConfig((err, results) => {
    if (err) {
      console.log(err);
      return;
    }
  if(results){
    console.log(results);
    body.id = 1;
    UpdateInvoiceConfig(body, (err, results1) => {
      if(err){
         console.log(err);
        }
     return res.json({
       success: 1,
       message: "Updated successfully"
     });
   });

  }else{
 CreateInvoiceConfig(body, (err, results1) => {
   if(err){
      console.log(err);
     }
  return res.json({
    success: 1,
    message: "Added successfully"
  });
});
  }

  });
},

getInvoiceConfig: (req, res) => {
  getInvoiceConfig((err, results) => {
  if (err) {
    console.log(err);
    return;
  }
  if (!results) {
    return res.json({
      success: 0,
      message: "Record not Found"
    });
  }
  return res.json({
    success: 1,
    data: results
  });
});
},

EmailSmtp: (req, res) => { 
  var body = req.body;
  getEmailSmtp((err, results) => {
    if (err) {
      console.log(err);
      return;
    }
  if(results){
    console.log(results);
    body.id = 1;
    UpdateEmailSmtp(body, (err, results1) => {
      if(err){
         console.log(err);
        }
     return res.json({
       success: 1,
       message: "Updated successfully"
     });
   });

  }else{
 CreateEmailSmtp(body, (err, results1) => {
   if(err){
      console.log(err);
     }
  return res.json({
    success: 1,
    message: "Added successfully"
  });
});
  }
  });
},

getEmailSmtp: (req, res) => {
  getEmailSmtp((err, results) => {
  if (err) {
    console.log(err);
    return;
  }
  if (!results) {
    return res.json({
      success: 0,
      message: "Record not Found"
    });
  }
  return res.json({
    success: 1,
    data: results
  });
});
},

GateWay: (req, res) => { 
  var body = req.body;
  getGateWayStatus((err, results) => {
    if (err) {
      console.log(err);
      return;
    }
  if(results){
    console.log(results);
    body.id = 1;
    UpdateGateWayStatus(body, (err, results1) => {
      if(err){
         console.log(err);
        }
     return res.json({
       success: 1,
       message: "Updated successfully"
     });
   });

  }else{
 CreateGateWayStatus(body, (err, results1) => {
   if(err){
      console.log(err);
     }
  return res.json({
    success: 1,
    message: "Added successfully"
  });
});
  }

  });
},

getGateWayStatus: (req, res) => {
  getGateWayStatus((err, results) => {
  if (err) {
    console.log(err);
    return;
  }
  if (!results) {
    return res.json({
      success: 0,
      message: "Record not Found"
    });
  }
  var gateway_status = 'Payment gateway is inactive';
  if(results.gateway_status==1){
    gateway_status = 'Payment gateway is active';
  }
  return res.json({
    success: 1,
    data: results,
    message:gateway_status
  });
});
},

EmailTemplate: (req, res) => { 
  var body = req.body;
  getEmailTemplatecheck(body.template_name,(err, results) => {
    if (err) {
      console.log(err);
      return;
    }
  if(results){
    console.log(results);
    body.id = results.id;
    UpdateEmailTemplate(body, (err, results1) => {
      if(err){
         console.log(err);
        }
     return res.json({
       success: 1,
       message: "Updated successfully"
     });
   });

  }else{
 CreateEmailTemplate(body, (err, results1) => {
   if(err){
      console.log(err);
     }
  return res.json({
    success: 1,
    message: "Added successfully"
  });
});
  }

  });
},

getEmailTemplate: (req, res) => {
  getEmailTemplate((err, results) => {
  if (err) {
    console.log(err);
    return;
  }
  if (!results) {
    return res.json({
      success: 0,
      message: "Record not Found"
    });
  }
  return res.json({
    success: 1,
    data: results
  });
});
},

AddIntroduction: (req, res) => { 
  var body = req.body;
  getAboutUs( (err, results) => {
    if (err) {
      console.log(err);
      return;
    }
  if(results){
    // console.log(results);
    body.id = results.id;
    UpdateIntroduction(body, (err, results1) => {
      if(err){
         console.log(err);
        }
     return res.json({
       success: 1,
       message: "Updated successfully"
     });
   });
  }else{
 CreateIntroduction(body, (err, results1) => {
   if(err){
      console.log(err);
     }
  return res.json({
    success: 1,
    message: "Added successfully"
  });
});
  }

  });
},

getIntroduction: (req, res) => {
  getAboutUs( (err, results) => {
  if (err) {
    console.log(err);
    return;
  }
  if (!results) {
    return res.json({
      success: 0,
      message: "Record not Found"
    });
  }
  return res.json({
    success: 1,
    data: results
  });
});
},

AddNewsLetter: (req, res) => { 
  // const body = req.body.image_url; 
  const body = req.body;
 // Some image data uri
 let dataURI = body.image_url;
 let id = body.id;
 if(dataURI){
 // It will create the full path in case it doesn't exist
 // If the extension is defined (e.g. fileName.png), it will be preserved, otherwise the lib will try to guess from the Data URI
 rand =Math.floor((Math.random() * 30000000000000000) + 34);
 let filePath = './uploads/newsletters/'+rand+'.png';
 var image_name = rand+'.png';
 // Returns a Promise
 imageDataURI.outputFile(dataURI, filePath)
//  console.log(image_name);
 body.image_name = image_name;
 }
if(id){
  if(dataURI){
    UpdateNewsLetterwithimage(body, (err, results) => {
      if(err){
         console.log(err);
        }
     return res.json({
       success: 1,
       message: "Updated successfully"
     });
   });

  }else{
  UpdateNewsLetter(body, (err, results) => {
   if(err){
      console.log(err);
     }
  return res.json({
    success: 1,
    message: "Updated successfully"
  });
});
  }
}else{
 CreateNewsLetter(body, (err, results) => {
   if(err){
      console.log(err);
     }
  return res.json({
    success: 1,
    message: "Added successfully"
  });
}); 

}

},

getNewsLetter: (req, res) => {
  getNewsLetter( (err, results) => {
  if (err) {
    console.log(err);
    return;
  }
  if (!results) {
    return res.json({
      success: 0,
      message: "Record not Found"
    });
  }
  return res.json({
    success: 1,
    data: results
  });
});
},

getNewsLetterById: (req, res) => {
  const id = req.params.id;
  getNewsLetterById(id, (err, results) => {
  if (err) {
    console.log(err);
    return;
  }
  if (!results) {
    return res.json({
      success: 0,
      message: "Record not Found"
    });
  }
  return res.json({
    success: 1,
    data: results
  });
});
},

DeleteNewsLetter: (req, res) => {
// const body = req.body;
const id = req.params.id;
DeleteNewsLetter(id,(err, results) => {
  if (err) {
    console.log(err);
    return;
  }
  return res.json({
    success: 1,
    data: "Deleted successfully"
  });

});
},


AddForums: (req, res) => { 
  // const body = req.body.image_url; 
  const body = req.body;
 // Some image data uri
 let dataURI = body.image_url;
 let id = body.id;
if(dataURI){
 // It will create the full path in case it doesn't exist
 // If the extension is defined (e.g. fileName.png), it will be preserved, otherwise the lib will try to guess from the Data URI
 rand =Math.floor((Math.random() * 30000000000000000) + 34);
 let filePath = './uploads/forums/'+rand+'.png';
 var image_name = rand+'.png';
 // Returns a Promise
 imageDataURI.outputFile(dataURI, filePath)
//  console.log(image_name);
 body.image_name = image_name;
}
 if(id){
   if(dataURI){
  UpdateForumwithimg(body, (err, results) => {
      if(err){
         console.log(err);
        }
     return res.json({
       success: 1,
       message: "Update successfully"
     });
   }); 

   }else{
    UpdateForum(body, (err, results) => {
      if(err){
         console.log(err);
        }
     return res.json({
       success: 1,
       message: "Update successfully"
     });
   });
   }

 }else{
 CreateForum(body, (err, results) => {
   if(err){
      console.log(err);
     }
  return res.json({
    success: 1,
    message: "Added successfully"
  });
});
 }
},

getForums: (req, res) => {
  getForums( (err, results) => {
  if (err) {
    console.log(err);
    return;
  }
  if (!results) {
    return res.json({
      success: 0,
      message: "Record not Found"
    });
  }
  return res.json({
    success: 1,
    data: results
  });
});
},

getForumsById: (req, res) => {
  const id = req.params.id;
  getForumsById(id, (err, results) => {
  if (err) {
    console.log(err);
    return;
  }
  if (!results) {
    return res.json({
      success: 0,
      message: "Record not Found"
    });
  }
  return res.json({
    success: 1,
    data: results
  });
});
},

DeleteForums: (req, res) => {
// const body = req.body;
const id = req.params.id;
DeleteForums(id,(err, results) => {
  if (err) {
    console.log(err);
    return;
  }
  return res.json({
    success: 1,
    data: "Deleted successfully"
  });

});
},

AddVolunteer: (req, res) => { 
  var body = req.body;
   // const body = req.body.image_url; 
   let dataURI = body.image_url;
    if(dataURI){
   // It will create the full path in case it doesn't exist
   // If the extension is defined (e.g. fileName.png), it will be preserved, otherwise the lib will try to guess from the Data URI
   rand =Math.floor((Math.random() * 30000000000000000) + 34);
   let filePath = './uploads/volunteers/'+rand+'.png';
   var image_name = rand+'.png';
   // Returns a Promise
   imageDataURI.outputFile(dataURI, filePath);
  //  console.log(image_name);
   body.image_name = image_name;
  getVolunteer( (err, results) => {
    if (err) {
      console.log(err);
      return;
    }
  if(results){
    // console.log(results);
    body.id = results.id;
    UpdateVolunteerImage(body, (err, results1) => {
      if(err){
         console.log(err);
        }
     return res.json({
       success: 1,
       message: "Updated successfully"
     });
   });

  }else{
 CreateVolunteerImage(body, (err, results1) => {
   if(err){
      console.log(err);
     }
  return res.json({
    success: 1,
    message: "Added successfully"
  });
});
  }

  });
}else{
  getVolunteer( (err, results) => {
    if (err) {
      console.log(err);
      return;
    }
  if(results){
    // console.log(results);
    body.id = results.id;
    UpdateVolunteerDescription(body, (err, results1) => {
      if(err){
         console.log(err);
        }
     return res.json({
       success: 1,
       message: "Updated successfully"
     });
   });

  }else{
 CreateVolunteerDescription(body, (err, results1) => {
   if(err){
      console.log(err);
     }
  return res.json({
    success: 1,
    message: "Added successfully"
  });
});
  }

  });

}
},

getVolunteer: (req, res) => {
  getVolunteer( (err, results) => {
  if (err) {
    console.log(err);
    return;
  }
  if (!results) {
    return res.json({
      success: 0,
      message: "Record not Found"
    });
  }
  return res.json({
    success: 1,
    data: results
  });
});
},

AddNewsGallery: (req, res) => { 
  // const body = req.body.image_url; 
  const body = req.body;
 // Some image data uri
 let dataURI = body.image_url;
 let id = body.id;
 // It will create the full path in case it doesn't exist
 // If the extension is defined (e.g. fileName.png), it will be preserved, otherwise the lib will try to guess from the Data URI
 if(dataURI){
 rand =Math.floor((Math.random() * 30000000000000000) + 34);
 let filePath = './uploads/newsgallery/'+rand+'.png';
 var image_name = rand+'.png';
 // Returns a Promise
 imageDataURI.outputFile(dataURI, filePath)
//  console.log(image_name);
 body.image_name = image_name;
 }
 if(id){
  if(dataURI){
  UpdateNewsGallerywithimage(body, (err, results) => {
    if(err){
       console.log(err);
      }
   return res.json({
     success: 1,
     message: "Updated successfully"
   });
 });
}else{
  UpdateNewsGallery(body, (err, results) => {
    if(err){
       console.log(err);
      }
   return res.json({
     success: 1,
     message: "Updated successfully"
   });
 });
}
 }else{
 CreateNewsGallery(body, (err, results) => {
   if(err){
      console.log(err);
     }
  return res.json({
    success: 1,
    message: "Added successfully"
  });
});
 }
},

getNewsGallery: (req, res) => {
  getNewsGallery( (err, results) => {
  if (err) {
    console.log(err);
    return;
  }
  if (!results) {
    return res.json({
      success: 0,
      message: "Record not Found"
    });
  }
  return res.json({
    success: 1,
    data: results
  });
});
},

DeleteNewsGallery: (req, res) => {
// const body = req.body;
const id = req.params.id;
DeleteNewsGallery(id,(err, results) => {
  if (err) {
    console.log(err);
    return;
  }
  return res.json({
    success: 1,
    data: "Deleted successfully"
  });

});
},

AddPhotoGallery: (req, res) => { 
  // const body = req.body.image_url; 
  const body = req.body;
 // Some image data uri
 let dataURI = body.image_url;
 // It will create the full path in case it doesn't exist
 // If the extension is defined (e.g. fileName.png), it will be preserved, otherwise the lib will try to guess from the Data URI
 rand =Math.floor((Math.random() * 30000000000000000) + 34);
 let filePath = './uploads/photogallery/'+rand+'.png';
 var image_name = rand+'.png';
 // Returns a Promise
 imageDataURI.outputFile(dataURI, filePath)
//  console.log(image_name);
 body.image_name = image_name;
 CreatePhotoGallery(body, (err, results) => {
   if(err){
      console.log(err);
     }
  return res.json({
    success: 1,
    message: "Added successfully"
  });
});
},

getPhotoGallery: (req, res) => {
  getPhotoGallery( (err, results) => {
  if (err) {
    console.log(err);
    return;
  }
  if (!results) {
    return res.json({
      success: 0,
      message: "Record not Found"
    });
  }
  return res.json({
    success: 1,
    data: results
  });
});
},

DeletePhotoGallery: (req, res) => {
// const body = req.body;
const id = req.params.id;
DeletePhotoGallery(id,(err, results) => {
  if (err) {
    console.log(err);
    return;
  }
  return res.json({
    success: 1,
    data: "Deleted successfully"
  });

});
},

AddVideoGallery: (req, res) => { 
  const body = req.body;
 CreateVideoGallery(body, (err, results) => {
   if(err){
      console.log(err);
     }
  return res.json({
    success: 1,
    message: "Added successfully"
  });
});
},

getVideoGallery: (req, res) => {
  getVideoGallery( (err, results) => {
  if (err) {
    console.log(err);
    return;
  }
  if (!results) {
    return res.json({
      success: 0,
      message: "Record not Found"
    });
  }
  return res.json({
    success: 1,
    data: results
  });
});
},

DeleteVideoGallery: (req, res) => {
// const body = req.body;
const id = req.params.id;
DeleteVideoGallery(id,(err, results) => {
  if (err) {
    console.log(err);
    return;
  }
  return res.json({
    success: 1,
    data: "Deleted successfully"
  });

});
},

ChangeMemberPasswordByTreasurer: (req, res) => {
  const body = req.body;
        body.id = body.member_id;
  const salt = genSaltSync(10);
  body.new_password = hashSync(body.new_password, salt);
     changepasswordBymemberId(body, (err, result) => {
    if (err) {
      console.log(err);
      return;
    }
    return res.json({
      success: 1,
      message: "updated successfully"
    });  
  });
},

TerminateMember: (req, res) => {
  const body = req.body;
        body.member_status = 2;
  TerminateMember(body, (err, result) => {
    if (err) {
      console.log(err);
      return;
    }

    TerminateSpouse(body, (err, result) => {
      if (err) {
        console.log(err);
        return;
      }
    });
    return res.json({
      success: 1,
      message: "updated successfully"
    });  
  });
},

MemberShipPaymentsHistory: (req, res) => {
  MemberShipPaymentsHistory( (err, results) => {
  if (err) {
    console.log(err);
    return;
  }
  if (!results) {
    return res.json({
      success: 0,
      message: "Record not Found"
    });
  }
  return res.json({
    success: 1,
    data: results
  });
});
},

getPaymentsDetails: (req, res) => {
  const id = req.params.id;
  getPaymentsDetails(id, (err, results) => {
  if (err) {
    console.log(err);
    return;
  }
  if (!results) {
    return res.json({
      success: 0,
      message: "Record not Found"
    });
  }
  return res.json({
    success: 1,
    data: results
  });
});
},

EventsPaymentsHistory: (req, res) => {
  EventsPaymentsHistory( (err, results) => {
  if (err) {
    console.log(err);
    return;
  }
  if (!results) {
    return res.json({
      success: 0,
      message: "Record not Found"
    });
  }
  return res.json({
    success: 1,
    data: results
  });
});
},

AddDownloadRequest: (req, res) => { 
  const body = req.body;
  AddDownloadRequest(body, (err, results) => {
   if(err){
      console.log(err);
     }
  return res.json({
    success: 1,
    message: "Added successfully"
  });
});
},

UpdateDownloadRequest: (req, res) => { 
  const body = req.body;
  var admin_id = body.admin_id;
  if(admin_id==1){
    UpdateDownloadRequestByPresident(body, (err, results) => {
      if(err){
         console.log(err);
        }
     return res.json({
       success: 1,
       message: "Added successfully"
     });
   });
  }

  if(admin_id==2){
    UpdateDownloadRequestBySecretery(body, (err, results) => {
      if(err){
         console.log(err);
        }
     return res.json({
       success: 1,
       message: "Added successfully"
     });
   });
  }

  if(admin_id==3){
    UpdateDownloadRequestByTreasurer(body, (err, results) => {
      if(err){
         console.log(err);
        }
     return res.json({
       success: 1,
       message: "Added successfully"
     });
   });
  }
  
},

getDownloadRequests: (req, res) => { 
  // const body = req.body;
  // const id = req.decoded.result.id;
  getDownloadRequests( (err, results) => {
   if(err){
      console.log(err);
     }
  return res.json({
    success: 1,
    download_requests: results
  });
});
},

getMyDownloadRequests: (req, res) => { 
  // const body = req.body;
  const id = req.decoded.result.id;
  getMyDownloadRequests(id, (err, results) => {
   if(err){
      console.log(err);
     }
  return res.json({
    success: 1,
    download_requests: results
  });
});
},

StartTransaction: (req, res) => { 
  const body = req.body;
  body.transaction_id = Math.floor((Math.random() * 30000000000000000) + 34);
  StartTransaction(body, (err, results) => {
   if(err){
      console.log(err);
     }
  return res.json({
    success: 1,
    transaction_id:body.transaction_id,
    message: "Added successfully"
  });
});
},

CheckTransaction: (req, res) => {
      const body = req.body;
      CheckTransaction(body.transaction_id,(err, results) => {
      if (err) {
        console.log(err);
        return;
      }

      if(results){
      return res.json({
        transaction_status: results.status,
        transaction_id: results.netstxnref
      });
      }

      if(!results){
      return res.json({
        status: 1
      });
      }

    });
  },

  UploadMembersData: async (req, res) => {
    console.log(req.file.filename);
    if (req.file == undefined) {
      return res.status(400).send("Please upload an excel file!");
    }
    const express = require('express');
    const app = express();
    var filePath = __basedir + '../../../uploads/membersdata/' + req.file.filename;
  await readXlsxFile(filePath).then(async(rows) => {
    for(var i=1;i<rows.length;i++){
      // console.log(rows[i]);
      var membershiptype_id=0;
      if(rows[i][0]=='Self (Annual)'){
         var membershiptype_id=1; 
        }else if(rows[i][0]=='Self (Life)'){
          var membershiptype_id=2; 
        } else if(rows[i][0]=='Family (Annual)'){ 
          var membershiptype_id=3; 
        }else if(rows[i][0]=='Family (Life)'){
          var membershiptype_id=4; 
        }
      if(membershiptype_id==1 || membershiptype_id==2){
      await new Promise(async function(resolve,reject){
        await pool.query("SELECT serial_no from members_master where year(created_on)='"+current_year+"' ORDER BY serial_no DESC LIMIT 1", async(err,result1,fields) =>{
          return resolve(result1);
       });
      }).then(async(result2) => {
        var membership_no = rows[i][3] ? rows[i][3] : '';
        if(membership_no != ''){
          var serial_no = rows[i][2] ? rows[i][2] : '';
          var registration_id = membership_no;
        }else{
        console.log('sno : ',result2);
        var year = rows[i][1] ? rows[i][1] : '';
        var serial_no = result2[0].serial_no+1;
        var registration_id = 'STS-'+current_year+'-'+serial_no;
        }

        var member_id = '';
        var member_type = 0;
        var membership_enddate = null;
        if(membershiptype_id==1){
        var d = new Date();
        var year = d.getFullYear();
        var month = d.getMonth();
        var day = d.getDate();
        var fulldate = new Date(year + 1, month, day);
        var toDate = fulldate.toISOString().slice(0, 10);
        var membership_enddate = "'"+toDate+"'";
        var membership_type = 0;
        }else{
          var membership_type = 1;
        } 
        rand3=Math.floor((Math.random() * 30000000000000000) + 34);
        var member_verifycode=rand3;

        var expire_on = rows[i][32]?rows[i][32]:null;
        if(expire_on!=null){
          var membership_enddate = moment(expire_on).format('YYYY-MM-DD');
          var membership_enddate = "'"+membership_enddate+"'";
        }
       

      var membership_amount = rows[i][4] ? rows[i][4] : '';
      var full_name = rows[i][5]?rows[i][5]:'';
      var nric_no = rows[i][6]?rows[i][6]:'';
      var gender = rows[i][7]?rows[i][7]:'';
      var dob = rows[i][8]?rows[i][8]:null;
      var nationality = rows[i][13]?rows[i][13]:'';
      var mobile = rows[i][9]?rows[i][9]:'';
      var residential_status = rows[i][11]?rows[i][11]:'';
      var email = rows[i][10]?rows[i][10]:'';
      var street1 = rows[i][12]?rows[i][12]:'';
      var street2 = rows[i][13]?rows[i][13]:'';
      var unit_no =rows[i][14]?rows[i][14]:'';
      var postal_code = rows[i][15]?rows[i][15]:'';
      var habbies = '';
      var reference = rows[i][17]?rows[i][17]:'';
      var introducer1 =rows[i][18]?rows[i][18]:'';
      var introducerNumber1 = rows[i][19]?rows[i][19]:'';
      var introducer2 =rows[i][20]?rows[i][20]:'';
      var introducerNumber2 = rows[i][21]?rows[i][21]:'';
      var comments = rows[i][22]?rows[i][22]:'';
      if(rows[i][23]==1){ habbies = habbies+'Prayers/Bhajans'; }
      if(rows[i][24]==1){ habbies = habbies+',Drama'; }
      if(rows[i][25]==1){ habbies = habbies+',Dance'; }
      if(rows[i][26]==1){ habbies = habbies+',Movies'; }
      if(rows[i][27]==1){ habbies = habbies+',Volunteering'; }
      if(rows[i][28]==1){ habbies = habbies+',Games'; }
      if(rows[i][29]==1){ habbies = habbies+',Literary Activities'; }
      if(rows[i][30]==1){ habbies = habbies+',Music'; }
      // console.log(habbies);
      var created_on = current_date;
      var created_on1 = rows[i][34]?rows[i][34]:null;
      if(created_on1!=null){
        var created_on = moment(created_on1).format('YYYY-MM-DD');
      }
      var updated_on = rows[i][33]?rows[i][33]:null;
      var issue_date = rows[i][31]?rows[i][31]:null;
      var remarks = rows[i][52]?rows[i][52]:'';
      var status = rows[i][53]?rows[i][53]:'0';
      if(status=='Approval Pending'){ status = 0;}
      if(status=='Approved'){ status = 1;}
      if(status=='Rejected'){ status = 2;}
      if(status=='Terminated'){ status = 3;}

      var member_type = 0;
      if(dob!=null){
        var dob = moment(dob).format('YYYY-MM-DD');
        var dob = "'"+dob+"'";
      }
      if(updated_on!=null){
        var updated_on = moment(updated_on).format('YYYY-MM-DD');
        var updated_on = "'"+updated_on+"'";
      }
      if(issue_date!=null){
        var issue_date = moment(issue_date).format('YYYY-MM-DD');
        var issue_date = "'"+issue_date+"'";
      }

      
      
        await new Promise(async function(resolve,reject){
          // var qry = "insert into members_master(serial_no,member_id, registration_id, membershiptype_id, membership_amount, nric_no, full_name,gender,dob,nationality,mobile,residential_status,email,street1,street2,unit_no,postal_code,habbies,reference_by,introducer1,introducer1_mobile,introducer2,introducer2_mobile,comments,member_verifycode,created_on,member_type,membership_type,membership_enddate,updated_on,issue_date,remarks,status) values('"+serial_no+"','"+member_id+"','"+registration_id+"','"+membershiptype_id+"','"+membership_amount+"','"+nric_no+"','"+full_name+"','"+gender+"',"+dob+",'"+nationality+"','"+mobile+"','"+residential_status+"','"+email+"','"+street1+"','"+street2+"','"+unit_no+"','"+postal_code+"','"+habbies+"','"+reference+"','"+introducer1+"','"+introducerNumber1+"','"+introducer2+"','"+introducerNumber2+"','"+comments+"','"+member_verifycode+"','"+created_on+"','"+member_type+"','"+membership_type+"',"+membership_enddate+","+updated_on+","+issue_date+",'"+remarks+"','"+status+"')";
          // console.log(qry);
          await pool.query("insert into members_master(serial_no,member_id, registration_id, membershiptype_id, membership_amount, nric_no, full_name,gender,dob,nationality,mobile,residential_status,email,street1,street2,unit_no,postal_code,habbies,reference_by,introducer1,introducer1_mobile,introducer2,introducer2_mobile,comments,member_verifycode,created_on,member_type,membership_type,membership_enddate,updated_on,issue_date,remarks,status) values('"+serial_no+"','"+member_id+"','"+registration_id+"','"+membershiptype_id+"','"+membership_amount+"','"+nric_no+"','"+full_name+"','"+gender+"',"+dob+",'"+nationality+"','"+mobile+"','"+residential_status+"','"+email+"','"+street1+"','"+street2+"','"+unit_no+"','"+postal_code+"','"+habbies+"','"+reference+"','"+introducer1+"','"+introducerNumber1+"','"+introducer2+"','"+introducerNumber2+"','"+comments+"','"+member_verifycode+"','"+created_on+"','"+member_type+"','"+membership_type+"',"+membership_enddate+","+updated_on+","+issue_date+",'"+remarks+"','"+status+"')",async(err,result3,fields) =>{ 
            return resolve(result3);
          });
        }).then(async(result4) => {
            // console.log('Success-loop1 : ',result4);

            host= process.env.WEB_URL;
            linkse="https://"+host+"/setpassword?token="+rand3;
            let transporter = nodeMailer.createTransport({
            host: 'mail.sts.org.sg',
            port: 465,
            secure: true,
            auth: {
                user: 'newinfo@sts.org.sg',
                pass: '@STSnewinfo1'
              }
            });
            let emailTemplatems;
            ejs
            .renderFile(path.join(__dirname, "views/member_welcome.ejs"), {
            user_firstname: full_name,
            confirm_link:"https://"+host+"/setpassword?token=" + rand3
            })
            .then(result => {
            emailTemplatems=result;
            let mailOptions = {
            from: 'newinfo@sts.org.sg', // sender address
            to: email,// list of receivers
            subject: 'New Member Registration', // Subject line
            text:'Thankyou for registering with STS', // plain text body
           //html : "Hello,"+req.body.full_name+" Thankyou for register with STS<br> Please Click on the link to verify your email.<br><a href="+linkse+">Click here to verify</a>"  // html body
            html:emailTemplatems
            };
            transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                return console.log(error);
            }
            console.log('Message %s sent: %s', info.messageId, info.response);
                // res.render('index');
            })});

          
        }).catch(err => {
          console.log(err);
        })
      }).catch(err => {
        console.log(err);
      })
    }else{
      await new Promise(async function(resolve,reject){
        await pool.query("SELECT serial_no from members_master where year(created_on)='"+current_year+"' ORDER BY serial_no DESC LIMIT 1", async(err,result1,fields) =>{
          return resolve(result1);
       });
      }).then(async(result2) => {
        var membership_no = rows[i][3] ? rows[i][3] : '';
        if(membership_no != ''){
          var serial_no = rows[i][2] ? rows[i][2] : '';
          var registration_id = membership_no;
        }else{
        // console.log('sno : ',result2);
        var serial_no = result2[0].serial_no+1;
        var year = rows[i][1] ? rows[i][1] : '';
        var registration_id = 'STS-'+year+'-'+serial_no;
        }
        var member_id = '';
        var member_type = 0;
        var membership_enddate = null;
        if(membershiptype_id==1){
        var d = new Date();
        var year = d.getFullYear();
        var month = d.getMonth();
        var day = d.getDate();
        var fulldate = new Date(year + 1, month, day);
        var toDate = fulldate.toISOString().slice(0, 10);
        var membership_enddate = "'"+toDate+"'";
        var membership_type = 0;
        }else{
          var membership_type = 1;
        } 
        rand3=Math.floor((Math.random() * 30000000000000000) + 34);
        var member_verifycode=rand3;

        var expire_on = rows[i][32]?rows[i][32]:null;
        // console.log('expires on1 : ',expire_on);
        if(expire_on!=null){
          // console.log('expires on2 : ',expire_on);
          var membership_enddate = moment(expire_on).format('YYYY-MM-DD');
          var membership_enddate = "'"+membership_enddate+"'";
        }
        // console.log('expires on3 : ',membership_enddate);

        var membership_amount = rows[i][4] ? rows[i][4] : '';
        var full_name = rows[i][5]?rows[i][5]:'';
        var nric_no = rows[i][6]?rows[i][6]:'';
        var gender = rows[i][7]?rows[i][7]:'';
        var dob = rows[i][8]?rows[i][8]:null;
        var nationality = rows[i][13]?rows[i][13]:'';
        var mobile = rows[i][9]?rows[i][9]:'';
        var residential_status = rows[i][11]?rows[i][11]:'';
        var email = rows[i][10]?rows[i][10]:'';
        var street1 = rows[i][12]?rows[i][12]:'';
        var street2 = rows[i][13]?rows[i][13]:'';
        var unit_no =rows[i][14]?rows[i][14]:'';
        var postal_code = rows[i][15]?rows[i][15]:'';
        var habbies = '';
        var reference = rows[i][17]?rows[i][17]:'';
        var introducer1 =rows[i][18]?rows[i][18]:'';
        var introducerNumber1 = rows[i][19]?rows[i][19]:'';
        var introducer2 =rows[i][20]?rows[i][20]:'';
        var introducerNumber2 = rows[i][21]?rows[i][21]:'';
        var comments = rows[i][22]?rows[i][22]:'';
        if(rows[i][23]==1){ habbies = habbies+'Prayers/Bhajans'; }
        if(rows[i][24]==1){ habbies = habbies+',Drama'; }
        if(rows[i][25]==1){ habbies = habbies+',Dance'; }
        if(rows[i][26]==1){ habbies = habbies+',Movies'; }
        if(rows[i][27]==1){ habbies = habbies+',Volunteering'; }
        if(rows[i][28]==1){ habbies = habbies+',Games'; }
        if(rows[i][29]==1){ habbies = habbies+',Literary Activities'; }
        if(rows[i][30]==1){ habbies = habbies+',Music'; }
        // console.log('loop2 : ',habbies);
        var created_on = current_date;
        var created_on1 = rows[i][34]?rows[i][34]:null;
        if(created_on1!=null){
          var created_on = moment(created_on1).format('YYYY-MM-DD');
        }
        var updated_on = rows[i][33]?rows[i][33]:null;
        var issue_date = rows[i][31]?rows[i][31]:null;
        var remarks = rows[i][52]?rows[i][52]:'';
        var status = rows[i][53]?rows[i][53]:'0';
        if(status=='Approval Pending'){ status = 0;}
        if(status=='Approved'){ status = 1;}
        if(status=='Rejected'){ status = 2;}
        if(status=='Terminated'){ status = 3;}
        var member_type = 0;
        if(dob!=null){
          var dob = moment(dob).format('YYYY-MM-DD');
          var dob = "'"+dob+"'";
        }
        if(updated_on!=null){
          var updated_on = moment(updated_on).format('YYYY-MM-DD');
          var updated_on = "'"+updated_on+"'";
        }
        if(issue_date!=null){
          var issue_date = moment(issue_date).format('YYYY-MM-DD');
          var issue_date = "'"+issue_date+"'";
        }
     

        await new Promise(async function(resolve,reject){
          // var qry = "insert into members_master(serial_no,member_id, registration_id, membershiptype_id, membership_amount, nric_no, full_name,gender,dob,nationality,mobile,residential_status,email,street1,street2,unit_no,postal_code,habbies,reference_by,introducer1,introducer1_mobile,introducer2,introducer2_mobile,comments,member_verifycode,created_on,member_type,membership_type,membership_enddate,updated_on,issue_date,remarks) values('"+serial_no+"','"+member_id+"','"+registration_id+"','"+membershiptype_id+"','"+membership_amount+"','"+nric_no+"','"+full_name+"','"+gender+"',"+dob+",'"+nationality+"','"+mobile+"','"+residential_status+"','"+email+"','"+street1+"','"+street2+"','"+unit_no+"','"+postal_code+"','"+habbies+"','"+reference+"','"+introducer1+"','"+introducerNumber1+"','"+introducer2+"','"+introducerNumber2+"','"+comments+"','"+member_verifycode+"','"+created_on+"','"+member_type+"','"+membership_type+"',"+membership_enddate+","+updated_on+","+issue_date+",'"+remarks+"')";
          // console.log('qry2 : ',qry);

          await pool.query("insert into members_master(serial_no,member_id, registration_id, membershiptype_id, membership_amount, nric_no, full_name,gender,dob,nationality,mobile,residential_status,email,street1,street2,unit_no,postal_code,habbies,reference_by,introducer1,introducer1_mobile,introducer2,introducer2_mobile,comments,member_verifycode,created_on,member_type,membership_type,membership_enddate,updated_on,issue_date,remarks,status) values('"+serial_no+"','"+member_id+"','"+registration_id+"','"+membershiptype_id+"','"+membership_amount+"','"+nric_no+"','"+full_name+"','"+gender+"',"+dob+",'"+nationality+"','"+mobile+"','"+residential_status+"','"+email+"','"+street1+"','"+street2+"','"+unit_no+"','"+postal_code+"','"+habbies+"','"+reference+"','"+introducer1+"','"+introducerNumber1+"','"+introducer2+"','"+introducerNumber2+"','"+comments+"','"+member_verifycode+"','"+created_on+"','"+member_type+"','"+membership_type+"',"+membership_enddate+","+updated_on+","+issue_date+",'"+remarks+"','"+status+"')",async(err,result3,fields) =>{ 
            return resolve(result3);
          });
        }).then(async(result4) => {
          // host=req.get('host');
            host= process.env.WEB_URL;
            linkse="https://"+host+"/setpassword?token="+rand3;
            let transporter = nodeMailer.createTransport({
            host: 'mail.sts.org.sg',
            port: 465,
            secure: true,
            auth: {
                user: 'newinfo@sts.org.sg',
                pass: '@STSnewinfo1'
              }
            });
            let emailTemplatems;
            ejs
            .renderFile(path.join(__dirname, "views/member_welcome.ejs"), {
            user_firstname: full_name,
            confirm_link:"https://"+host+"/setpassword?token=" + rand3
            })
            .then(result => {
            emailTemplatems=result;
            let mailOptions = {
            from: 'newinfo@sts.org.sg', // sender address
            to: email,// list of receivers
            subject: 'New Member Registration', // Subject line
            text:'Thankyou for registering with STS', // plain text body
           //html : "Hello,"+req.body.full_name+" Thankyou for register with STS<br> Please Click on the link to verify your email.<br><a href="+linkse+">Click here to verify</a>"  // html body
            html:emailTemplatems
            };
            transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                return console.log(error);
            }
            console.log('Message %s sent: %s', info.messageId, info.response);
                // res.render('index');
            })});

          // console.log('loop2 member - Success : ',result4);
//===============================Start Spouse=======================================//
          await new Promise(async function(resolve,reject){
            await pool.query("SELECT serial_no from members_master where year(created_on)='"+current_year+"' ORDER BY serial_no DESC LIMIT 1", async(err,result5,fields) =>{
              return resolve(result5);
           });
          }).then(async(result6) => {
            var membership_no = rows[i][37] ? rows[i][37] : '';
            if(membership_no != ''){
              var registration_id = membership_no;
              let serial_no = rows[i][36] ? rows[i][36] : '';
            }else{
            // console.log(result6);
            var year = rows[i][35] ? rows[i][35] : '';
            let serial_no = result6[0].serial_no+1;
            var registration_id = 'STS-'+year+'-'+serial_no;
            }
            var member_insertid = result4.insertId;
            var member_id = member_insertid;
            var member_type = 1;
            var membership_enddate = null;
            if(membershiptype_id==3){
            var d = new Date();
            var year = d.getFullYear();
            var month = d.getMonth();
            var day = d.getDate();
            var fulldate = new Date(year + 1, month, day);
            var toDate = fulldate.toISOString().slice(0, 10);
            var membership_enddate = "'"+toDate+"'";
            var membership_type = 0;
            }else{
              var membership_type = 1;
            }
            rand2=Math.floor((Math.random() * 20000000000000000) + 54);
            var member_verifycode=rand2;

            var expire_on = rows[i][32]?rows[i][32]:null;
            if(expire_on!=null){
              var membership_enddate = moment(expire_on).format('YYYY-MM-DD');
              var membership_enddate = "'"+membership_enddate+"'";
            }

            var membership_amount = rows[i][1]?rows[i][1]:'';
            var s_full_name = rows[i][38]?rows[i][38]:'';
            var s_nric_no = rows[i][39]?rows[i][39]:'';
            var s_gender = rows[i][40]?rows[i][40]:'';
            var s_dob = rows[i][41]?rows[i][41]:null;
            var s_nationality = rows[i][45]?rows[i][45]:'';
            var s_mobile = rows[i][42]?rows[i][42]:'';
            var s_residential_status = rows[i][44]?rows[i][44]:'';
            var s_email = rows[i][43]?rows[i][43]:'';
            
            var street1 = rows[i][12]?rows[i][12]:'';
            var street2 = rows[i][13]?rows[i][13]:'';
            var unit_no =rows[i][14]?rows[i][14]:'';
            var postal_code = rows[i][15]?rows[i][15]:'';
            var habbies = '';
            var reference = rows[i][17]?rows[i][17]:'';
            var introducer1 =rows[i][18]?rows[i][18]:'';
            var introducerNumber1 = rows[i][19]?rows[i][19]:'';
            var introducer2 =rows[i][20]?rows[i][20]:'';
            var introducerNumber2 = rows[i][21]?rows[i][21]:'';
            var comments = rows[i][22]?rows[i][22]:'';
            var created_on=current_date;
            if(s_dob!=null){
              var s_dob = moment(s_dob).format('YYYY-MM-DD');
              var s_dob = "'"+s_dob+"'";
            }

            await new Promise(async function(resolve,reject){
              // var qry = "insert into members_master(serial_no,member_id, registration_id, membershiptype_id, membership_amount, nric_no, full_name,gender,dob,nationality,mobile,residential_status,email,street1,street2,unit_no,postal_code,habbies,reference_by,introducer1,introducer1_mobile,introducer2,introducer2_mobile,comments,member_verifycode,created_on,member_type,membership_type,membership_enddate,updated_on,issue_date,remarks) values('"+serial_no+"','"+member_id+"','"+registration_id+"','"+membershiptype_id+"','"+membership_amount+"','"+s_nric_no+"','"+s_full_name+"','"+s_gender+"',"+s_dob+",'"+s_nationality+"','"+s_mobile+"','"+s_residential_status+"','"+s_email+"','"+street1+"','"+street2+"','"+unit_no+"','"+postal_code+"','"+habbies+"','"+reference+"','"+introducer1+"','"+introducerNumber1+"','"+introducer2+"','"+introducerNumber2+"','"+comments+"','"+member_verifycode+"','"+created_on+"','"+member_type+"','"+membership_type+"',"+membership_enddate+","+updated_on+","+issue_date+",'"+remarks+"')";
              // console.log('query spouse : ',qry);
              await pool.query("insert into members_master(serial_no,member_id, registration_id, membershiptype_id, membership_amount, nric_no, full_name,gender,dob,nationality,mobile,residential_status,email,street1,street2,unit_no,postal_code,habbies,reference_by,introducer1,introducer1_mobile,introducer2,introducer2_mobile,comments,member_verifycode,created_on,member_type,membership_type,membership_enddate,updated_on,issue_date,remarks,status) values('"+serial_no+"','"+member_id+"','"+registration_id+"','"+membershiptype_id+"','"+membership_amount+"','"+s_nric_no+"','"+s_full_name+"','"+s_gender+"',"+s_dob+",'"+s_nationality+"','"+s_mobile+"','"+s_residential_status+"','"+s_email+"','"+street1+"','"+street2+"','"+unit_no+"','"+postal_code+"','"+habbies+"','"+reference+"','"+introducer1+"','"+introducerNumber1+"','"+introducer2+"','"+introducerNumber2+"','"+comments+"','"+member_verifycode+"','"+created_on+"','"+member_type+"','"+membership_type+"',"+membership_enddate+","+updated_on+","+issue_date+",'"+remarks+"','"+status+"')",async(err,result7,fields) =>{
                return resolve(result7);
              });
            }).then(async(result8) => {
              host= process.env.WEB_URL;
              links="https://"+host+"/setpassword?token="+rand2;
              
                    let emailTemplates;
                ejs
                .renderFile(path.join(__dirname, "views/index.ejs"), {
                  user_firstname: s_full_name,
                  confirm_link:"https://"+host+"/setpassword?token=" + rand2
                })  .then(result => {
                  emailTemplates = result;
                 let mailOptionse = {
                      from: 'newinfo@sts.org.sg', // sender address
                      to: req.s_email,// list of receivers
                      subject: 'New Member Registration', // Subject line
                      text:'Thankyou for registering with STS', // plain text body
                      //html : "Hello,"+req.body.full_name+" Thankyou for register with STS<br> Please Click on the link to verify your email.<br><a href="+links+">Click here to verify</a>"  // html body
                  html:emailTemplates
                  };
                  transporter.sendMail(mailOptionse, (error, info) => {
                      if (error) {
                          return console.log(error);
                      }
                      console.log('Message %s sent: %s', info.messageId, info.response);
                          // res.render('index');
                      })});
            //  console.log('loop2 spouse : ',result8);
            var child_name1 = rows[i][28]?rows[i][28]:'';
            var child_dob1 = rows[i][29]?rows[i][29]:null;
            var child_gender1 = rows[i][30]?rows[i][30]:'';
            if(child_dob1!=null){
              var child_dob1 = moment(child_dob1).format('YYYY-MM-DD');
              var child_dob1 = "'"+child_dob1+"'";
            }

            var child_name2 = rows[i][31]?rows[i][31]:'';
            var child_dob2 = rows[i][32]?rows[i][32]:null;
            var child_gender2 = rows[i][33]?rows[i][33]:'';
            if(child_dob2!=null){
              var child_dob2 = moment(child_dob2).format('YYYY-MM-DD');
              var child_dob2 = "'"+child_dob2+"'";
            }

            if(child_name1){
              await new Promise(async function(resolve,reject){
                // var qry = "insert into childrens_master(member_id, child_name, dob, gender,created_on) values('"+member_insertid+"','"+child_name1+"',"+child_dob1+",'"+child_gender1+"','"+created_on+"')";
                // console.log('child1 qry : ',qry);
                await pool.query("insert into childrens_master(member_id, child_name, dob, gender,created_on) values('"+member_insertid+"','"+child_name1+"',"+child_dob1+",'"+child_gender1+"','"+created_on+"')",async(err,result9,fields) =>{
                  return resolve(result9);
                });
              }).then(async(result10) => {
                // console.log('child1 : ',result10);
                if(child_name2){
                  await new Promise(async function(resolve,reject){
                    await pool.query("insert into childrens_master(member_id, child_name, dob, gender,created_on) values('"+member_insertid+"','"+child_name2+"',"+child_dob2+",'"+child_gender2+"','"+created_on+"')",async(err,result11,fields) =>{
                      return resolve(result11);
                    });
                  }).then(async(result12) => {
                    // console.log('child2 : ',result12);
                  }).catch(err => {
                    console.log(err);
                  })
                }
      
                
              }).catch(err => {
                console.log(err);
              })
            }


    
            
            }).catch(err => {
              console.log(err);
            })
          }).catch(err => {
            console.log(err);
          })
//========================================End Spouse====================================//
          
        }).catch(err => {
          console.log(err);
        })
      }).catch(err => {
        console.log(err);
      }) 
      
    }
    };
  });

  // });
	res.json({
				'msg': 'File uploaded/import successfully!', 'file': req.file
			});
  },


  AddEvent: (req, res) => { 
    // const body = req.body.image_url; 
   const body = req.body;
   // Some image data uri
   let dataURI = body.image_url;
   let id = body.id;
  if(dataURI){
   // It will create the full path in case it doesn't exist
   // If the extension is defined (e.g. fileName.png), it will be preserved, otherwise the lib will try to guess from the Data URI
   rand =Math.floor((Math.random() * 30000000000000000) + 34);
   let filePath = './uploads/events/'+rand+'.png';
   var image_name = rand+'.png';
   // Returns a Promise
   imageDataURI.outputFile(dataURI, filePath)
  //  console.log(image_name);
   body.image_name = image_name;
  }
   if(id){
     if(dataURI){
    UpdateEventwithimg(body, (err, results) => {
        if(err){
           console.log(err);
          }
       return res.json({
         success: 1,
         message: "Update successfully"
       });
     }); 
  
     }else{
      UpdateEvent(body, (err, results) => {
        if(err){
           console.log(err);
          }
       return res.json({
         success: 1,
         message: "Update successfully"
       });
     });
     }
  
   }else{
    body.created_on = current_date;
   CreateEvent(body, (err, results) => {
     if(err){
        console.log(err);
       }
    return res.json({
      success: 1,
      message: "Added successfully"
    });
  });
   }
  },

  AddEventType: (req, res) => { 
    // const body = req.body.image_url; 
   const body = req.body;
   // Some image data uri
   let id = body.id;
   if(id){
      UpdateEventType(body, (err, results) => {
        if(err){
           console.log(err);
          }
        return res.json({
         success: 1,
         message: "Update successfully"
       });
     });
   }else{
    body.created_on = current_date;
   CreateEventType(body, (err, results) => {
     if(err){
        console.log(err);
       }
    return res.json({
      success: 1,
      message: "Added successfully"
    });
  });
   }
  },

  addService: (req, res) => { 
    // const body = req.body.image_url; 
   const body = req.body;
   // Some image data uri
   let dataURI = body.image_url;
   let id = body.id;
  if(dataURI){
   // It will create the full path in case it doesn't exist
   // If the extension is defined (e.g. fileName.png), it will be preserved, otherwise the lib will try to guess from the Data URI
   rand =Math.floor((Math.random() * 30000000000000000) + 34);
   let filePath = './uploads/services/'+rand+'.png';
   var image_name = rand+'.png';
   // Returns a Promise
   imageDataURI.outputFile(dataURI, filePath)
  //  console.log(image_name);
   body.image_name = image_name;
  }
   if(id){
     if(dataURI){
    UpdateServicewithimg(body, (err, results) => {
        if(err){
           console.log(err);
          }
       return res.json({
         success: 1,
         message: "Update successfully"
       });
     }); 
  
     }else{
      UpdateService(body, (err, results) => {
        if(err){
           console.log(err);
          }
       return res.json({
         success: 1,
         message: "Update successfully"
       });
     });
     }
  
   }else{
    body.created_on = current_date;
    addService(body, (err, results) => {
     if(err){
        console.log(err);
       }
    return res.json({
      success: 1,
      message: "Added successfully"
    });
  });
   }
  },

  addServiceContent: (req, res) => { 
   const body = req.body;
   let id = body.id;
   if(id){
      UpdateServiceContent(body, (err, results) => {
        if(err){
           console.log(err);
          }
       return res.json({
         success: 1,
         message: "Update successfully"
       });
     });
   }else{
    body.created_on = current_date;
    addServiceContent(body, (err, results) => {
     if(err){
        console.log(err);
       }
    return res.json({
      success: 1,
      message: "Added successfully"
    });
  });
   }
  },

  getServiceContents: (req, res) => {
    const service_id = req.params.service_id;
    getServiceContents(service_id, (err, results) => {
    if (err) {
      console.log(err);
      return;
    }
    getServiceGallery(service_id, (err, result) => {
      if (err) {
        console.log(err);
        return;
      }
      if(results){
        results.forEach(element => { 
        var content = element.description;
        element.description = content.replace(/<\/?[^>]+(>|$)/g, "");
        console.log(element.description);
        })
      }
    return res.json({
      success: 1,
      contents: results,
      gallery: result
    });
  });
  });
  },

  addServiceGallery: (req, res) => { 
    // const body = req.body.image_url; 
   const body = req.body;
   let dataURI = body.image_url;
  if(dataURI){
   // It will create the full path in case it doesn't exist
   // If the extension is defined (e.g. fileName.png), it will be preserved, otherwise the lib will try to guess from the Data URI
   rand =Math.floor((Math.random() * 30000000000000000) + 34);
   let filePath = './uploads/services/'+rand+'.png';
   var image_name = rand+'.png';
   // Returns a Promise
   imageDataURI.outputFile(dataURI, filePath)
  //  console.log(image_name);
   body.image_name = image_name;
   addServiceGallery(body, (err, results) => {
     if(err){
        console.log(err);
       }
    return res.json({
      success: 1,
      message: "Added successfully"
    });
  });
 }else{
  return res.json({
    success: 0,
    message: "No Image Selected"
  });
 } 
  },

  getServiceGallery: (req, res) => {
    const service_id = req.params.service_id;
    getServiceGallery(service_id, (err, results) => {
    if (err) {
      console.log(err);
      return;
    }
    if (!results) {
      return res.json({
        success: 0,
        message: "Record not Found"
      });
    }
    return res.json({
      success: 1,
      data: results
    });
  });
  },

  getServices: (req, res) => {
    getServices( (err, results) => {
    if (err) {
      console.log(err);
      return;
    }
    if (!results) {
      return res.json({
        success: 0,
        message: "Record not Found"
      });
    }
    return res.json({
      success: 1,
      data: results
    });
  });
  },

  DeleteServiceGallery: (req, res) => {
    // const body = req.body;
    const id = req.params.id;
    DeleteServiceGallery(id,(err, results) => {
      if (err) {
        console.log(err);
        return;
      }
      return res.json({
        success: 1,
        data: "Deleted successfully"
      });
    
    });
    },

  getServiceById: (req, res) => {
    const id = req.params.id;
    getServiceById(id, (err, results) => {
    if (err) {
      console.log(err);
      return;
    }
    if (!results) {
      return res.json({
        success: 0,
        message: "Record not Found"
      });
    }
    return res.json({
      success: 1,
      data: results
    });
  });
  },

  AddCommitee: (req, res) => { 
   const body = req.body;
   let id = body.id;
   if(id){
      UpdateCommitee(body, (err, results) => {
        if(err){
           console.log(err);
          }
       return res.json({
         success: 1,
         message: "Update successfully"
       });
     });  
   }else{
    AddCommitee(body, (err, results) => {
     if(err){
        console.log(err);
       }
    return res.json({
      success: 1,
      message: "Added successfully"
    });
  });
   }
  },

  getCommitee: (req, res) => {
    getCommitee( (err, results) => {
    if (err) {
      console.log(err);
      return;
    }
    if (!results) {
      return res.json({
        success: 0,
        message: "Record not Found"
      });
    }
    return res.json({
      success: 1,
      data: results
    });
  });
  },

  getCommitteeById: (req, res) => {
    const id = req.params.id;
    getCommitteeById(id, (err, results) => {
    if (err) {
      console.log(err);
      return;
    }
    if (!results) {
      return res.json({
        success: 0,
        message: "Record not Found"
      });
    }
    return res.json({
      success: 1,
      data: results
    });
  });
  },

  getCommiteeDesignations: (req, res) => {
    getCommiteeDesignations( (err, results) => {
    if (err) {
      console.log(err);
      return;
    }
    if (!results) {
      return res.json({
        success: 0,
        message: "Record not Found"
      });
    }
    return res.json({
      success: 1,
      data: results
    });
  });
  },

AddCommiteeMembers: (req, res) => { 
    // const body = req.body.image_url; 
   const body = req.body;
   // Some image data uri
   let dataURI = body.image_url;
   let id = body.id;
  if(dataURI){
   // It will create the full path in case it doesn't exist
   // If the extension is defined (e.g. fileName.png), it will be preserved, otherwise the lib will try to guess from the Data URI
   rand =Math.floor((Math.random() * 30000000000000000) + 34);
   let filePath = './uploads/commitee/'+rand+'.png';
   var image_name = rand+'.png';
   // Returns a Promise
   imageDataURI.outputFile(dataURI, filePath)
  //  console.log(image_name);
   body.image_name = image_name;
  }
   if(id){
     if(dataURI){
      UpdateCommiteeMemberswithimg(body, (err, results) => {
        if(err){
           console.log(err);
          }
       return res.json({
         success: 1,
         message: "Update successfully"
       });
     }); 
  
     }else{
      UpdateCommiteeMembers(body, (err, results) => {
        if(err){
           console.log(err);
          }
       return res.json({
         success: 1,
         message: "Update successfully"
       });
     });
     }
  
   }else{
    body.created_on = current_date;
    AddCommiteeMembers(body, (err, results) => {
     if(err){
        console.log('err : ',err);
       }
    if(results){
    return res.json({
      success: 1,
      message: "Added successfully"
    });
  }else{
    console.log('err : ',err);
  }
  });
   }
  },

  getCommiteeMembers: (req, res) => {
    const committee_id = req.params.committee_id;
    getCommiteeMembers(committee_id, (err, results) => {
    if (err) {
      console.log(err);
      return;
    }
    if (!results) {
      return res.json({
        success: 0,
        message: "Record not Found"
      });
    }
    return res.json({
      success: 1,
      data: results
    });
  });
  },

  getCommitteeMemberById: (req, res) => {
    const id = req.params.id;
    getCommitteeMemberById(id, (err, results) => {
    if (err) {
      console.log(err);
      return;
    }
    if (!results) {
      return res.json({
        success: 0,
        message: "Record not Found"
      });
    }
    return res.json({
      success: 1,
      data: results
    });
  });
  },

  getEvents: (req, res) => {
    getEvents( (err, results) => {
    if (err) {
      console.log(err);
      return;
    }
    if (!results) {
      return res.json({
        success: 0,
        message: "Record not Found"
      });
    }
    return res.json({
      success: 1,
      data: results
    });
  });
  },

  getEventstypes: (req, res) => {
    getEventstypes( (err, results) => {
    if (err) {
      console.log(err);
      return;
    }
    if (!results) {
      return res.json({
        success: 0,
        message: "Record not Found"
      });
    }
    return res.json({
      success: 1,
      data: results
    });
  });
  },

  DeleteEvent: (req, res) => {
    // const body = req.body;
    const id = req.params.id;
    DeleteEvent(id,(err, results) => {
      if (err) {
        console.log(err);
        return;
      }
      return res.json({
        success: 1,
        data: "Deleted successfully"
      });
    
    });
    },

    DeleteEventImage: (req, res) => {
      // const body = req.body;
      const id = req.params.id;
      DeleteEventImage(id,(err, results) => {
        if (err) {
          console.log(err);
          return;
        }
        return res.json({
          success: 1,
          data: "Deleted successfully"
        });
      
      });
      },

      getEventImages: (req, res) => {
        const event_id = req.params.event_id;
        getEventImages(event_id, (err, results) => {
        if (err) {
          console.log(err);
          return;
        }
        if (!results) {
          return res.json({
            success: 0,
            message: "Record not Found"
          });
        }
        return res.json({
          success: 1,
          data: results
        });
      });
      },

  getEvents: (req, res) => {
    getEvents( (err, results) => {
    if (err) {
      console.log(err);
      return;
    }
    if (!results) {
      return res.json({
        success: 0,
        message: "Record not Found"
      });
    }
    return res.json({
      success: 1,
      data: results
    });
  });
  },

  getEventById: (req, res) => {
    const id = req.params.id;
    getEventById(id, (err, results) => {
    if (err) {
      console.log(err);
      return;
    }
    if (!results) {
      return res.json({
        success: 0,
        message: "Record not Found"
      });
    }
    return res.json({
      success: 1,
      data: results
    });
  });
  },

  getUpcomingEvents: (req, res) => {
    var date=current_date;
    getUpcomingEvents(date, (err, results) => {
    if (err) {
      console.log(err);
      return;
    }
    if (!results) {
      return res.json({
        success: 0,
        message: "Record not Found"
      });
    }
    return res.json({
      success: 1,
      data: results
    });
  });
  },

  getPastEvents: (req, res) => {
    var date=current_date;
    getPastEvents(date, (err, results) => {
    if (err) {
      console.log(err);
      return;
    }
    if (!results) {
      return res.json({
        success: 0,
        message: "Record not Found"
      });
    }
    return res.json({
      success: 1,
      data: results
    });
  });
  },

  getRecentEvents: (req, res) => {
    // var date=current_date;
    // var otpexpiry_datetime = moment(date).add(10, 'days').format('YYYY-MM-DD');
    // console.log(otpexpiry_datetime);
    getRecentEvents((err, results) => {
    if (err) {
      console.log(err);
      return;
    }
    if (!results) {
      return res.json({
        success: 0,
        message: "Record not Found"
      });
    }
    return res.json({
      success: 1,
      data: results
    });
  });
  },

  addeventimages: (req, res) => { 
    // const body = req.body.image_url; 
    const body = req.body;
   // Some image data uri
   let dataURI = body.image_url;
   let event_id = body.event_id;
   // It will create the full path in case it doesn't exist
   // If the extension is defined (e.g. fileName.png), it will be preserved, otherwise the lib will try to guess from the Data URI
   if(dataURI){
   rand =Math.floor((Math.random() * 30000000000000000) + 34);
   let filePath = './uploads/eventimages/'+rand+'.png';
   var image_name = rand+'.png';
   // Returns a Promise
   imageDataURI.outputFile(dataURI, filePath)
  //  console.log(image_name);
   body.image_name = image_name;
   }
   addeventimages(body, (err, results) => {
     if(err){
        console.log(err);
       }
    return res.json({
      success: 1,
      message: "Added successfully"
    });
  });
  },

  AddEventBooking: (req, res) => { 
    // const body = req.body.image_url; 
   const body = req.body;
   var membership_id = body.membership_id;
   CheckMemberShipid(membership_id,current_date, (err, result) => {
    if(!result){
      return res.json({
        success: 1,
        message: "Added successfully"
      });
    }
    body.member_id = result.id;
    AddEventBooking(body, (err, results) => {
     if(err){
        console.log(err);
       }
    return res.json({
      success: 1,
      message: "Added successfully"
    });
  });
});
},

VerifyMember: (req, res) => {
  const body = req.body;
  var membership_id = body.membership_id;
  var email = body.email;
  console.log('body : ',body);
  console.log('membership_id :', membership_id);
  console.log('email :',email);
  if(membership_id!=undefined && email==undefined){
    CheckMemberShipid(membership_id,current_date, (err, result) => {
      console.log('dfdffdsfd : ',result.length);
      if(result.length==0){
        return res.json({
          success: 0,
          message: "Invalid Membeship ID123"
        });
      }
      if(result.length!=0){
        var digits = '0123456789'; 
        let OTP = ''; 
        for (let i = 0; i < 6; i++ ) { 
            OTP += digits[Math.floor(Math.random() * 10)]; 
        } 
       body.member_verifyotp = OTP;
       body.created_on = current_date;
       var current_datetime =  moment().format('YYYY-MM-DD HH:mm:ss');
       var otpexpiry_datetime = moment(current_datetime).add(10, 'minutes').format('YYYY-MM-DD HH:mm:ss');
       body.otpexpiry_datetime = otpexpiry_datetime;
       body.email = result[0].email;
      deleteOldMemberOtp(body.email, (err, results1) => {
      AddMemberOtp(body, (err, results) => {
        let transporter = nodeMailer.createTransport({
              host: 'mail.sts.org.sg',
              port: 465,
              secure: true,
              auth: {
                  user: 'otp@sts.org.sg',
                  pass: '@STSotpsend1'
              }
          });
              let emailTemplatemswaw;
        ejs
        .renderFile(path.join(__dirname, "views/eventotp.ejs"), {
          user_firstname: result.full_name,
        user_otp:body.member_verifyotp
      
        })
      .then(result => {
        emailTemplatemswaw=result;
          let mailOptions = {
              from: 'otp@sts.org.sg', // sender address
              to: body.email,// list of receivers
              subject: 'Otp Verification', // Subject line
              text:'Please Verify Your Otp', // plain text body
             //html : "Hello,"+req.body.full_name+" Thankyou for register with STS<br> Please Click on the link to verify your email.<br><a href="+linkse+">Click here to verify</a>"  // html body
         html:emailTemplatemswaw
          };
          transporter.sendMail(mailOptions, (error, info) => {
              if (error) {
                  return console.log(error);
              }
              console.log('Message %s sent: %s', info.messageId, info.response);
                  res.render('index');
             })});
        
          if (err) {
            console.log(err);
        
            return;
          }
          return res.json({
            success: 1,
            message: "Otp sent to your email please verify it",
            data: result[0]
      
          });
        });
        })
        // return res.json({
        //   success: 1,
        //   message: "Otp sent to your email please verify it",
        //   data: result
        // });
      }
    });

  }else if(email!=undefined && membership_id==undefined){
    var digits = '0123456789'; 
  let OTP = ''; 
  for (let i = 0; i < 6; i++ ) { 
      OTP += digits[Math.floor(Math.random() * 10)]; 
  } 
 body.member_verifyotp = OTP;
 body.created_on = current_date;
 var current_datetime =  moment().format('YYYY-MM-DD HH:mm:ss');
 var otpexpiry_datetime = moment(current_datetime).add(10, 'minutes').format('YYYY-MM-DD HH:mm:ss');
 body.otpexpiry_datetime = otpexpiry_datetime;
deleteOldMemberOtp(body.email, (err, results1) => {
AddMemberOtp(body, (err, results) => {
  let transporter = nodeMailer.createTransport({
        host: 'mail.sts.org.sg',
        port: 465,
        secure: true,
        auth: {
            user: 'otp@sts.org.sg',
            pass: '@STSotpsend1'
        }
    });
        let emailTemplatemswaw;
  ejs
  .renderFile(path.join(__dirname, "views/eventotp.ejs"), {
    user_firstname: 'Member',
  user_otp:body.member_verifyotp

  })
.then(result => {
  emailTemplatemswaw=result;
    let mailOptions = {
        from: 'otp@sts.org.sg', // sender address
        to: body.email,// list of receivers
        subject: 'Otp Verification', // Subject line
        text:'Please Verify Your Otp', // plain text body
       //html : "Hello,"+req.body.full_name+" Thankyou for register with STS<br> Please Click on the link to verify your email.<br><a href="+linkse+">Click here to verify</a>"  // html body
   html:emailTemplatemswaw
    };
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return console.log(error);
        }
        console.log('Message %s sent: %s', info.messageId, info.response);
            res.render('index');
       })});
  
    if (err) {
      console.log(err);
      return;
    }
    return res.json({
      success: 1,
      message: "Otp sent to your email please verify it",
      data:{'membership_id':0}
    });
  });
  })
  }

},

getEventBookings: (req, res) => {
  var member_id = req.decoded.result.id;
  getEventBookings(member_id,(err, results) => {
    if (err) {
      console.log(err);
      return;
    }
    return res.status(200).json({
      success: 1,
      data: results
    });
  });
},

getMemberEventsBookings: (req, res) => {
  getMemberEventsBookings((err, results) => {
    if (err) {
      console.log(err);
      return;
    }
    return res.status(200).json({
      success: 1,
      data: results
    });
  });
},

getEventbookingById: (req, res) => {
  const event_id = req.params.event_id;
  getEventbookingById(event_id,(err, results) => {
    if (err) {
      console.log(err);
      return;
    }
    if(results.length>0){
    return res.status(200).json({
      success: 1,
      data: results[0]
    });
  }else{
    return res.status(200).json({
      success: 0,
      data: {}
    });
  }
  });
},



   TestMail: (req, res) => {
    // var d = new Date("2014-10-29");
    // var year = d.getFullYear();
    // var month = d.getMonth();
    // var day = d.getDate();
    // var fulldate = new Date(year + 1, month, day);
    // var toDate = fulldate.toISOString().slice(0, 10);
    var months = moment("2020-12-25").diff(current_date, "months");
    console.log(months);
    // var date = new Date("2014-10-29"); 
    //  var todate = date.setFullYear(date.getFullYear() + 1);
    // console.log(todate);
// const nodemailer = require('nodemailer');
// let transporter = nodemailer.createTransport({
//     host: 'mail.sts.org.sg',
//     port: 587,
//     secure: false,
//     requireTLS: true,
//     auth: {
//         user: 'sathish.svapps@gmail.com',
//         pass: 'sathish586'
//     } 
// });
// let mailOptions = {
//     from: 'sathish.svapps@gmail.com',
//     to: 'msthsh5@gmail.com',
//     subject: 'Test',
//     text: 'Hello World!',
//     html: '<b>Welcome Email From Sts</b>'
// };
// transporter.sendMail(mailOptions, (error, info) => {
//     if (error) {
//         return console.log(error.message);
//     }
//     console.log('success');
// });

  }
  

};

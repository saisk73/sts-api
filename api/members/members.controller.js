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
UpdateMemberVerify_Status
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
const multer = require('multer');
const readXlsxFile = require('read-excel-file/node');

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
  linkse="http://"+host+"/setpassword?token="+rand3;
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
      confirm_link:"http://"+host+"/setpassword?token=" + rand3
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
  link="http://"+host+"/setpassword?token="+rand;
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
      confirm_link:"http://"+host+"/setpassword?token=" + rand
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
  links="http://"+host+"/setpassword?token="+rand2;
  
        let emailTemplates;
    ejs
    .renderFile(path.join(__dirname, "views/index.ejs"), {
      user_firstname: req.body.s_full_name,
      confirm_link:"http://"+host+"/setpassword?token=" + rand2
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
          expiresIn: "1h"
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
  linksef="http://"+host+"/setpassword?token="+rand4;
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
    .renderFile(path.join(__dirname, "views/index.ejs"), {
      user_firstname: results.full_name,
      confirm_link:"http://"+host+"/resetpassword?token=" + rand4
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
   body.member_verifycode=rand4;
   
    updateUsersVerification(body, (err, results) => {
    
    
    
    
      if (err) {
        console.log(err);
    
        return;
      }
      return res.json({
        success: 1,
        message: "Verification Sent successfully to your mail"
      });
    })}; });
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
  linksef="http://"+host+"/login";
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
      confirm_link:"http://"+host+"/api/members/login"
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
  // links="http://"+host+"/setpassword?token="+rand2;
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
  //     confirm_link:"http://"+host+"/setpassword?token=" + rand2
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
    UpdateMemberShipByTreasurer(body, (err, results) => {
      if(err){
        console.log(err);
           }

           body.created_on=current_date;
           body.id=body.member_id;
           createMemberShipHistory(body, (err, results) => {
            if(err){
               console.log(err);
             }
           });
           UpdateSpouseMemberShipByTreasurer(body, (err, results) => {
            if(err){
              console.log(err);
              return;
               }
              })
         //Create Membership History - End
           return res.json({
             success: 1,
             message: "updated successfully"
           });
    });
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
      linkse="http://"+host+"/setpassword?token="+rand3;
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
      confirm_link:"http://"+host+"/setpassword?token=" + rand3
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
      link="http://"+host+"/setpassword?token="+rand;
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
      confirm_link:"http://"+host+"/setpassword?token=" + rand
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
      linkse="http://"+host+"/setpassword?token="+rand3;
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
      user_firstname: resul1.full_name,
      confirm_link:"http://"+host+"/setpassword?token=" + rand3
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
      link="http://"+host+"/setpassword?token="+rand;
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
    .renderFile(path.join(__dirname, "views/index.ejs"), {
      user_firstname: results1.full_name,
      confirm_link:"http://"+host+"/setpassword?token=" + rand
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
    linkse="http://"+host+"/setpassword?token="+rand3;
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
        confirm_link:"http://"+host+"/setpassword?token=" + rand3
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
   links="http://"+host+"/setpassword?token="+rand2;
   
         let emailTemplates;
     ejs
     .renderFile(path.join(__dirname, "views/index.ejs"), {
       user_firstname: results_spouse.full_name,
       confirm_link:"http://"+host+"/setpassword?token=" + rand2
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
          linkse="http://"+host+"/setpassword?token="+rand3;
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
              confirm_link:"http://"+host+"/setpassword?token=" + rand3
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
            linkse="http://"+host+"/setpassword?token="+rand3;
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
                confirm_link:"http://"+host+"/setpassword?token=" + rand3
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

  UploadMembersData: (req, res) => {
    global.__basedir = __dirname;
    const express = require('express');
    const app = express();
 
// -> Multer Upload Storage
const storage = multer.diskStorage({
	destination: (req, file, cb) => {
	   cb(null, __basedir + '/uploads/membersdata/')
	},
	filename: (req, file, cb) => {
	   cb(null, file.fieldname + "-" + Date.now() + "-" + file.originalname)
	}
});

const upload = multer({storage: storage});
console.log('sdfghjk : ',req.file);
// -> Express Upload RestAPIs
  var filePath = __basedir + '/uploads/' + req.file.filename;
	// importExcelData2MySQL(__basedir + '/uploads/' + req.file.filename);

  readXlsxFile(filePath).then((rows) => {
    rows.shift();
    rows.forEach(row => {
      console.log(row);
    });

  });
	res.json({
				'msg': 'File uploaded/import successfully!', 'file': req.file
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

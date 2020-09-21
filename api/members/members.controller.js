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
UpdateMemberShipByMember,
UpdateMemberByMemberId,
UpdateSpouseBySpouseId,
UpdateMemberShip_spouse,
UpdateMemberShip_SpouseInactive,
UpdateMemberShip_ChildrensInactive,
UpdateMemberShipBySpouse,
UpdateMemberShip_Member,
createMemberShipHistory,
UpdateLoginOtp,
getAdminByMemberEmail,
getMembersList,
getVerifiedMembersList,
UpdateMemberVerifyStatus,
UpdateSpouseVerifyStatus,
getMemberDetails,
createMemberLoginHistory,
MemberShipRenewalByMember,
MemberShipRenewalBySpouse
} = require("./members.service");
require("dotenv").config();
const ejs = require("ejs");
const path=require("path");
const { hashSync, genSaltSync, compareSync } = require("bcrypt");
const { sign } = require("jsonwebtoken");
var moment = require('moment');
var nodeMailer = require('nodemailer');
var current_date =  moment().format('YYYY-MM-DD');
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
      var uniqueid = new Date().valueOf();
      body.registration_id = uniqueid;
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

      // //mail Sending//
    
  // host=req.get('host');
  host= process.env.WEB_URL;
  linkse="http://"+host+"/setpassword?token="+rand3;
       let transporter = nodeMailer.createTransport({
          host: 'smtp.gmail.com',
          port: 465,
          secure: true,
          auth: {
              user: 'svapps.websts@gmail.com',
              pass: '2020#2020'
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
          from: 'svapps.websts@gmail.com', // sender address
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

    }else{
      var uniqueid = new Date().valueOf();
      body.registration_id = uniqueid;
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

      
  // host=req.get('host');
  host= process.env.WEB_URL;
  link="http://"+host+"/setpassword?token="+rand;
      body.member_id = '';
      var member_insertid = '';
   
       let transporter = nodeMailer.createTransport({
          host: 'smtp.gmail.com',
          port: 465,
          secure: true,
          auth: {
              user: 'svapps.websts@gmail.com',
              pass: '2020#2020'
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
          from: 'svapps.websts@gmail.com', // sender address
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
    //Create MEmbership end date-end
    body.registration_id = uniqueid+'S';
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
          from: 'svapps.websts@gmail.com', // sender address
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
          host: 'smtp.gmail.com',
          port: 465,
          secure: true,
          auth: {
              user: 'svapps.websts@gmail.com',
              pass: '2020#2020'
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
          from: 'svapps.websts@gmail.com', // sender address
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

   getChildrensBymemberId: (req, res) => {
    const id = req.decoded.result.id;
    getChildrensBymemberId(id, (err, results) => {
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
      }
    else
    {
  
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
    })}; });
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
    AddMemberOtp(body, (err, results) => {
    let transporter = nodeMailer.createTransport({
          host: 'smtp.gmail.com',
          port: 465,
          secure: true,
          auth: {
              user: 'svapps.websts@gmail.com',
              pass: '2020#2020'
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
          from: 'svapps.websts@gmail.com', // sender address
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
          host: 'smtp.gmail.com',
          port: 465,
          secure: true,
          auth: {
              user: 'svapps.websts@gmail.com',
              pass: '2020#2020'
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
          from: 'svapps.websts@gmail.com', // sender address
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

  UpdateSpouse: (req, res) => {
  const body = req.body;
  if(body.id){
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
    body.member_id = req.decoded.result.id;
    body.registration_id = req.decoded.result.registration_id+'S';
    body.membershiptype_id = req.decoded.result.membershiptype_id;
    body.membership_amount = req.decoded.result.membership_amount;
    body.street1 = req.decoded.result.street1;
    body.street2 = req.decoded.result.street2;
    body.unit_no = req.decoded.result.unit_no;
    body.postal_code = req.decoded.result.postal_code;
    body.habbies = req.decoded.result.habbies;
    body.introducer1 = req.decoded.result.introducer1;
    body.introducer2 = req.decoded.result.introducer2;
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
          from: 'svapps.websts@gmail.com', // sender address
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
    body.membership_type = '';
    var membershiptype_id = req.decoded.result.membershiptype_id;
    if(body.member_type==0){
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
          var membership_enddate = req.decoded.result.membership_enddate;
          var d = new Date(membership_enddate);
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
         var membership_enddate = req.decoded.result.membership_enddate;
          var d = new Date(membership_enddate);
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
            }

      }else{

          if(membershiptype_id==3 && body.membershiptype_id==4){
          body.membership_type = 1; // 1-> Life
          body.membership_enddate = null;
          body.id = req.decoded.result.id;
            UpdateMemberShipBySpouse(body, (err, results) => {
            if(err){
              console.log(err);
              return;
               }

              body.member_status=0;
              body.member_id = req.decoded.result.member_id;
            UpdateMemberShip_Member(body, (err, results) => {
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
    UpdateLoginOtp(body, (err, results) => {
    let transporter = nodeMailer.createTransport({
          host: 'smtp.gmail.com',
          port: 465,
          secure: true,
          auth: {
              user: 'svapps.websts@gmail.com',
              pass: '2020#2020'
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
          from: 'svapps.websts@gmail.com', // sender address
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

getMemberDetails: (req, res) => {
    // const body = req.body;
    const id = req.params.id;
    getMemberDetails(id,(err, results) => {
      if (err) {
        console.log(err);
        return;
      }

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
      
      if(results){
        return res.status(200).json({
        success: 1,
        member_data: results,
        spouse_data:results1,
        child_data:results2
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
  },

  UpdateMemberVerifyStatus: (req, res) => {
    const body = req.body;
    rand3=Math.floor((Math.random() * 30000000000000000) + 34);
    body.member_verifycode=rand3;

     getMemberDetails(body.id,(err, resul1) => {
      if (err) {
        console.log(err);
        return;
      }

   UpdateMemberVerifyStatus(body, (err, results) => {
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
          host: 'smtp.gmail.com',
          port: 465,
          secure: true,
          auth: {
              user: 'svapps.websts@gmail.com',
              pass: '2020#2020'
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
          from: 'svapps.websts@gmail.com', // sender address
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
getSpouseBymemberId(body.id, (err, results1) => {
      if (err) {
        console.log(err);
        return;
      }
      if(results1){
      UpdateSpouseVerifyStatus(body, (err, resul) => {
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
          host: 'smtp.gmail.com',
          port: 465,
          secure: true,
          auth: {
              user: 'svapps.websts@gmail.com',
              pass: '2020#2020'
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
          from: 'svapps.websts@gmail.com', // sender address
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

      return res.status(200).json({
        success: true,
        data: results
      });
    });
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
            body.membershiptype_id = req.decoded.result.membershiptype_id;
            body.membership_amount = req.decoded.result.membership_amount;
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
            body.membershiptype_id = req.decoded.result.membershiptype_id;
            body.membership_amount = req.decoded.result.membership_amount;
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
          host: 'smtp.gmail.com',
          port: 465,
          secure: true,
          auth: {
              user: 'svapps.websts@gmail.com',
              pass: '2020#2020'
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
          from: 'svapps.websts@gmail.com', // sender address
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

   TestMail: (req, res) => {
    var d = new Date("2014-10-29");
    var year = d.getFullYear();
    var month = d.getMonth();
    var day = d.getDate();
    var fulldate = new Date(year + 1, month, day);
    var toDate = fulldate.toISOString().slice(0, 10);
    console.log(toDate);
    // var date = new Date("2014-10-29"); 
    //  var todate = date.setFullYear(date.getFullYear() + 1);
    // console.log(todate);
// const nodemailer = require('nodemailer');
// let transporter = nodemailer.createTransport({
//     host: 'smtp.gmail.com',
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

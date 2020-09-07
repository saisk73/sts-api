const {
 createMember,
 createSpouseMember,
 createChildrens,
 getUserByMemberEmail,
 getMemberById,
 getSpouseBymemberId,
 getChildrensBymemberId,
 // ResetPassword, 
 getUserBymembermerificationid,
 updateUsers
} = require("./members.service");
require("dotenv").config();
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
    if(body.membershiptype_id==1 || body.membershiptype_id==2){
       var uniqueid = new Date().valueOf();
      body.registration_id = uniqueid;
      body.member_id = '';
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
      rand3=Math.floor((Math.random() * 30000000000000000) + 34);
  // host=req.get('host');
      host= process.env.WEB_URL;
  linkse="http://"+req.get('host')+"/setpassword?token="+rand3;
      body.member_verifycode=rand3;
       let transporter = nodeMailer.createTransport({
          host: 'smtp.gmail.com',
          port: 465,
          secure: true,
          auth: {
              user: 'svapps.websts@gmail.com',
              pass: '2020#2020'
          }
      });
      let mailOptions = {
          from: 'svapps.websts@gmail.com', // sender address
          to: req.body.email,// list of receivers
          subject: 'New Member Registration', // Subject line
          text:'Thankyou for registering with STS', // plain text body
         html : "Hello,"+req.body.full_name+" Thankyou for register with STS<br> Please Click on the link to verify your email.<br><a href="+linkse+">Click here to verify</a>"  // html body
      };

      transporter.sendMail(mailOptions, (error, info) => {
          if (error) {
              return console.log(error);
          }
          console.log('Message %s sent: %s', info.messageId, info.response);
              res.render('index');
          });
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
      var member_insertid = '';
    createMember(body, (err, results) => {
      if (err) {
        console.log(err);
        return res.status(500).json({
          success: 0,
          message: "Database connection errror"
        });
      }

      rand=Math.floor((Math.random() * 10000000000000000) + 94);
  // host=req.get('host');
  host= process.env.WEB_URL;
  link="http://"+req.get('host')+"/setpassword?token="+rand;
      body.member_id = '';
      var member_insertid = '';
    body.member_verifycode=rand;
       let transporter = nodeMailer.createTransport({
          host: 'smtp.gmail.com',
          port: 465,
          secure: true,
          auth: {
              user: 'svapps.websts@gmail.com',
              pass: '2020#2020'
          }
      });
      let mailOptions = {
          from: 'svapps.websts@gmail.com', // sender address
          to: req.body.email,// list of receivers
          subject: 'New Member Registration', // Subject line
          text:'Thankyou for registering with STS', // plain text body
         html : "Hello,"+req.body.full_name+" Thankyou for register with STS<br> Please Click on the link to verify your email.<br><a href="+link+">Click here to verify</a>"  // html body
      };

      transporter.sendMail(mailOptions, (error, info) => {
          if (error) {
              return console.log(error);
          }
          console.log('Message %s sent: %s', info.messageId, info.response);
              res.render('index');
          });
    



      var member_insertid = results.insertId;
      const arr = body.childrens;
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

    body.member_id = member_insertid;
    body.registration_id = uniqueid+'S';
    createSpouseMember(body, (err, results) => {
      if (err) {
        console.log(err);
        return res.status(500).json({
          success: false,
          message: "Database connection error"
        });
      }

  rand2=Math.floor((Math.random() * 20000000000000000) + 54);
  // host=req.get('host');
  host= process.env.WEB_URL;
  links="http://"+req.get('host')+"/setpassword?token="+rand2;
  body.member_verifycode=rand2;
     let mailOptionse = {
          from: 'svapps.websts@gmail.com', // sender address
          to: req.body.s_email,// list of receivers
          subject: 'New Member Registration', // Subject line
          text:'Thankyou for registering with STS', // plain text body
          html : "Hello,"+req.body.full_name+" Thankyou for register with STS<br> Please Click on the link to verify your email.<br><a href="+links+">Click here to verify</a>"  // html body
      };

      transporter.sendMail(mailOptionse, (error, info) => {
          if (error) {
              return console.log(error);
          }
          console.log('Message %s sent: %s', info.messageId, info.response);
              res.render('index');
          });

      return res.status(200).json({
        success: true,
        data: results
      });
    });

    });

    }

  },

    MemberLogin: (req, res) => {
    const body = req.body;
    getUserByMemberEmail(body.email, (err, results) => {
      if (err) {
        console.log(err);
      }
      if (!results) {
        return res.json({
          success: 0,
          data: "Invalid email or password"
        });
      }
      const result = compareSync(body.password, results.password);
      if (result) {
        results.password = undefined;
        const jsontoken = sign({ result: results }, "qwe1234", {
          expiresIn: "1h"
        });
        return res.json({
          success: 1,
          message: "login successfully",
          token: jsontoken
        });
      } else {
        return res.json({
          success: 0,
          data: "Invalid email or password"
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
    });
  },

   TestMail: (req, res) => {
    console.log(req.decoded.result.id);
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

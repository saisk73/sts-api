const {
 createMember,
 createSpouseMember,
 createChildrens,
 getUserByMemberEmail,
 getMemberById,
 getSpouseBymemberId,
 getChildrensBymemberId
} = require("./members.service");
const { hashSync, genSaltSync, compareSync } = require("bcrypt");
const { sign } = require("jsonwebtoken");
var moment = require('moment');
var nodeMailer = require('nodemailer');
var current_date =  moment().format('YYYY-MM-DD');

module.exports = {
  createMember: (req, res) => {
    const body = req.body;
    // console.log(body);
    body.created_on = current_date;
    const salt = genSaltSync(10);
    body.password = hashSync(body.password, salt);
    if(body.membershiptype_id==1 || body.membershiptype_id==2){
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
      //   let transporter = nodeMailer.createTransport({
      //     host: 'smtp.gmail.com',
      //     port: 465,
      //     secure: true,
      //     auth: {
      //         user: 'msthsh5@gmail.com',
      //         pass: 'sathish586'
      //     }
      // });
      // let mailOptions = {
      //     from: 'msthsh5@gmail.com', // sender address
      //     to: body.email, // list of receivers
      //     subject: 'Welcome Mail', // Subject line
      //     text: 'Welcome to STS', // plain text body
      //     html: '<b>Welcome Email From STS</b>' // html body
      // };

      // transporter.sendMail(mailOptions, (error, info) => {
      //     if (error) {
      //         return console.log(error);
      //     }
      //     console.log('Message %s sent: %s', info.messageId, info.response);
      //         res.render('index');
      //     });

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

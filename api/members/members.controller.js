const {
 createMember,
 createSpouseMember,
 createChildrens
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
    createMember(body, (err, results) => {
      if (err) {
        console.log(err);
        return res.status(500).json({
          success: 0,
          message: "Database connection errror"
        });
      }
    });

    createSpouseMember(body, (err, results) => {
      if (err) {
        console.log(err);
        return res.status(500).json({
          success: 0,
          message: "Database connection errror"
        });
      }
      return res.status(200).json({
        success: 1,
        data: results
      });
    });


    // createChildrens(body, (err, results) => {
    //   if (err) {
    //     console.log(err);
    //     return res.status(500).json({
    //       success: 0,
    //       message: "Database connection errror"
    //     });
    //   }
    //   return res.status(200).json({
    //     success: 1,
    //     data: results
    //   });
    // });




    }

  },

  getMember: (req, res) => {
    const arr = [['1','cat','dog','fish'],['1','1','2','3']];
    arr.forEach(element => { 
    //    console.log(element[0]+''+element[1]+''+element[2]);
   var test= Object.assign({}, element); // {0: 'one', 1: 'two'} 

   createChildrens(test, (err, results) => {
      if (err) {
        console.log(err);
        return res.status(500).json({
          success: 0,
          message: "Database connection errror"
        });
      }
      return res.status(200).json({
        success: 1,
        data: results
      });
    });

     });
  }
  
};

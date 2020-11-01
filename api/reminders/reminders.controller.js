const {
  getTodayBirthdayMembers,
  getMemberReminderdays,
  getMembershipEndDays,
  getchildReminderdays,
  getChildEndDays,
  membershipautoapproval,
  UpdateMemberVerifyStatus
} = require("./reminders.service");
require("dotenv").config();
const ejs = require("ejs");
const path=require("path");
const { hashSync, genSaltSync, compareSync } = require("bcrypt");
const { sign } = require("jsonwebtoken");
var imageDataURI = require('image-data-uri');
var moment = require('moment');
var preciseDiff = require('moment-precise-range-plugin');
var nodeMailer = require('nodemailer');
var current_date =  moment().format('YYYY-MM-DD');
var rand,rand2,host,link,links,linkse,rand3;
var cron = require('node-cron');

cron.schedule('0 0 0 * * *', () => {  // every day midnight 12:00am
// cron.schedule('* * * * * *', () => {  // every second
  getTodayBirthdayMembers(current_date, (err, results) => {
    if (err) {
      console.log(err);
      return;
    }
    if(results){
      results.forEach(element => { 
         let transporter = nodeMailer.createTransport({
            host: 'smtpout.secureserver.net',
            port: 465,
            secure: true,
            auth: {
                user: 'contact@waytoskill.com',
                pass: 'ude82!@8ed!e13q)d1e2d!djdn'
            }
        });
      let emailTemplatems;
      ejs
      .renderFile(path.join(__dirname, "views/birthday.ejs"), {
        user_firstname: element.full_name
      })
    .then(result => {
      emailTemplatems=result;
        let mailOptions = {
            from: 'contact@waytoskill.com', // sender address
            to: element.email,// list of receivers
            subject: 'Birthday Wishes From STS', // Subject line
            text:'Wish you many more returns of the day.', // plain text body
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


        // console.log(element.full_name);
    })
    }
  });

  getMemberReminderdays((err, results1) => {
    if(results1){
      results1.forEach(element => { 
        getMembershipEndDays(element.days,(err, results2) => {
          results2.forEach(element => {
            let transporter = nodeMailer.createTransport({
              host: 'smtpout.secureserver.net',
              port: 465,
              secure: true,
              auth: {
                  user: 'contact@waytoskill.com',
                  pass: 'ude82!@8ed!e13q)d1e2d!djdn'
              }
          });
        let emailTemplatems;
        ejs
        .renderFile(path.join(__dirname, "views/reminder_membership.ejs"), {
          user_firstname: element.full_name,
          end_date: element.membership_enddate
        })
      .then(result => {
        emailTemplatems=result;
          let mailOptions = {
              from: 'contact@waytoskill.com', // sender address
              to: element.email,// list of receivers
              subject: 'Membership Renewal Reminder From STS', // Subject line
              text:'Your Membership expiry date is '+element.membership_enddate, // plain text body
             //html : "Hello,"+req.body.full_name+" Thankyou for register with STS<br> Please Click on the link to verify your email.<br><a href="+linkse+">Click here to verify</a>"  // html body
         html:emailTemplatems
          };
          transporter.sendMail(mailOptions, (error, info) => {
              if (error) {
                  return console.log(error);
              }
              console.log('Message %s sent: %s', info.messageId, info.response);
                  res.render('index');
             })
            });
          })
        })
      })
    }
  })

  getchildReminderdays((err, results3) => {
    if(results3){
      results3.forEach(element => { 
         var ttl_days = 6570 - element.days;
        getChildEndDays(ttl_days,(err, results4) => {
          results4.forEach(element => {
            let transporter = nodeMailer.createTransport({
              host: 'smtpout.secureserver.net',
              port: 465,
              secure: true,
              auth: {
                  user: 'contact@waytoskill.com',
                  pass: 'ude82!@8ed!e13q)d1e2d!djdn'
              }
          });
        let emailTemplatems;
        ejs
        .renderFile(path.join(__dirname, "views/reminder_child.ejs"), {
          user_firstname: element.full_name,
          child_name: element.child_name
        })
      .then(result => {
        emailTemplatems=result;
          let mailOptions = {
              from: 'contact@waytoskill.com', // sender address
              to: element.email,// list of receivers
              subject: 'Reminder From STS', // Subject line
              text:'Your child '+element.child_name+' age is going to complete 18 years.', // plain text body
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

          })
        })
      })
    }
  })

  
  membershipautoapproval((err, results4) => {
    if(results4){
    results4.forEach(element => {
      rand3=Math.floor((Math.random() * 30000000000000000) + 34);
      status = 1;
   UpdateMemberVerifyStatus(element.id,status,rand3, (err, results) => {
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
          host: 'smtpout.secureserver.net',
          port: 465,
          secure: true,
          auth: {
              user: 'contact@waytoskill.com',
              pass: 'ude82!@8ed!e13q)d1e2d!djdn'
          }
      });
          let emailTemplatems;
    ejs
    .renderFile(path.join(__dirname, "views/index.ejs"), {
      user_firstname: element.full_name,
      confirm_link:"http://"+host+"/setpassword?token=" + rand3
    })
  .then(result => {
    emailTemplatems=result;
      let mailOptions = {
          from: 'contact@waytoskill.com', // sender address
          to: element.email,// list of receivers
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
        });
//=======================Spouse Update End=====================================//
      })
    }
  })







});

module.exports = {
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
//     host: 'smtpout.secureserver.net',
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

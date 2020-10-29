const {
  getTodayBirthdayMembers,
  getMemberReminderdays,
  getMembershipEndDays,
  getchildReminderdays,
  getChildEndDays
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

cron.schedule('0 0 0 * * *', () => {
// cron.schedule('* * * * * *', () => {
  getTodayBirthdayMembers(current_date, (err, results) => {
    if (err) {
      console.log(err);
      return;
    }
    if(results){
      results.forEach(element => { 
         let transporter = nodeMailer.createTransport({
            host: 'smtp.gmail.com',
            port: 465,
            secure: true,
            auth: {
                user: 'notifications.atheno@gmail.com',
                pass: 'Svapps123'
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
            from: 'notifications.atheno@gmail.com', // sender address
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
              host: 'smtp.gmail.com',
              port: 465,
              secure: true,
              auth: {
                  user: 'notifications.atheno@gmail.com',
                  pass: 'Svapps123'
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
              from: 'notifications.atheno@gmail.com', // sender address
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
              host: 'smtp.gmail.com',
              port: 465,
              secure: true,
              auth: {
                  user: 'notifications.atheno@gmail.com',
                  pass: 'Svapps123'
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
              from: 'notifications.atheno@gmail.com', // sender address
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

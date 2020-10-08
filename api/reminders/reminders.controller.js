const {
  getMemberById
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
cron.schedule('* * * * *', () => {
  getMemberById(1, (err, results) => {
    if (err) {
      console.log(err);
      return;
    }
    
    if(!results){
      console.log('No Data Found');
    }

    results.password = undefined;
    console.log('Data Found');
  });
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

require("dotenv").config();
const express = require("express");
const cors = require('cors');
const nodeMailer = require('nodemailer');
var cron = require('node-cron');
// const bodyParser = require('body-parser');
var path = require('path');
const app = express();
const userRouter = require("./api/users/user.router");
const membershiptypesRouter = require("./api/membershiptypes/membershiptypes.router"); //
const membersRouter = require("./api/members/members.router"); //
const remidersRouter = require("./api/reminders/reminders.router"); //
app.use(('/uploads'), express.static(path.join(__dirname, 'uploads')));
app.use(require('cors')({ origin: '*' }));
// app.use(bodyParser({limit: '5mb'}));
app.use(express.json({limit: '50mb'}));
app.use(express.json());
app.use("/api/users", userRouter);
app.use("/api/membershiptypes", membershiptypesRouter); //
app.use("/api/members", membersRouter); //
app.use("/api/remiders", remidersRouter); //

const port = process.env.APP_PORT || 4000;
app.listen(port, () => {
  console.log("server up and running on PORT :", port);
});


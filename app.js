require("dotenv").config();
const express = require("express");
const nodeMailer = require('nodemailer');
const app = express();
const userRouter = require("./api/users/user.router");
const membershiptypesRouter = require("./api/membershiptypes/membershiptypes.router"); //
const membersRouter = require("./api/members/members.router"); //

app.use(express.json());

app.use("/api/users", userRouter);
app.use("/api/membershiptypes", membershiptypesRouter); //
app.use("/api/members", membersRouter); //

const port = process.env.PORT || 4000;
app.listen(port, () => {
  console.log("server up and running on PORT :", port);
});

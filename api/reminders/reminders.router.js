const router = require("express").Router();
const { checkToken } = require("../../auth/token_validation");
const {
  TestMail
    } = require("./reminders.controller");

router.get("/mail", TestMail);



module.exports = router;

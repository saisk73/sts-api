const router = require("express").Router();
const { checkToken } = require("../../auth/token_validation");
const {
  createMember,
  getMember
} = require("./members.controller");

router.post("/", createMember);
router.get("/", getMember);


module.exports = router;

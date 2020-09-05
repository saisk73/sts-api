const router = require("express").Router();
const { checkToken } = require("../../auth/token_validation");
const {
	getMembershipTypes
} = require("./membershiptypes.controller");

router.get("/", getMembershipTypes); 


module.exports = router;

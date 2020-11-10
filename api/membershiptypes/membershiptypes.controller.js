const {
  getMembershipTypes

} = require("./membershiptypes.service");
const { sign } = require("jsonwebtoken");

module.exports = {

    getMembershipTypes: (req, res) => {
    getMembershipTypes((err, results) => {
      if (err) {
        console.log(err);
        return;
      }
      return res.status(200).json({
        success: 1,
        data: results
      });
    });
  }



};

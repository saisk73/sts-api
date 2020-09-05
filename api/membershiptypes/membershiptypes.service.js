const pool = require("../../config/database");

module.exports = {
  getMembershipTypes: callBack => {
    pool.query(
      `select * from membershiptypes_master`,
      [],
      (error, results, fields) => {
        if (error) {
          callBack(error);
        }
        return callBack(null, results);
      }
    );
  }
};

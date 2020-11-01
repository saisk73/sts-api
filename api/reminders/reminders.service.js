const pool = require("../../config/database");

module.exports = {
  getTodayBirthdayMembers: (date, callBack) => {
    pool.query(
      `select full_name,email from members_master where DATE_FORMAT(dob, '%m-%d') = DATE_FORMAT(?, '%m-%d')`, 
      [date],
      (error, results, fields) => {
        if (error) {
          callBack(error);
        }
        return callBack(null, results);
      }
    );
  },


  getMemberReminderdays: (callBack) => {
    pool.query(
      `select * from reminders_master where reminder_type=1 or reminder_type=2`,
      [],
      (error, results, fields) => {
        if (error) {
          callBack(error);
        }
        return callBack(null, results);
      }
    );
  },

  getMembershipEndDays: (days, callBack) => {
    pool.query(
      `SELECT full_name,email,membership_enddate,datediff(membership_enddate,CURDATE()) as days FROM members_master HAVING days=?`,
      [days],
      (error, results, fields) => {
        if (error) {
          callBack(error);
        }
        return callBack(null, results[0]);
      }
    );
  },

  getchildReminderdays: (callBack) => {
    pool.query(
      `select * from reminders_master where reminder_type=3`,
      [],
      (error, results, fields) => {
        if (error) {
          callBack(error);
        }
        return callBack(null, results);
      }
    );
  },

  getChildEndDays: (ttl_days, callBack) => {
    pool.query(
      `SELECT child_name,TIMESTAMPDIFF(DAY, dob, CURDATE()) as days,(select email from where id=childrens_master.member_id) as email,(select full_name from where id=childrens_master.member_id) as full_name FROM childrens_master HAVING days=?`, 
      [ttl_days],
      (error, results, fields) => {
        if (error) {
          callBack(error);
        }
        return callBack(null, results);
      }
    );
  },

  membershipautoapproval: (callBack) => {
    pool.query(
      `SELECT * from members_master where status=0 and date(created_on) < CURDATE() - interval 7 day`, 
      [],
      (error, results, fields) => {
        if (error) {
          callBack(error);
        }
        return callBack(null, results);
      }
    );
  },

  UpdateMemberVerifyStatus: (member_id,status,member_verifycode, callBack) => {
    pool.query(
      `update members_master set status=?,member_verifycode=? where id = ?`,
      [
    status,
    member_verifycode,
    member_id
      ],
      (error, results, fields) => {
        if (error) {
          callBack(error);
        }
        return callBack(null, results);
      }
    );
  },

  UpdateSpouseVerifyStatus: (member_id,status,member_verifycode, callBack) => {
    pool.query(
      `update members_master set status=?,member_verifycode=? where member_id = ?`,
      [
    status,
    member_verifycode,
    member_id
      ],
      (error, results, fields) => {
        if (error) {
          callBack(error);
        }
        return callBack(null, results);
      }
    );
  },

  

};

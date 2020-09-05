const pool = require("../../config/database");

module.exports = {
  createMember: (data, callBack) => {
    pool.query(
      `insert into members_master(member_id, registration_id, membershiptype_id, membership_amount, nric_no, full_name,gender,dob,nationality,mobile,residential_status,email,password,street1,street2,unit_no,postal_code,habbies,introducer1,introducer2,comments,created_on) 
                values(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`,
      [
        data.member_id,
        data.registration_id,
        data.membershiptype_id,
        data.membership_amount,
        data.nric_no,
        data.full_name,
        data.gender,
        data.dob,
        data.nationality,
        data.mobile,
        data.residential_status,
        data.email,
        data.password,
        data.street1,
        data.street2,
        data.unit_no,
        data.postal_code,
        data.habbies,
        data.introducer1,
        data.introducer2,
        data.comments,
        data.created_on
      ],
      (error, results, fields) => {
        if (error) {
          callBack(error);
        }
        return callBack(null, results);
      }
    );
  },

    createSpouseMember: (data, callBack) => {
    pool.query(
      `insert into members_master(member_id, registration_id, membershiptype_id, membership_amount, nric_no, full_name,gender,dob,nationality,mobile,residential_status,email,password,street1,street2,unit_no,postal_code,habbies,introducer1,introducer2,comments,created_on) 
                values(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`,
      [
        data.member_id,
        data.registration_id,
        data.membershiptype_id,
        data.membership_amount,
        data.s_nric_no,
        data.s_full_name,
        data.s_gender,
        data.s_dob,
        data.s_nationality,
        data.s_mobile,
        data.s_residential_status,
        data.s_email,
        data.password,
        data.street1,
        data.street2,
        data.unit_no,
        data.postal_code,
        data.habbies,
        data.introducer1,
        data.introducer2,
        data.comments,
        data.created_on
      ],
      (error, results, fields) => {
        if (error) {
          callBack(error);
        }
        return callBack(null, results);
      }
    );
  },

 createChildrens: (data, callBack) => {
    pool.query(
      `insert into childrens_master(member_id, child_name, dob, gender) 
                values(?,?,?,?)`,
      [
        data.member_id,
        data.child_name,
        data.child_dob,
        data.child_gender
      ],
      (error, results, fields) => {
        if (error) {
          callBack(error);
        }
        return callBack(null, results);
      }
    );
  },

  getUserByMemberEmail: (email, callBack) => {
    pool.query(
      `select * from members_master where email = ?`,
      [email],
      (error, results, fields) => {
        if (error) {
          callBack(error);
        }
        return callBack(null, results[0]);
      }
    );
  },


  getMemberById: (id, callBack) => {
    pool.query(
      `select * from members_master where id = ?`,
      [id],
      (error, results, fields) => {
        if (error) {
          callBack(error);
        }
        return callBack(null, results[0]);
      }
    );
  },

};
const pool = require("../../config/database");

module.exports = {
  createMember: (data, callBack) => {
    pool.query(
      `insert into members_master(member_id, registration_id, membershiptype_id, membership_amount, nric_no, full_name,gender,dob,nationality,mobile,residential_status,email,password,street1,street2,unit_no,postal_code,habbies,introducer1,introducer2,comments,created_on,member_type,membership_type,membership_enddate) 
                values(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`,
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
        data.created_on,
        data.member_type,
        data.membership_type,
        data.membership_enddate
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
      `insert into members_master(member_id, registration_id, membershiptype_id, membership_amount, nric_no, full_name,gender,dob,nationality,mobile,residential_status,email,password,street1,street2,unit_no,postal_code,habbies,introducer1,introducer2,comments,member_verifycode,created_on,member_type,membership_type,membership_enddate) 
                values(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`,
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
        data.member_verifycode,
        data.created_on,
        data.member_type,
        data.membership_type,
        data.membership_enddate
      ],
      (error, results, fields) => {
        if (error) {
          callBack(error);
        }
        return callBack(null, results);
      }
    );
  },
     AddMemberOtp: (data, callBack) => {
    pool.query(
      `insert into  membersverify_otp(member_email,member_verifyotp,created_on) 
                values(?,?,?)`,
      [
        data.email,
        data.member_verifyotp,
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

  getSpouseBymemberId: (id, callBack) => {
    pool.query(
      `select * from members_master where member_id = ?`,
      [id],
      (error, results, fields) => {
        if (error) {
          callBack(error);
        }
        return callBack(null, results[0]);
      }
    );
  },

  getChildrensBymemberId: (id, callBack) => {
    pool.query(
      `select id,member_id,child_name,dob as child_dob,gender as child_gender from childrens_master where member_id = ?`,
      [id],
      (error, results, fields) => {
        if (error) {
          callBack(error);
        }
        return callBack(null, results);
      }
    );
  },

  updateUsers: (data, callBack) => {
    pool.query(
      `update members_master set password=?,question1=?,question2=?,question3=?,answer1=?,answer2=?,answer3=?,member_verifycode='' where member_verifycode = ?`,
      [
    data.password,
    data.question1,
    data.question2,
    data.question3,
    data.answer1,
    data.answer2,
    data.answer3,
    data.member_verifycode
        
      ],
      (error, results, fields) => {
        if (error) {
          callBack(error);
        }
        return callBack(null, results);
      }
    );
  },

  changepasswordBymemberId: (data, callBack) => {
    pool.query(
      `update members_master set password=? where id = ?`,
      [
    data.new_password,
    data.id   
      ],
      (error, results, fields) => {
        if (error) {
          callBack(error);
        }
        return callBack(null, results);
      }
    );
  },

  updateUsersVerification: (data, callBack) => {
     console.log(data);
    pool.query(
      `update members_master set member_verifycode=? where email = ?`,
      [
    data.member_verifycode,
  data.email
        
      ],
      (error, results, fields) => {
        if (error) {
          callBack(error);
        }
        return callBack(null, results);
      }
    );
  },

    Updatepassworddetails: (data, callBack) => {
     console.log(data);
    pool.query(
      `update members_master set password=?,member_verifycode='' where member_verifycode = ?`,
      [
    data.password,
    
    data.member_verifycode
        
      ],
      (error, results, fields) => {
        if (error) {
          callBack(error);
        }
        return callBack(null, results);
      }
    );
  },
    deleteOtp: (data, callBack) => {
     console.log(data);
    pool.query(
      `delete from  membersverify_otp  where member_verifyotpid = ?`,
      [
    data.member_verifyotpid  
      ],
      (error, results, fields) => {
        if (error) {
          callBack(error);
        }
        return callBack(null, results);
      }
    );
  },

  getUserBymembermerificationid: (member_verifycode, callBack) => {
    pool.query(
      `select * from members_master where member_verifycode = ?`,
      [member_verifycode],
      (error, results, fields) => {
        if (error) {
          callBack(error);
        }
        return callBack(null, results[0]);
      }
    );
  },
    getMemberotpverification: (member_verifyotp,member_email,callBack) => {
  
    pool.query(
  
      `select * from  membersverify_otp where member_verifyotp=? and member_email=?`,
      [member_verifyotp,member_email],
      (error, results, fields) => {
        if (error) {
          callBack(error);
        }
        return callBack(null, results[0]);
      }
    );
  },

  UpdateSpouse: (data, callBack) => {
    pool.query(
      `update members_master set nric_no=?,full_name=?,dob=?,mobile=?,nationality=?,residential_status=?,gender=?,email=? where id = ?`,
      [
    data.s_nric_no,
    data.s_full_name,
    data.s_dob,
    data.s_mobile,
    data.s_nationality,
    data.s_residential_status,
    data.s_gender,
    data.s_email,
    data.id  
      ],
      (error, results, fields) => {
        if (error) {
          callBack(error);
        }
        return callBack(null, results);
      }
    );
  },

  UpdateChildrens: (data, callBack) => {
    pool.query(
      `update childrens_master set child_name=?,dob=? where id = ?`,
      [
        data.child_name,
        data.child_dob,
        data.id  
      ],
      (error, results, fields) => {
        if (error) {
          callBack(error);
        }
        return callBack(null, results);
      }
    );
  },

  UpdateMemberShipByMember: (data, callBack) => {
    pool.query(
      `update members_master set membershiptype_id=?, membership_amount=?, nric_no=?, full_name=?,dob=?,nationality=?,mobile=?,residential_status=?,street1=?,street2=?,unit_no=?,postal_code=?,habbies=?,membership_type=?,membership_enddate=? where id = ?`,
      [
    data.membershiptype_id,
    data.membership_amount,
    data.nric_no,
    data.full_name,
    data.dob,
    data.nationality,
    data.mobile,
    data.residential_status,
    data.street1,
    data.street2,
    data.unit_no,
    data.postal_code,
    data.habbies,
    data.membership_type,
    data.membership_enddate,
    data.id
      ],
      (error, results, fields) => {
        if (error) {
          callBack(error);
        }
        return callBack(null, results);
      }
    );
  },

  UpdateMemberByMemberId: (data, callBack) => {
    pool.query(
      `update members_master set nric_no=?, full_name=?,dob=?,nationality=?,mobile=?,residential_status=?,street1=?,street2=?,unit_no=?,postal_code=?,habbies=? where id = ?`,
      [
    data.nric_no,
    data.full_name,
    data.dob,
    data.nationality,
    data.mobile,
    data.residential_status,
    data.street1,
    data.street2,
    data.unit_no,
    data.postal_code,
    data.habbies,
    data.id
      ],
      (error, results, fields) => {
        if (error) {
          callBack(error);
        }
        return callBack(null, results);
      }
    );
  },

  UpdateSpouseBySpouseId: (data, callBack) => {
    pool.query(
      `update members_master set nric_no=?, full_name=?,dob=?,nationality=?,mobile=?,residential_status=?,street1=?,street2=?,unit_no=?,postal_code=?,habbies=? where id = ?`,
      [
    data.nric_no,
    data.full_name,
    data.dob,
    data.nationality,
    data.mobile,
    data.residential_status,
    data.street1,
    data.street2,
    data.unit_no,
    data.postal_code,
    data.habbies,
    data.id
      ],
      (error, results, fields) => {
        if (error) {
          callBack(error);
        }
        return callBack(null, results);
      }
    );
  },

  UpdateMemberShip_spouse: (data, callBack) => {
    pool.query(
      `update members_master set membershiptype_id=?, membership_amount=?, street1=?,street2=?,unit_no=?,postal_code=?,habbies=?,membership_type=?,membership_enddate=?,member_status=? where member_id = ?`,
      [
    data.membershiptype_id,
    data.membership_amount,
    data.street1,
    data.street2,
    data.unit_no,
    data.postal_code,
    data.habbies,
    data.membership_type,
    data.membership_enddate,
    data.member_status,
    data.id
      ],
      (error, results, fields) => {
        if (error) {
          callBack(error);
        }
        return callBack(null, results);
      }
    );
  },

  UpdateMemberShip_SpouseInactive: (data, callBack) => {
    pool.query(
      `update members_master set member_status=? where member_id = ?`,
      [
    data.member_status,
    data.id
      ],
      (error, results, fields) => {
        if (error) {
          callBack(error);
        }
        return callBack(null, results);
      }
    );
  },

  UpdateMemberShip_ChildrensInactive: (data, callBack) => {
    pool.query(
      `update childrens_master set status=? where member_id = ?`,
      [
    data.status,
    data.id
      ],
      (error, results, fields) => {
        if (error) {
          callBack(error);
        }
        return callBack(null, results);
      }
    );
  },

  UpdateMemberShipBySpouse: (data, callBack) => {
    pool.query(
      `update members_master set membershiptype_id=?, membership_amount=?, nric_no=?, full_name=?,dob=?,nationality=?,mobile=?,residential_status=?,street1=?,street2=?,unit_no=?,postal_code=?,habbies=?,membership_type=?,membership_enddate=? where id = ?`,
      [
    data.membershiptype_id,
    data.membership_amount,
    data.nric_no,
    data.full_name,
    data.dob,
    data.nationality,
    data.mobile,
    data.residential_status,
    data.street1,
    data.street2,
    data.unit_no,
    data.postal_code,
    data.habbies,
    data.membership_type,
    data.membership_enddate,
    data.id
      ],
      (error, results, fields) => {
        if (error) {
          callBack(error);
        }
        return callBack(null, results);
      }
    );
  },

  UpdateMemberShip_Member: (data, callBack) => {
    pool.query(
      `update members_master set membershiptype_id=?, membership_amount=?, street1=?,street2=?,unit_no=?,postal_code=?,habbies=?,membership_type=?,membership_enddate=?,member_status=? where id = ?`,
      [
    data.membershiptype_id,
    data.membership_amount,
    data.street1,
    data.street2,
    data.unit_no,
    data.postal_code,
    data.habbies,
    data.membership_type,
    data.membership_enddate,
    data.member_status,
    data.member_id
      ],
      (error, results, fields) => {
        if (error) {
          callBack(error);
        }
        return callBack(null, results);
      }
    );
  },

  createMemberShipHistory: (data, callBack) => {
    pool.query(
      `insert into memberships_history_master(member_id, membershiptype_id, membership_amount,created_on) 
                values(?,?,?,?)`,
      [
        data.id,
        data.membershiptype_id,
        data.membership_amount,
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

  UpdateLoginOtp: (data, callBack) => {
    pool.query(
      `update members_master set login_otp=? where id = ?`,
      [
    data.login_otp,
    data.id  
      ],
      (error, results, fields) => {
        if (error) {
          callBack(error);
        }
        return callBack(null, results);
      }
    );
  },

  getAdminByMemberEmail: (email, callBack) => {
    pool.query(
      `select * from members_master where role_id!=0 and email = ?`,
      [email],
      (error, results, fields) => {
        if (error) {
          callBack(error);
        }
        return callBack(null, results[0]);
      }
    );
  },

  getMembersList:(callBack) => {
    pool.query(
      `select * from members_master where status=0 and member_id=''`,
      [],
      (error, results, fields) => {
        if (error) {
          callBack(error);
        }
        return callBack(null, results);
      }
    );
  },

  getMemberDetails:(id, callBack) => {
    pool.query(
      `select * from members_master where id=?`,
      [id],
      (error, results, fields) => {
        if (error) {
          callBack(error);
        }
        return callBack(null, results[0]);
      }
    );
  },

  UpdateMemberVerifyStatus: (data, callBack) => {
    pool.query(
      `update members_master set member_verifycode=?,status=? where id = ?`,
      [
    data.member_verifycode,
    data.status,
    data.id
      ],
      (error, results, fields) => {
        if (error) {
          callBack(error);
        }
        return callBack(null, results);
      }
    );
  },

  UpdateSpouseVerifyStatus: (data, callBack) => {
    pool.query(
      `update members_master set member_verifycode=?,status=? where member_id = ?`,
      [
    data.member_verifycode,
    data.status,
    data.id
      ],
      (error, results, fields) => {
        if (error) {
          callBack(error);
        }
        return callBack(null, results);
      }
    );
  },

  createMemberLoginHistory: (data, callBack) => {
    pool.query(
      `insert into memberslogins_master(member_id) 
                values(?)`,
      [
        data.id
      ],
      (error, results, fields) => {
        if (error) {
          callBack(error);
        }
        return callBack(null, results);
      }
    );
  },

  
  MemberShipRenewalByMember: (data, callBack) => {
    pool.query(
      `update members_master set membership_enddate=? where id = ?`,
      [
    data.membership_enddate,
    data.member_id
      ],
      (error, results, fields) => {
        if (error) {
          callBack(error);
        }
        return callBack(null, results);
      }
    );
  },

  MemberShipRenewalBySpouse: (data, callBack) => {
    pool.query(
      `update members_master set membership_enddate=? where id = ?`,
      [
    data.membership_enddate,
    data.spouse_id
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

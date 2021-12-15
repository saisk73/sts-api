const pool = require("../../config/database");

module.exports = {
  createMember: (data, callBack) => {
    pool.query(
      `insert into members_master(serial_no,member_id, registration_id, membershiptype_id, membership_amount, nric_no, full_name,gender,dob,nationality,mobile,residential_status,email,street1,street2,unit_no,postal_code,habbies,reference_by,introducer1,introducer1_mobile,introducer2,introducer2_mobile,comments,created_on,member_type,membership_type,membership_enddate) 
                values(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`,
      [
        data.serial_no,
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
        data.street1,
        data.street2,
        data.unit_no,
        data.postal_code,
        data.habbies,
        data.reference,
        data.introducer1,
        data.introducerNumber1,
        data.introducer2,
        data.introducerNumber2,
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

  createMemberByExcel: (serial_no,member_id,registration_id,membershiptype_id,membership_amount,nric_no,full_name,gender,dob,nationality,mobile,residential_status,email,street1,street2,unit_no,postal_code,habbies,reference,introducer1,introducerNumber1,introducer2,introducerNumber2,comments,created_on,member_type,membership_type,membership_enddate, callBack) => {
    pool.query(
      `insert into members_master(serial_no,member_id, registration_id, membershiptype_id, membership_amount, nric_no, full_name,gender,dob,nationality,mobile,residential_status,email,street1,street2,unit_no,postal_code,habbies,reference_by,introducer1,introducer1_mobile,introducer2,introducer2_mobile,comments,created_on,member_type,membership_type,membership_enddate) 
                values(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`,
      [
        serial_no,member_id,registration_id,membershiptype_id,membership_amount,nric_no,full_name,gender,dob,nationality,mobile,residential_status,email,street1,street2,unit_no,postal_code,habbies,reference,introducer1,introducerNumber1,introducer2,introducerNumber2,comments,created_on,member_type,membership_type,membership_enddate
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
      `insert into members_master(serial_no,member_id, registration_id, membershiptype_id, membership_amount, nric_no, full_name,gender,dob,nationality,mobile,residential_status,email,street1,street2,unit_no,postal_code,habbies,reference_by,introducer1,introducer1_mobile,introducer2,introducer2_mobile,comments,member_verifycode,created_on,member_type,membership_type,membership_enddate) 
                values(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`,
      [
        data.serial_no,
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
        data.street1,
        data.street2,
        data.unit_no,
        data.postal_code,
        data.habbies,
        data.reference,
        data.introducer1,
        data.introducerNumber1,
        data.introducer2,
        data.introducerNumber2,
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

  createSpouseMemberByExcel: (serial_no,member_id,registration_id,membershiptype_id,membership_amount,s_nric_no,s_full_name,s_gender,s_dob,s_nationality,s_mobile,s_residential_status,s_email,street1,street2,unit_no,postal_code,habbies,reference,introducer1,introducerNumber1,introducer2,introducerNumber2,comments,member_verifycode,created_on,member_type,membership_type,membership_enddate, callBack) => {
    pool.query(
      `insert into members_master(serial_no,member_id, registration_id, membershiptype_id, membership_amount, nric_no, full_name,gender,dob,nationality,mobile,residential_status,email,street1,street2,unit_no,postal_code,habbies,reference_by,introducer1,introducer1_mobile,introducer2,introducer2_mobile,comments,member_verifycode,created_on,member_type,membership_type,membership_enddate) 
                values(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`,
      [
        serial_no,member_id,registration_id,membershiptype_id,membership_amount,s_nric_no,s_full_name,s_gender,s_dob,s_nationality,s_mobile,s_residential_status,s_email,street1,street2,unit_no,postal_code,habbies,reference,introducer1,introducerNumber1,introducer2,introducerNumber2,comments,member_verifycode,created_on,member_type,membership_type,membership_enddate
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
      `insert into membersverify_otp(member_email,member_verifyotp,otp_expiry_time,created_on) 
                values(?,?,?,?)`,
      [
        data.email,
        data.member_verifyotp,
        data.otpexpiry_datetime,
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

  createChildrensByExcel: (member_id,child_name,child_dob,child_gender, callBack) => {
    pool.query(
      `insert into childrens_master(member_id, child_name, dob, gender) 
                values(?,?,?,?)`,
      [
        member_id,child_name,child_dob,child_gender
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
      `select * from members_master where member_status=0 and status=1 and email = ?`,
      [email],
      (error, results, fields) => {
        if (error) {
          callBack(error);
        }
        return callBack(null, results[0]);
      }
    );
  },

  getLastLerialNumber: (year, callBack) => {
    pool.query(
      `select serial_no from members_master where year(created_on) = ? order by serial_no desc limit 1`,
      [year],
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

  changeemailidBymemberId: (data, callBack) => {
    pool.query(
      `update members_master set email=? where id = ?`,
      [
    data.newemail,
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
    //  console.log(data);
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

  DeleteEventFields: (event_id, callBack) => {
    pool.query(
      `delete from  events_fields_master  where event_id = ?`,
      [event_id],
      (error, results, fields) => {
        if (error) {
          callBack(error);
        }
        return callBack(null, results);
      }
    );
  },

  deleteOldMemberOtp: (email, callBack) => {
   pool.query(
     `delete from  membersverify_otp  where member_email = ?`,
     [email],
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

  VerifyMemberShip: (email,nric,callBack) => {
    pool.query(
      `select * from  members_master where email=? and nric_no=?`,
      [email,nric],
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
      `update members_master set membershiptype_id=?, membership_amount=?,membership_type=?,membership_enddate=? where id = ?`,
      [
    data.membershiptype_id,
    data.membership_amount,
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
      `update members_master set nric_no=?, full_name=?,gender=?,dob=?,nationality=?,mobile=?,residential_status=?,street1=?,street2=?,unit_no=?,postal_code=?,habbies=? where id = ?`,
      [
    data.nric_no,
    data.full_name,
    data.gender,
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
      `update members_master set nric_no=?, full_name=?,gender=?,dob=?,nationality=?,mobile=?,residential_status=?,street1=?,street2=?,unit_no=?,postal_code=?,habbies=? where id = ?`,
      [
    data.nric_no,
    data.full_name,
    data.gender,
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
      `update members_master set membershiptype_id=?, membership_amount=?, membership_type=?,membership_enddate=?,member_status=? where member_id = ?`,
      [
    data.membershiptype_id,
    data.membership_amount,
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
  UpdateMemberShipByTreasurer: (data, callBack) => {
    pool.query(
      `update members_master set membershiptype_id=?, membership_amount=?, membership_enddate=? where id = ?`,
      [
    data.membershiptype_id,
    data.membership_amount,
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

  UpdateSpouseMemberShipByTreasurer: (data, callBack) => {
    pool.query(
      `update members_master set membershiptype_id=?, membership_amount=?, membership_enddate=? where member_id = ?`,
      [
    data.membershiptype_id,
    data.membership_amount,
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
      `insert into memberships_history_master(member_id, membershiptype_id, membership_amount,transaction_id,payment_type,message,created_on) 
                values(?,?,?,?,?,?,?)`,
      [
        data.id,
        data.membershiptype_id,
        data.membership_amount,
        data.transaction_id,
        data.payment_type,
        data.message,
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

  createMemberShipHistory1: (data, callBack) => { 
    pool.query(
      `insert into memberships_history_master(member_id, membershiptype_id, membership_amount,transaction_id,payment_type,payment_mode,message,created_on) 
                values(?,?,?,?,?,?,?)`,
      [
        data.id,
        data.membershiptype_id,
        data.membership_amount,
        data.transaction_id,
        data.payment_type,
        data.payment_mode,
        data.message,
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
      `update members_master set login_otp=?,otp_expiry_time=? where id = ?`,
      [
    data.login_otp,
    data.otpexpiry_datetime,
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

  UpdateAdminLoginOtp: (data, callBack) => {
    pool.query(
      `update admins_master set login_otp=?,otp_expiry_time=? where id = ?`,
      [
    data.login_otp,
    data.otpexpiry_datetime,
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
      `select * from admins_master where role_id!=0 and username = ?`,
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
      `select * from members_master where status=0`,
      [],
      (error, results, fields) => {
        if (error) {
          callBack(error);
        }
        return callBack(null, results);
      }
    );
  },

  MemberShipHistory:(member_id,callBack) => {
    pool.query(
      `select * from memberships_history_master where member_id=? order by id DESC`,
      [member_id],
      (error, results, fields) => {
        if (error) {
          callBack(error);
        }
        return callBack(null, results);
      }
    );
  },

  getVerifiedMembersList:(callBack) => {
    pool.query(
      `select * from members_master where status=1 and member_id=''`,
      [],
      (error, results, fields) => {
        if (error) {
          callBack(error);
        }
        return callBack(null, results);
      }
    );
  },

  getRejectedMembersList:(callBack) => {
    pool.query(
      `select * from members_master where status=2 and member_id=''`,
      [],
      (error, results, fields) => {
        if (error) {
          callBack(error);
        }
        return callBack(null, results);
      }
    );
  },

  getTerminatedMembersList:(callBack) => {
    pool.query(
      `select * from members_master where status=3 and member_id=''`,
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
      `select *,(select membership_name from membershiptypes_master where id=members_master.membershiptype_id) as membership_name from members_master where id=?`,
      [id],
      (error, results, fields) => {
        if (error) {
          callBack(error);
        }
        return callBack(null, results[0]);
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

  UpdateMemberVerify_Status: (member_id,status, callBack) => {
    pool.query(
      `update members_master set status=? where id = ?`,
      [
    status,
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

  createAdminLoginHistory: (data, callBack) => {
    pool.query(
      `insert into adminlogins_master(admin_id) 
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

  UpdateMemberShipDetails: (data, callBack) => {
    pool.query(
      `update members_master set membershiptype_id=?,membership_amount=?,membership_enddate=? where id = ?`,
      [
    data.membershiptype_id,
    data.membership_amount,
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

  InactiveSpouseMemberShip: (data, callBack) => {
    pool.query(
      `update members_master set membership_enddate=?,member_status=? where id = ?`,
      [
    data.membership_enddate,
    data.member_status,
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

  InactiveMemberShip: (data, callBack) => {
    pool.query(
      `update members_master set membership_enddate=?,member_status=? where id = ?`,
      [
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

  
  UploadProfileImage: (id,profile_image, callBack) => {
    pool.query(
      `update members_master set profile_image=? where id = ?`,
      [
    profile_image,
    id
      ],
      (error, results, fields) => {
        if (error) {
          callBack(error);
        }
        return callBack(null, results);
      }
    );
  },

  Createsliders: (data, callBack) => {
    console.log(data);
    pool.query(
      `insert into sliders_master(image) 
                values(?)`,
      [
        data.image_name
      ],
      (error, results, fields) => {
        if (error) {
          callBack(error);
        }
        return callBack(null, results);
      }
    );
  },

  getSliders:(callBack) => {
    pool.query(
      `select * from sliders_master`,
      [],
      (error, results, fields) => {
        if (error) {
          callBack(error);
        }
        return callBack(null, results);
      }
    );
  },
  DeleteSlider: (id, callBack) => {
    pool.query(
      `delete from sliders_master where id = ?`,
      [id],
      (error, results, fields) => {
        if (error) {
          callBack(error);
        }
        return callBack(null, results[0]);
      }
    );
  },

  DeleteChild: (id, callBack) => {
    pool.query(
      `delete from childrens_master where id = ?`,
      [id],
      (error, results, fields) => {
        if (error) {
          callBack(error);
        }
        return callBack(null, results[0]);
      }
    );
  },


  CreateSponsor: (data, callBack) => {
    console.log(data);
    pool.query(
      `insert into sponsors_master(image) 
                values(?)`,
      [
        data.image_name
      ],
      (error, results, fields) => {
        if (error) {
          callBack(error);
        }
        return callBack(null, results);
      }
    );
  },

  getSponsor:(callBack) => {
    pool.query(
      `select * from sponsors_master`,
      [],
      (error, results, fields) => {
        if (error) {
          callBack(error);
        }
        return callBack(null, results);
      }
    );
  },
  DeleteSponsor: (id, callBack) => {
    pool.query(
      `delete from sponsors_master where id = ?`,
      [id],
      (error, results, fields) => {
        if (error) {
          callBack(error);
        }
        return callBack(null, results[0]);
      }
    );
  },

  CreateMedia: (data, callBack) => {
    // console.log(data);
    pool.query(
      `insert into media_master(image) 
                values(?)`,
      [
        data.image_name
      ],
      (error, results, fields) => {
        if (error) {
          callBack(error);
        }
        return callBack(null, results);
      }
    );
  },

  getMedia:(callBack) => {
    pool.query(
      `select * from media_master`,
      [],
      (error, results, fields) => {
        if (error) {
          callBack(error);
        }
        return callBack(null, results);
      }
    );
  },
  DeleteMedia: (id, callBack) => {
    pool.query(
      `delete from media_master where id = ?`,
      [id],
      (error, results, fields) => {
        if (error) {
          callBack(error);
        }
        return callBack(null, results[0]);
      }
    );
  },

  CreateAboutus: (data, callBack) => {
    // console.log(data);
    pool.query(
      `insert into aboutus_master(welcome_description,about) 
                values(?,?)`,
      [
        data.welcome_description,
        data.aboutus
      ],
      (error, results, fields) => {
        if (error) {
          callBack(error);
        }
        return callBack(null, results);
      }
    );
  },

  CreateIntroduction: (data, callBack) => {
    // console.log(data);
    pool.query(
      `insert into aboutus_master(welcome_description) 
                values(?)`,
      [
        data.welcome_description
      ],
      (error, results, fields) => {
        if (error) {
          callBack(error);
        }
        return callBack(null, results);
      }
    );
  },

  getAboutUs:(callBack) => {
    pool.query(
      `select * from aboutus_master`,
      [],
      (error, results, fields) => {
        if (error) {
          callBack(error);
        }
        return callBack(null, results[0]);
      }
    );
  },

  UpdateAboutus: (data, callBack) => {
    // console.log(data);
    pool.query(
      `update aboutus_master set about=? where id = ?`,
      [
        data.aboutus,
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

  CreateInvoiceConfig: (data, callBack) => {
    // console.log(data);
    pool.query(
      `insert into config_master(invoice_address,invoice_mobile,invoice_message) 
                values(?,?,?)`,
      [
        data.invoice_address,
        data.invoice_mobile,
        data.invoice_message
      ],
      (error, results, fields) => {
        if (error) {
          callBack(error);
        }
        return callBack(null, results);
      }
    );
  },

  getInvoiceConfig:(callBack) => {
    pool.query(
      `select invoice_address,invoice_mobile,invoice_message from config_master`,
      [],
      (error, results, fields) => {
        if (error) {
          callBack(error);
        }
        return callBack(null, results[0]);
      }
    );
  },

  UpdateInvoiceConfig: (data, callBack) => {
    // console.log(data);
    pool.query(
      `update config_master set invoice_address=?,invoice_mobile=?,invoice_message=? where id = ?`,
      [
        data.invoice_address,
        data.invoice_mobile,
        data.invoice_message,
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

  CreateEmailSmtp: (data, callBack) => {
    // console.log(data);
    pool.query(
      `insert into config_master(mail_email,mail_pass,mail_smtp,otpmail_email,otpmail_pass,otpmail_smtp) 
                values(?,?,?,?,?,?)`,
      [
        data.mail_email,
        data.mail_pass,
        data.mail_smtp,
        data.otpmail_email,
        data.otpmail_pass,
        data.otpmail_smtp
      ],
      (error, results, fields) => {
        if (error) {
          callBack(error);
        }
        return callBack(null, results);
      }
    );
  },

  getEmailSmtp:(callBack) => {
    pool.query(
      `select mail_email,mail_pass,mail_smtp,otpmail_email,otpmail_pass,otpmail_smtp from config_master`,
      [],
      (error, results, fields) => {
        if (error) {
          callBack(error);
        }
        return callBack(null, results[0]);
      }
    );
  },

  UpdateEmailSmtp: (data, callBack) => {
    // console.log(data);
    pool.query(
      `update config_master set mail_email=?,mail_pass=?,mail_smtp=?,otpmail_email=?,otpmail_pass=?,otpmail_smtp=? where id = ?`,
      [
        data.mail_email,
        data.mail_pass,
        data.mail_smtp,
        data.otpmail_email,
        data.otpmail_pass,
        data.otpmail_smtp,
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

  CreateGateWayStatus: (data, callBack) => {
    // console.log(data);
    pool.query(
      `insert into config_master(gateway_status) 
                values(?)`,
      [
        data.gateway_status
      ],
      (error, results, fields) => {
        if (error) {
          callBack(error);
        }
        return callBack(null, results);
      }
    );
  },

  getGateWayStatus:(callBack) => {
    pool.query(
      `select gateway_status from config_master`,
      [],
      (error, results, fields) => {
        if (error) {
          callBack(error);
        }
        return callBack(null, results[0]);
      }
    );
  },

  UpdateGateWayStatus: (data, callBack) => {
    // console.log(data);
    pool.query(
      `update config_master set gateway_status=? where id = ?`,
      [
        data.gateway_status,
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

  CreateEmailTemplate: (data, callBack) => {
    // console.log(data);
    pool.query(
      `insert into emailtemplates_master(template_name,template) 
                values(?,?)`,
      [
        data.template_name,
        data.template
      ],
      (error, results, fields) => {
        if (error) {
          callBack(error);
        }
        return callBack(null, results);
      }
    );
  },

  getEmailTemplate:(callBack) => {
    pool.query(
      `select * from emailtemplates_master`,
      [],
      (error, results, fields) => {
        if (error) {
          callBack(error);
        }
        return callBack(null, results);
      }
    );
  },

  getEmailTemplatecheck:(template_name,callBack) => {
    pool.query(
      `select * from emailtemplates_master where template_name=?`,
      [template_name],
      (error, results, fields) => {
        if (error) {
          callBack(error);
        }
        return callBack(null, results[0]);
      }
    );
  },

  UpdateEmailTemplate: (data, callBack) => {
    // console.log(data);
    pool.query(
      `update emailtemplates_master set template_name=?, template=? where id = ?`,
      [
        data.template_name,
        data.template,
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

  UpdateIntroduction: (data, callBack) => {
    // console.log(data);
    pool.query(
      `update aboutus_master set welcome_description=? where id = ?`,
      [
        data.welcome_description,
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

  CreateNewsLetter: (data, callBack) => {
    // console.log(data);
    pool.query(
      `insert into newsletters_master(title,image,description) 
                values(?,?,?)`,
      [
        data.title,
        data.image_name,
        data.description
      ],
      (error, results, fields) => {
        if (error) {
          callBack(error);
        }
        return callBack(null, results);
      }
    );
  },

  UpdateNewsLetterwithimage: (data, callBack) => {
    // console.log(data);
    pool.query(
      `update newsletters_master set title=?,image=?,description=? where id=?`,
      [
        data.title,
        data.image_name,
        data.description,
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

  UpdateNewsLetter: (data, callBack) => {
    // console.log(data);
    pool.query(
      `update newsletters_master set title=?,description=? where id=?`,
      [
        data.title,
        data.description,
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

  getNewsLetter:(callBack) => {
    pool.query(
      `select * from newsletters_master`,
      [],
      (error, results, fields) => {
        if (error) {
          callBack(error);
        }
        return callBack(null, results);
      }
    );
  },

  getNewsLetterById:(id, callBack) => {
    pool.query(
      `select * from newsletters_master where id=?`,
      [id],
      (error, results, fields) => {
        if (error) {
          callBack(error);
        }
        return callBack(null, results);
      }
    );
  },

  DeleteNewsLetter: (id, callBack) => {
    pool.query(
      `delete from newsletters_master where id = ?`,
      [id],
      (error, results, fields) => {
        if (error) {
          callBack(error);
        }
        return callBack(null, results[0]);
      }
    );
  },

  CreateForum: (data, callBack) => {
    // console.log(data);
    pool.query(
      `insert into forums_master(title,image,description) 
                values(?,?,?)`,
      [
        data.title,
        data.image_name,
        data.description
      ],
      (error, results, fields) => {
        if (error) {
          callBack(error);
        }
        return callBack(null, results);
      }
    );
  },

  UpdateForumwithimg: (data, callBack) => {
    // console.log(data);
    pool.query(
      `update forums_master set title=?,image=?,description=? where id=?`,
      [
        data.title,
        data.image_name,
        data.description,
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

  UpdateForum: (data, callBack) => {
    // console.log(data);
    pool.query(
      `update forums_master set title=?,description=? where id=?`,
      [
        data.title,
        data.description,
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

  getForums:(callBack) => {
    pool.query(
      `select * from forums_master`,
      [],
      (error, results, fields) => {
        if (error) {
          callBack(error);
        }
        return callBack(null, results);
      }
    );
  },

  getForumsById:(id,callBack) => {
    pool.query(
      `select * from forums_master where id=?`,
      [id],
      (error, results, fields) => {
        if (error) {
          callBack(error);
        }
        return callBack(null, results);
      }
    );
  },

  DeleteForums: (id, callBack) => {
    pool.query(
      `delete from forums_master where id = ?`,
      [id],
      (error, results, fields) => {
        if (error) {
          callBack(error);
        }
        return callBack(null, results[0]);
      }
    );
  },

  CreateVolunteerDescription: (data, callBack) => {
    // console.log(data);
    pool.query(
      `insert into volunteercontent_master(description) 
                values(?)`,
      [
        data.description
      ],
      (error, results, fields) => {
        if (error) {
          callBack(error);
        }
        return callBack(null, results);
      }
    );
  },

  CreateVolunteerImage: (data, callBack) => {
    // console.log(data);
    pool.query(
      `insert into volunteercontent_master(image) 
                values(?)`,
      [
        data.image_name
      ],
      (error, results, fields) => {
        if (error) {
          callBack(error);
        }
        return callBack(null, results);
      }
    );
  },

  getVolunteer:(callBack) => {
    pool.query(
      `select * from volunteercontent_master`,
      [],
      (error, results, fields) => {
        if (error) {
          callBack(error);
        }
        return callBack(null, results[0]);
      }
    );
  },

  UpdateVolunteerImage: (data, callBack) => {
    // console.log(data);
    pool.query(
      `update volunteercontent_master set image=? where id = ?`,
      [
        data.image_name,
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

  UpdateVolunteerDescription: (data, callBack) => {
    // console.log(data);
    pool.query(
      `update volunteercontent_master set description=? where id = ?`,
      [
        data.description,
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

  CreateNewsGallery: (data, callBack) => {
    // console.log(data);
    pool.query(
      `insert into newsgallery_master(image,title,description) 
                values(?,?,?)`,
      [
        data.image_name,
        data.title,
        data.description
      ],
      (error, results, fields) => {
        if (error) {
          callBack(error);
        }
        return callBack(null, results);
      }
    );
  },

  UpdateNewsGallerywithimage: (data, callBack) => {
    // console.log(data);
    pool.query(
      'update newsgallery_master set image=?,title=?,description=? where id = ?',
      [
        data.image_name,
        data.title,
        data.description,
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

  UpdateNewsGallery: (data, callBack) => {
    // console.log(data);
    pool.query(
      'update newsgallery_master set title=?,description=? where id = ?',
      [
        data.title,
        data.description,
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

  getNewsGallery:(callBack) => {
    pool.query(
      `select * from newsgallery_master`,
      [],
      (error, results, fields) => {
        if (error) {
          callBack(error);
        }
        return callBack(null, results);
      }
    );
  },
  DeleteNewsGallery: (id, callBack) => {
    pool.query(
      `delete from newsgallery_master where id = ?`,
      [id],
      (error, results, fields) => {
        if (error) {
          callBack(error);
        }
        return callBack(null, results[0]);
      }
    );
  },

  CreatePhotoGallery: (data, callBack) => {
    // console.log(data);
    pool.query(
      `insert into photogallery_master(image) 
                values(?)`,
      [
        data.image_name
      ],
      (error, results, fields) => {
        if (error) {
          callBack(error);
        }
        return callBack(null, results);
      }
    );
  },

  getPhotoGallery:(callBack) => {
    pool.query(
      `select * from photogallery_master`,
      [],
      (error, results, fields) => {
        if (error) {
          callBack(error);
        }
        return callBack(null, results);
      }
    );
  },
  DeletePhotoGallery: (id, callBack) => {
    pool.query(
      `delete from photogallery_master where id = ?`,
      [id],
      (error, results, fields) => {
        if (error) {
          callBack(error);
        }
        return callBack(null, results[0]);
      }
    );
  },

  CreateVideoGallery: (data, callBack) => {
    // console.log(data);
    pool.query(
      `insert into videogallery_master(video_url) 
                values(?)`,
      [
        data.video_url
      ],
      (error, results, fields) => {
        if (error) {
          callBack(error);
        }
        return callBack(null, results);
      }
    );
  },

  getVideoGallery:(callBack) => {
    pool.query(
      `select * from videogallery_master`,
      [],
      (error, results, fields) => {
        if (error) {
          callBack(error);
        }
        return callBack(null, results);
      }
    );
  },
  DeleteVideoGallery: (id, callBack) => {
    pool.query(
      `delete from videogallery_master where id = ?`,
      [id],
      (error, results, fields) => {
        if (error) {
          callBack(error);
        }
        return callBack(null, results[0]);
      }
    );
  },

  TerminateMember: (data, callBack) => {
    // console.log(data);
    pool.query(
      `update members_master set member_status=? where id = ?`,
      [
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

  TerminateSpouse: (data, callBack) => {
    // console.log(data);
    pool.query(
      `update members_master set member_status=? where member_id = ?`,
      [
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

  getMemberShipHistoryByMemberId: (id, callBack) => {
    pool.query(
      `select *,(select membership_name from membershiptypes_master where id=memberships_history_master.membershiptype_id) as membership_name from memberships_history_master where member_id = ?`,
      [id],
      (error, results, fields) => {
        if (error) {
          callBack(error);
        }
        return callBack(null, results);
      }
    );
  },

  getEventsHistoryByMemberId: (id, callBack) => {
    pool.query(
      `select * from events_history_master where member_id = ?`,
      [id],
      (error, results, fields) => {
        if (error) {
          callBack(error);
        }
        return callBack(null, results[0]);
      }
    );
  },

  MemberShipPaymentsHistory: (callBack) => {
    pool.query(
      `select m.*,(select full_name from members_master where id=m.member_id) as member_name,(select email from members_master where id=m.member_id) as member_email,(select membership_name from membershiptypes_master where id=m.membershiptype_id) as membership_type from memberships_history_master m`,
      [],
      (error, results, fields) => {
        if (error) {
          callBack(error);
        }
        return callBack(null, results);
      }
    );
  },

  EventsPaymentsHistory: (callBack) => {
    pool.query(
      `select m.*,(select full_name from members_master where id=m.member_id) as member_name,(select email from members_master where id=m.member_id) as member_email,(select event_name from events_master where id=m.event_id) as event_name from events_history_master m`,
      [],
      (error, results, fields) => {
        if (error) {
          callBack(error);
        }
        return callBack(null, results[0]);
      }
    );
  },

  AddDownloadRequest: (data, callBack) => {
    // console.log(data);
    pool.query(
      `insert into download_requests_master(admin_id,request_type) 
                values(?,?)`,
      [
        data.admin_id,
        data.request_type
      ],
      (error, results, fields) => {
        if (error) {
          callBack(error);
        }
        return callBack(null, results);
      }
    );
  },

  UpdateDownloadRequestByPresident: (data, callBack) => {
    pool.query(
      `update download_requests_master set president_status=? where id = ?`,
      [
        data.status,
        data.request_id
      ],
      (error, results, fields) => {
        if (error) {
          callBack(error);
        }
        return callBack(null, results);
      }
    );
  },

  UpdateDownloadRequestBySecretery: (data, callBack) => {
    pool.query(
      `update download_requests_master set secretery_status=? where id = ?`,
      [
        data.status,
        data.request_id
      ],
      (error, results, fields) => {
        if (error) {
          callBack(error);
        }
        return callBack(null, results);
      }
    );
  },

  UpdateDownloadRequestByTreasurer: (data, callBack) => {
    pool.query(
      `update download_requests_master set treasurer_status=? where id = ?`,
      [
        data.status,
        data.request_id
      ],
      (error, results, fields) => {
        if (error) {
          callBack(error);
        }
        return callBack(null, results);
      }
    );
  },

  StartTransaction: (data, callBack) => {
    pool.query(
      `insert into payment_transactions(transaction_id,amount) 
                values(?,?)`,
      [
        data.transaction_id,
        data.amount
      ],
      (error, results, fields) => {
        if (error) {
          callBack(error);
        }
        return callBack(null, results);
      }
    );
  },

  CheckTransaction: (transaction_id, callBack) => {
    pool.query(
      `select * from payment_transactions where transaction_id = ?`,
      [transaction_id],
      (error, results, fields) => {
        if (error) {
          callBack(error);
        }
        return callBack(null, results[0]);
      }
    );
  },

  getDownloadRequests: (callBack) => {
    pool.query(
      `select m.*,(select admin_type from admins_master where id=m.admin_id) as admin_type from download_requests_master m`,
      [],
      (error, results, fields) => {
        if (error) {
          callBack(error);
        }
        return callBack(null, results);
      }
    );
  },

  getMyDownloadRequests: (admin_id,callBack) => {
    pool.query(
      `select m.*,(select admin_type from admins_master where id=m.admin_id) as admin_type from download_requests_master m where admin_id=?`,
      [admin_id],
      (error, results, fields) => {
        if (error) {
          callBack(error);
        }
        return callBack(null, results);
      }
    );
  },

  getPaymentsDetails: (id, callBack) => {
    pool.query(
      `select m.*,(select membership_name from membershiptypes_master where id=m.membershiptype_id) as membership_name,(select full_name from members_master where id=m.member_id) as member_name,(select mobile from members_master where id=m.member_id) as member_mobile from memberships_history_master m where id = ?`,
      [id],
      (error, results, fields) => {
        if (error) {
          callBack(error);
        }
        return callBack(null, results[0]);
      }
    );
  },

  CreateEvent: (data, callBack) => {
    // console.log(data);
    pool.query(
      `insert into events_master(eventtype_id,event_name,description,image,adult_fee,child_fee,adult_fee_nm,child_fee_nm,from_date,to_date,max_tickets,max_tickets_child,closed_date,created_on,status) 
                values(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`,
      [
        data.eventtype_id,
        data.event_name,
        data.description,
        data.image_name?data.image_name:'',
        data.adult_fee,
        data.child_fee,
        data.adult_fee_nm,
        data.child_fee_nm,
        data.from_date,
        data.to_date,
        data.max_tickets,
        data.max_tickets_child,
        data.closed_date,
        data.created_on,
        data.status
      ],
      (error, results, fields) => {
        if (error) {
          callBack(error);
        }
        return callBack(null, results);
      }
    );
  },

  UpdateEventwithimg: (data, callBack) => {
    // console.log(data);
    pool.query(
      `update events_master set eventtype_id=?,event_name=?,description=?,image=?,adult_fee=?,child_fee=?,adult_fee_nm=?,child_fee_nm=?,from_date=?,to_date=?,max_tickets=?,max_tickets_child=?,closed_date=?,status=? where id=?`,
      [
        data.eventtype_id,
        data.event_name,
        data.description,
        data.image_name,
        data.adult_fee,
        data.child_fee,
        data.adult_fee_nm,
        data.child_fee_nm,
        data.from_date,
        data.to_date,
        data.max_tickets,
        data.max_tickets_child,
        data.closed_date,
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

  UpdateEvent: (data, callBack) => {
    // console.log(data);
    pool.query(
      `update events_master set eventtype_id=?, event_name=?,description=?,adult_fee=?,child_fee=?,adult_fee_nm=?,child_fee_nm=?,from_date=?,to_date=?,max_tickets=?,max_tickets_child=?,closed_date=?,status=? where id=?`,
      [
        data.eventtype_id,
        data.event_name,
        data.description,
        data.adult_fee,
        data.child_fee,
        data.adult_fee_nm,
        data.child_fee_nm,
        data.from_date,
        data.to_date,
        data.max_tickets,
        data.max_tickets_child,
        data.closed_date,
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

  Createeventfields: (event_id,efield,callBack)=>{
    pool.query(
      `insert into events_fields_master(event_id,type,name) 
                values(?,?,?)`,
      [
        event_id,
        'input',
        efield
      ],
      (error, results, fields) => {
        if (error) {
          callBack(error);
        }
        return callBack(null, results);
      }
    );
  },

  DeleteEvent: (id, callBack) => {
    pool.query(
      `delete from events_master where id = ?`,
      [id],
      (error, results, fields) => {
        if (error) {
          callBack(error);
        }
        return callBack(null, results);
      }
    );
  },

  getEvents:(status,callBack) => {
    if(status==0){
      pool.query(
        `select * from events_master`,
        [],
        (error, results, fields) => {
          if (error) {
            callBack(error);
          }
          return callBack(null, results);
        }
      );
    }else{
      pool.query(
        `select * from events_master where status=?`,
        [status],
        (error, results, fields) => {
          if (error) {
            callBack(error);
          }
          return callBack(null, results);
        }
      );
    }
  },

  getEventstypes:(callBack) => {
    pool.query(
      `select * from eventtypes_master`,
      [],
      (error, results, fields) => {
        if (error) {
          callBack(error);
        }
        return callBack(null, results);
      }
    );
  },

  getEventById:(id,callBack) => {
    pool.query(
      `select * from events_master where id=?`,
      [id],
      (error, results, fields) => {
        if (error) {
          callBack(error);
        }
        return callBack(null, results);
      }
    );
  },

  getUpcomingEvents:(current_date,callBack) => {
    var test = "select * from events_master where '"+current_date+"' <= from_date and status=1";
    pool.query(test,[],
      (error, results, fields) => {
        if (error) {
          callBack(error);
        }
        return callBack(null, results);
      }
    );
  },

  getPastEvents:(current_date,callBack) => {
    var test = "select * from events_master where '"+current_date+"' >= from_date and status=1";
    pool.query(test,[],
      (error, results, fields) => {
        if (error) {
          callBack(error);
        }
        return callBack(null, results);
      }
    );
  },

  getRecentEvents:(callBack) => {
    var test = "select * from events_master where from_date> now() - INTERVAL 15 day and status=1";
    pool.query(test,[],
      (error, results, fields) => {
        if (error) {
          callBack(error);
        }
        return callBack(null, results);
      }
    );
  },

  addeventimages: (data, callBack) => {
    // console.log(data);
    pool.query(
      `insert into eventsimages_master(event_id,image) 
                values(?,?)`,
      [
        data.event_id,
        data.image_name
      ],
      (error, results, fields) => {
        if (error) {
          callBack(error);
        }
        return callBack(null, results);
      }
    );
  },

  DeleteEventImage: (id, callBack) => {
    pool.query(
      `delete from eventsimages_master where id = ?`,
      [id],
      (error, results, fields) => {
        if (error) {
          callBack(error);
        }
        return callBack(null, results);
      }
    );
  },

  getEventImages:(event_id,callBack) => {
    pool.query(
      `select * from eventsimages_master where event_id=?`,
      [event_id],
      (error, results, fields) => {
        if (error) {
          callBack(error);
        }
        return callBack(null, results);
      }
    );
  },

  AddCommitee: (data, callBack) => {
    pool.query(
      `insert into committee_master(from_year,to_year) values(?,?)`,
      [
        data.from_year,
        data.to_year
      ],
      (error, results, fields) => {
        if (error) {
          callBack(error);
        }
        return callBack(null, results);
      }
    );
  },

  UpdateCommitee: (data, callBack) => {
    // console.log(data);
    pool.query(
      `update committee_master set from_year=?,to_year=? where id=?`,
      [
        data.from_year,
        data.to_year,
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

  getCommitee:(callBack) => {
    pool.query(
      `select *,concat(from_year,'-',to_year) as commitee_year,(select max(id) from committee_master) as maxid from committee_master order by from_year desc`,
      [],
      (error, results, fields) => {
        if (error) {
          callBack(error);
        }
        return callBack(null, results);
      }
    );
  },

  getCommiteeDesignations:(callBack) => {
    pool.query(
      `select * from committeedesignations_master`,
      [],
      (error, results, fields) => {
        if (error) {
          callBack(error);
        }
        return callBack(null, results);
      }
    );
  },

  AddCommiteeMembers: (data, callBack) => {
    // console.log('fghjhgfdgh : ',data);
    pool.query(
      `insert into committeemembers_master(membership_id,name,commitee_id,designation_id,image) values(?,?,?,?,?)`,
      [
        data.membership_id,
        data.name,
        data.commitee_id,
        data.designation_id,
        data.image_name
      ],
      (error, results, fields) => {
        // console.log({
        //   'err':error,
        //   'results':results
        // });
        if (error) {
          callBack(error);
        }
        return callBack(null, results);
      }
    );
  },

  UpdateCommiteeMemberswithimg: (data, callBack) => {
    // console.log(data);
    pool.query(
      `update committeemembers_master set membership_id=?,name=?,commitee_id=?,designation_id=?,image=? where id=?`,
      [
        data.membership_id,
        data.name,
        data.commitee_id,
        data.designation_id,
        data.image_name,
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

  UpdateCommiteeMembers: (data, callBack) => {
    // console.log(data);
    pool.query(
      `update committeemembers_master set membership_id=?,name=?,commitee_id=?,designation_id=? where id=?`,
      [
        data.membership_id,
        data.name,
        data.commitee_id,
        data.designation_id,
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

  getCommitteeById:(id,callBack) => {
    pool.query(
      `select * from committee_master where id=?`,
      [id],
      (error, results, fields) => {
        if (error) {
          callBack(error);
        }
        return callBack(null, results);
      }
    );
  },

  getCommiteeMembers:(commitee_id,callBack) => {
    pool.query(
      `select committeemembers_master.*,(select designation from committeedesignations_master where id=committeemembers_master.designation_id) as designation from committeemembers_master where committeemembers_master.commitee_id=?`,
      [commitee_id],
      (error, results, fields) => {
        if (error) {
          callBack(error);
        }
        return callBack(null, results);
      }
    );
  },

  getCommitteeMemberById:(id,callBack) => {
    pool.query(
      `select * from committeemembers_master where id=?`,
      [id],
      (error, results, fields) => {
        if (error) {
          callBack(error);
        }
        return callBack(null, results);
      }
    );
  },

  addService: (data, callBack) => {
    // console.log(data);
    pool.query(
      `insert into services_master(name,description,image) 
                values(?,?,?)`,
      [
        data.name,
        data.description,
        data.image_name?data.image_name:'',
      ],
      (error, results, fields) => {
        if (error) {
          callBack(error);
        }
        return callBack(null, results);
      }
    );
  },

  UpdateServicewithimg: (data, callBack) => {
    // console.log(data);
    pool.query(
      `update services_master set name=?,image=?,description=? where id=?`,
      [
        data.name,
        data.image_name,
        data.description,
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

  UpdateService: (data, callBack) => {
    // console.log(data);
    pool.query(
      `update services_master set name=?,description=? where id=?`,
      [
        data.name,
        data.description,
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

  getServices:(callBack) => {
    pool.query(
      `select * from services_master`,
      [],
      (error, results, fields) => {
        if (error) {
          callBack(error);
        }
        return callBack(null, results);
      }
    );
  },

  getServiceById:(id, callBack) => {
    pool.query(
      `select * from services_master where id=?`,
      [id],
      (error, results, fields) => {
        if (error) {
          callBack(error);
        }
        return callBack(null, results);
      }
    );
  },


  addServiceContent: (data, callBack) => {
    // console.log(data);
    pool.query(
      `insert into servicecontents_master(service_id,title,description) 
                values(?,?,?)`,
      [
        data.service_id,
        data.title,
        data.description
      ],
      (error, results, fields) => {
        if (error) {
          callBack(error);
        }
        return callBack(null, results);
      }
    );
  },

  UpdateServiceContent: (data, callBack) => {
    // console.log(data);
    pool.query(
      `update servicecontents_master set service_id=?,title=?,description=? where id=?`,
      [
        data.service_id,
        data.title,
        data.description,
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

  getServiceContents:(service_id, callBack) => {
    pool.query(
      `select * from servicecontents_master where service_id=?`,
      [service_id],
      (error, results, fields) => {
        if (error) {
          callBack(error);
        }
        return callBack(null, results);
      }
    );
  },

  getServiceGallery:(service_id, callBack) => {
    pool.query(
      `select * from servicesgallery_master where service_id=?`,
      [service_id],
      (error, results, fields) => {
        if (error) {
          callBack(error);
        }
        return callBack(null, results);
      }
    );
  },

  addServiceGallery: (data, callBack) => {
    // console.log(data);
    pool.query(
      `insert into servicesgallery_master(service_id,image) 
                values(?,?)`,
      [
        data.service_id,
        data.image_name
      ],
      (error, results, fields) => {
        if (error) {
          callBack(error);
        }
        return callBack(null, results);
      }
    );
  },

  AddEventBooking: (data, callBack) => {
    // console.log(data);
    pool.query(
      `insert into events_bookings_master(event_id,member_id,membership_id,full_name,email,mobile,address,adult_tickets,child_tickets,total_amount,txn_no,payment_mode) 
                values(?,?,?,?,?,?,?,?,?,?,?,?)`,
      [
        data.event_id,
        data.member_id,
        data.membership_id,
        data.full_name,
        data.email,
        data.mobile,
        data.address,
        data.adult_tickets,
        data.child_tickets,
        data.total_amount,
        data.txn_no,
        data.payment_mode
      ],
      (error, results, fields) => {
        if (error) {
          callBack(error);
        }
        return callBack(null, results);
      }
    );
  },

  CheckMemberShipid:(membership_id,current_date,callBack) =>{
    var test = "select * from members_master where '"+current_date+"' <= membership_enddate and registration_id=?";
    pool.query(test,[membership_id],
    (error, results, fields) => {
        if (error) {
          callBack(error);
        }
        return callBack(null, results);
      }
    );
  },

  DeleteServiceGallery: (id, callBack) => {
    pool.query(
      `delete from servicesgallery_master where id = ?`,
      [id],
      (error, results, fields) => {
        if (error) {
          callBack(error);
        }
        return callBack(null, results);
      }
    );
  },

  getEventBookings:(member_id, callBack) => {
    pool.query(
      `select b.*,(select event_name from events_master where id=b.event_id) as event_name,(select image from events_master where id=b.event_id) as image from events_bookings_master b where member_id=?`,
      [member_id],
      (error, results, fields) => {
        if (error) {
          callBack(error);
        }
        return callBack(null, results);
      }
    );
  },
 
  getMemberEventsBookings:(callBack) => {
    pool.query(
      `select b.*,(select event_name from events_master where id=b.event_id) as event_name,(select image from events_master where id=b.event_id) as image from events_bookings_master b`,
      [],
      (error, results, fields) => {
        if (error) {
          callBack(error);
        }
        return callBack(null, results);
      }
    );
  },

  getEventbookingById:(event_id,callBack) => {
    pool.query(
      `select b.*,(select event_name from events_master where id=b.event_id) as event_name,(select image from events_master where id=b.event_id) as image from events_bookings_master b where id=?`,
      [event_id],
      (error, results, fields) => {
        if (error) {
          callBack(error);
        }
        return callBack(null, results);
      }
    );
  },

  CreateEventType: (data, callBack) => {
    // console.log(data);
    pool.query(
      `insert into eventtypes_master(event_type,event_template,email_template,created_on) 
                values(?,?,?,?)`,
      [
        data.event_type,
        data.event_template,
        data.email_template,
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

  UpdateEventType: (data, callBack) => {
    // console.log(data);
    pool.query(
      `update eventtypes_master set event_type=?,event_template=?,email_template=? where id=?`,
      [
        data.event_type,
        data.event_template,
        data.email_template,
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

  AddBookingMembers: (data, callBack) => {
    // console.log(data);
    pool.query(
      `insert into eventbookings_members_master(booking_id,name,mobile,email,age,member_type,barcode) 
                values(?,?,?,?,?,?,?)`,
      [
        data['booking_id'],
        data['name'],
        data['mobile'],
        data['email'],
        data['age'],
        data['member_type'],
        data['barcode']
      ],
      (error, results, fields) => {
        // console.log('error :', error);
        // console.log('results :', results);
        if (error) {
          callBack(error);
        }
        return callBack(null, results);
      }
    );
  },

  getEventFields: (event_id, callBack) =>{
    pool.query(
      `select * from events_fields_master where event_id=?`,
      [event_id],
      (error, results, fields) => {
        if (error) {
          callBack(error);
        }
        return callBack(null, results);
      }
    );
  },

  AddBookingFields: (data, callBack) => {
    // console.log(data);
    pool.query(
      `insert into eventbookings_fields_master(eventbooking_id,eventfield_id,eventfield_value) 
                values(?,?,?)`,
      [
        data['booking_id'],
        data['field_id'],
        data['field_value']
      ],
      (error, results, fields) => {
        // console.log('error :', error);
        // console.log('results :', results);
        if (error) {
          callBack(error);
        }
        return callBack(null, results);
      }
    );
  },

  getbookingfieldsBybookid: (book_id, callBack) => {
    pool.query(
      `select b.*,(select name from events_fields_master where id=d.eventfield_id) as field_name from eventbookings_fields_master b where eventbooking_id=?`,
      [book_id],
      (error, results, fields) => {
        if (error) {
          callBack(error);
        }
        return callBack(null, results);
      }
    );
  },

  getbookingticketsBybookid: (book_id, callBack) => {
    pool.query(
      `select * from eventbookings_members_master where booking_id=?`,
      [book_id],
      (error, results, fields) => {
        if (error) {
          callBack(error);
        }
        return callBack(null, results);
      }
    );
  }
  


};

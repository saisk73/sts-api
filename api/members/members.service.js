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
      `insert into memberships_history_master(member_id, membershiptype_id, membership_amount,transaction_id,created_on) 
                values(?,?,?,?)`,
      [
        data.id,
        data.membershiptype_id,
        data.membership_amount,
        data.transaction_id,
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

  UpdateAdminLoginOtp: (data, callBack) => {
    pool.query(
      `update admins_master set login_otp=? where id = ?`,
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

  UpdateSpouseVerifyStatus: (member_id,status, callBack) => {
    pool.query(
      `update members_master set status=? where member_id = ?`,
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
      `update aboutus_master set welcome_description=?,about=? where id = ?`,
      [
        data.welcome_description,
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
      `insert into newsgallery_master(image) 
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
      `select * from memberships_history_master where member_id = ?`,
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


  

  

  
  
  


};

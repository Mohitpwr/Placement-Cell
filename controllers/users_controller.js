const User = require("../models/user");
const Student = require("../models/student");
const interview = require("../models/interview");



module.exports.signIn=(req,res)=>{
  if(req.isAuthenticated()){
      return res.render('/students/studentsList')
  }
    return res.render('signIn')
}

module.exports.signUp=(req,res)=>{
  if(req.isAuthenticated()){
      return res.render('students/studentsList')
  }
  return res.render('signUp')
}

module.exports.profile = function (req, res) {
  if (req.cookies.user_id) {
    User.findById(req.cookies.user_id, function (err, user) {
      Student.find({}, function (err, students) {
        interview.find({}, function (err, interviewfetch) {
          if (err) {
            console.log("cannot fetch interview", err);
          }

          return res.render("user_profile", {
            title: "User Profile",
            user: user,
            students: students,
            interviews: interviewfetch,
          });
        });
      });
    });
  } else {
    console.log("entered Headers");
    return res.redirect("/users/sign-in");
  }
};



// Sign up 
module.exports.create = function (req, res) {

  if (req.body.password != req.body.confirm_password) {
    // req.flash("success", "Password and Confirm Password are not same");
    return res.redirect("back");
  }
  User.findOne({ email: req.body.email }, function (err, user) {
    if (err) {
      console.log("Error in finding user in signing up");
      return;
    }
    if (!user) {
      // const secret = 'abcdefg';

      User.create(
        {
          name: req.body.name,
          email: req.body.email,
          password: req.body.password,
        },
        function (err, user) {
          if (err) {
            console.log("Error in finding user in signing up");
            return;
          }
          // req.flash("success", "Signed Up Successfully");
          return res.redirect("/");
        }
      );
    } else {
      // req.flash("error", "Sign Up Failed");
      return res.redirect("back");
    }
  });
};


module.exports.createSession = function (req, res) {
  
        res.redirect('/students/studentsList')
    
      // req.flash("success", "Logged in successfully");
    
};

// Sign out
module.exports.signOut = function (req, res) {

  req.logout()  //provided by passport js
  // req.flash('success',"Logged out Successfully")
  res.redirect('/')
};

// render reset password page
module.exports.resetPassword = function (req, res) {
  return res.render("user_reset_password", {
    title: "Authentication | Reset Password",
  });
};

// reset password
module.exports.resetUserPassword = function (req, res) {
  // password and confirm_password are not same
  console.log(req.body);
  if (req.body.password != req.body.confirm_password) {
    req.flash("error", "Password and Confirm Password are not same");
    // console.log("password and confirm_password are not same");
    return res.redirect("back");
  }
  // find user
  User.findOne({ email: req.body.email }, function (err, user) {
    if (err) {
      req.flash("error", "User not found");
      console.log("Unable to find the said email");
      return res.redirect("back");
    }
    // user found
    console.log(user);
    if (user) {
      User.updateOne(
        { email: req.body.email },
        {
          $password: req.body.password,
        }
      );
      // user.password = req.body.password;
      user.save();
      req.flash("success", "Password Changed Successfully");
      console.log("password changed");
      return res.redirect("/users/profile");
    } else {
      // user not found
      req.flash("error", "User not found");
      console.log("password not changed as user could not be found");
      return res.redirect("back");
    }
  });
};

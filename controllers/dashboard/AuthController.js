const AdminModel = require("../../models/admin.model");
const bcrypt = require("bcrypt");
const {
  checkAdminAuth,
  checkAdminNotAuth,
} = require("../../helpers/checkAdminAuth");
const validationResult = require("express-validator").validationResult;

//__________________get login__________________________
module.exports.getlogin = (req, res, next) => {
  checkAdminAuth(req, res, next); // If session has been set redirect to dasshboard
  return res.render("dashboard/auth/login", {
    error: req.flash('error')[0],
    validationErrors: req.flash("validationErrors"),
  });
};
//__________________post login__________________________
module.exports.postlogin = async (req, res, next) => {
  checkAdminAuth(req, res, next); // If session has been set redirect to dasshboard
  if (!validationResult(req).isEmpty()) {
    req.flash("validationErrors", validationResult(req).errors);
    return res.redirect("/admin/login");
  }
  const { email, password } = req.body;
  let admin = await AdminModel.findOne({ email });
  console.log(admin);
  // return res.send(admin)

  if (!admin || !(password== admin.password)) {
    // if (!admin || !(await bcrypt.compare(password, admin.password))) {
    req.flash("error", "Incorrect Data");
    return res.redirect("/admin/login");
  }

  req.session.admin_id = admin._id;
  req.session.admin_name = admin.name;
  req.session.admin_is_logged_in = true;

  return res.redirect("/admin");
};
//__________________logout__________________________

module.exports.logout = (req, res) => {
  checkAdminNotAuth(req, res); // If not session redirect to login page
  req.session.destroy(() => {
    return res.redirect("/admin/login");
  });
};

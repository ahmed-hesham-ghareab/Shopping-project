const bcrypt = require("bcrypt");
const { app } = require("../../app");

const {
  checkUserAuth,
  checkUserNotAuth,
} = require("../../helpers/checkUserAuth");
const userModel = require("../../models/user.model");
const validationResult = require("express-validator").validationResult;

//__________________get regist __________________________
module.exports.getRegist = (req, res, next) => {
  checkUserAuth(req, res, next); // If session has been set redirect to dasshboard
  return res.render("website/auth/register", {
    error: req.flash("error")[0],
    validationErrors: req.flash("validationErrors"),
  });
};
//__________________post regist __________________________
module.exports.postRegist = async (req, res, next) => {
  if (!validationResult(req).isEmpty()) {
    req.flash("validationErrors", validationResult(req).errors);
    return res.redirect("/website/register");
  }
  let User = new userModel(req.body);
  await User.save();
  // let user = await userModel.insertMany(req.body);
  return res.redirect("/website/login");
};

//__________________get login__________________________
module.exports.getlogin = (req, res, next) => {
  checkUserAuth(req, res, next); // If session has been set redirect to dasshboard
  // console.log(req.flash('error')[0]);
  return res.render("website/auth/login", {
    error: req.flash("error")[0],
    validationErrors: req.flash("validationErrors"),
  });
};
//__________________post login__________________________
module.exports.postlogin = async (req, res, next) => {
  checkUserAuth(req, res, next); // If session has been set redirect to dasshboard
  if (!validationResult(req).isEmpty()) {
    req.flash("validationErrors", validationResult(req).errors);
    return res.redirect("/website/login");
  }
  const { email, password } = req.body;
  let user = await userModel.findOne({ email });

  if (!user || !(await bcrypt.compare(password, user.password))) {
    req.flash("error", "Incorrect Data");
    return res.redirect("/website/login");
  }

  req.session.user_id = user._id;
  req.session.user_name = user.name;
  req.session.user_is_logged_in = true;

  app.locals.user_id = user._id;
  app.locals.user_name = user.name;
  app.locals.user_is_logged_in = true;

  return res.redirect("/website/home");
};

//__________________logout__________________________

module.exports.logout = (req, res) => {
  checkUserNotAuth(req, res); // If not session redirect to login page

  app.locals.user_id = "";
  app.locals.user_name = "";
  app.locals.user_is_logged_in = false;

  req.session.destroy(() => {
    return res.redirect("/website/login");
  });
};

const { app } = require("../app");



module.exports.checkUserNotAuth = (req, res) => {
  if (
    !req.session.user_is_logged_in ||
    req.session.user_is_logged_in == false
  )
    return res.redirect("/website/login");
};

module.exports.checkUserAuth = (req, res, next) => {
  if (req.session.user_is_logged_in && req.session.user_is_logged_in == true){
    app.locals.user_id = req.session.user_id;
    app.locals.user_name = req.session.user_name;
    app.locals.user_is_logged_in = true;
    return res.redirect("/website/home");
  }
};






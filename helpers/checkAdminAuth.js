module.exports.checkAdminNotAuth = (req, res) => {
  if (
    !req.session.admin_is_logged_in ||
    req.session.admin_is_logged_in == false
  )
    return res.redirect("/admin/login");
};

module.exports.checkAdminAuth = (req, res, next) => {
  if (req.session.admin_is_logged_in && req.session.admin_is_logged_in == true)
  return res.redirect("/admin/");
};


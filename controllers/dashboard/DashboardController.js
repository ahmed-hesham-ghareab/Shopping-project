const { checkAdminNotAuth } = require("../../helpers/checkAdminAuth");
const { getModels } = require("../../helpers/general");
const orderModel = require("../../models/order.model");
const userModel = require("../../models/user.model");

module.exports.getDashboard = async(req, res, next) => {
  checkAdminNotAuth(req, res, next); // If not session redirect to login page
 let users = await userModel.find({});
 let orders = await orderModel.find({}).populate("userName")

  res.render("dashboard/dashboard.ejs", {
    admin_is_logged_in: req.session.admin_is_logged_in,
    users:users,
    orders:orders,
  });
};

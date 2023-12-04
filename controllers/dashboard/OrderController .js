const { checkAdminNotAuth } = require("../../helpers/checkAdminAuth");
const { getModels } = require("../../helpers/general");
const orderModel = require("../../models/order.model");
const userModel = require("../../models/user.model");
const validationResult = require("express-validator").validationResult;

//__________________Get Add order Page________________________
module.exports.createorder = async(req, res, next) => {
  checkAdminNotAuth(req, res, next); // If not session redirect to login page
  userName = await userModel.find({});

  res.render("dashboard/orders/add_orders.ejs", {
    validationErrors: req.flash("validationErrors"),
    success: req.flash("success")[0],
    userName:userName,
  });
};

//__________________Post Add order________________________
module.exports.addorder = async (req, res, next) => {
  checkAdminNotAuth(req, res, next); // If not session redirect to login page

  //ٍStart Validation
  if (!validationResult(req).isEmpty()) {
    req.flash("validationErrors", validationResult(req).errors);
    return res.redirect("/admin/order/create");
  }
  //ٍEnd of Validation

  order = await orderModel.insertMany(req.body);
  req.flash("success", "order has been added successfully");
  return res.redirect("/admin/order/create");
};
//__________________Get All order ________________________
module.exports.getorders = async (req, res, next) => {
  checkAdminNotAuth(req, res, next); // If not session redirect to login page
  let orders = await orderModel.find({});
  res.render("dashboard/orders/orders.ejs", {
    
    orders: orders,
  });
};

//__________________get update order________________________
module.exports.updatorder = async (req, res, next) => {
  checkAdminNotAuth(req, res, next); // If not session redirect to login page
  
  let order_id = req.params.id;
  let order = await orderModel.findById(order_id);
  console.log(order);
  res.render("dashboard/orders/update_orders.ejs", {
    
    order: order,

  });
};

//__________________Post update order________________________
module.exports.updateorder = async (req, res, next) => {
  checkAdminNotAuth(req, res, next); // If not session redirect to login page
  if (req.file) req.body["image"] = req.file.filename;

  console.log(req.params.id);
  console.log(req.body);
  order = await orderModel.findByIdAndUpdate(req.params.id, req.body);
  res.redirect("/admin/order");
};
//__________________ delete order________________________
module.exports.deleteorder = async (req, res, next) => {
  checkAdminNotAuth(req, res, next); // If not session redirect to login page
  await orderModel.findByIdAndDelete(req.params.id);
  res.redirect("/admin/order");
};

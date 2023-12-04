const { checkAdminNotAuth } = require("../../helpers/checkAdminAuth");
const { getModels } = require("../../helpers/general");
const Stock_typeModel = require("../../models/stock_type.model");
const validationResult = require("express-validator").validationResult;

//__________________Get Add Stock_type Page________________________
module.exports.createStock_type = async(req, res, next) => {
  checkAdminNotAuth(req, res, next); // If not session redirect to login page
  res.render("dashboard/Stock_type/add_Stock_type.ejs", {
    validationErrors: req.flash("validationErrors"),
    success: req.flash("success")[0],
  });
};

//__________________Post Add Stock_type________________________
module.exports.addStock_type = async (req, res, next) => {
  checkAdminNotAuth(req, res, next); // If not session redirect to login page
  // ٍStart Validation
  if (!validationResult(req).isEmpty()) {
    req.flash("validationErrors", validationResult(req).errors);
    return res.redirect("/admin/Stock_type/create");
  }
  // ٍEnd of Validation

  Stock_type = await Stock_typeModel.insertMany(req.body);
  req.flash("success", "Stock_type has been added successfully");
  return res.redirect("/admin/Stock_type/create");
};
//__________________Get All Stock_type ________________________
module.exports.getStock_types = async (req, res, next) => {
  checkAdminNotAuth(req, res, next); // If not session redirect to login page
  let Stock_type = await Stock_typeModel.find({});
  console.log(Stock_type);
  res.render("dashboard/Stock_type/Stock_type.ejs", {
    Stock_type: Stock_type,
  });
};

//__________________get update Stock_type________________________
module.exports.updatStock_types = async (req, res, next) => {
  checkAdminNotAuth(req, res, next); // If not session redirect to login page
  let Stock_type_id = req.params.id;
  let Stock_type = await Stock_typeModel.findById(Stock_type_id);

  res.render("dashboard/Stock_type/update_Stock_type.ejs", {
    Stock_type: Stock_type,
  });
};

//__________________Post update Stock_type________________________
module.exports.updateStock_type = async (req, res, next) => {
  checkAdminNotAuth(req, res, next); // If not session redirect to login page

  Stock_type = await Stock_typeModel.findByIdAndUpdate(req.params.id, req.body);
  res.redirect("/admin/Stock_type");
};
//__________________ delete Stock_type________________________
module.exports.deleteStock_type = async (req, res, next) => {
  checkAdminNotAuth(req, res, next); // If not session redirect to login page
  await Stock_typeModel.findByIdAndDelete(req.params.id);
  res.redirect("/admin/Stock_type");
};

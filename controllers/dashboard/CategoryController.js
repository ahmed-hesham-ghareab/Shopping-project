const { redisClient } = require("../../app");
const { checkAdminNotAuth } = require("../../helpers/checkAdminAuth");
const { getModels } = require("../../helpers/general");
const categoryModel = require("../../models/category.model");
const productModel = require("../../models/product.model");
const validationResult = require("express-validator").validationResult;
var fs = require("fs");
const path = require("path");

//__________________Get Add category Page________________________
module.exports.createCategory = async (req, res, next) => {
  checkAdminNotAuth(req, res, next); // If not session redirect to login page
  res.render("dashboard/categorys/add_category.ejs", {
    validationErrors: req.flash("validationErrors"),
    success: req.flash("success")[0],
  });
};

//__________________Post Add category________________________
module.exports.addCategory = async (req, res, next) => {
  checkAdminNotAuth(req, res, next); // If not session redirect to login page

  //ٍStart Validation
  if (!validationResult(req).isEmpty()) {
    req.flash("validationErrors", validationResult(req).errors);
    return res.redirect("/admin/category/create");
  }
  //ٍEnd of Validation

  req.body["image"] = req.file?.filename;
  category = await categoryModel.insertMany(req.body);
  req.flash("success", "category has been added successfully");
  return res.redirect("/admin/category/create");
};
//__________________Get All category ________________________
module.exports.getcategorys = async (req, res, next) => {
  checkAdminNotAuth(req, res, next); // If not session redirect to login page

    results = await categoryModel.find({});

     res.render("dashboard/categorys/categorys.ejs", {
       categorys: results,
     });
};

//__________________get update category________________________
module.exports.updatcategorys = async (req, res, next) => {
  checkAdminNotAuth(req, res, next); // If not session redirect to login page

  let category_id = req.params.id;
  let category = await categoryModel.findById(category_id);
  console.log(category);
  res.render("dashboard/categorys/update_category.ejs", {
    category: category,
  });
};

//__________________Post update category________________________
module.exports.updatecategory = async (req, res, next) => {
  checkAdminNotAuth(req, res, next); // If not session redirect to login page
  if (req.file) req.body["image"] = req.file.filename;

  console.log(req.params.id);
  console.log(req.body);
  category = await categoryModel.findByIdAndUpdate(req.params.id, req.body);
  res.redirect("/admin/category");
};
//__________________ delete category________________________
module.exports.deletecategory = async (req, res, next) => {
  checkAdminNotAuth(req, res, next); // If not session redirect to login page

  category = await categoryModel.findById(req.params.id);

  await productModel.deleteMany({ category: req.params.id });
  fs.unlink(path.join("public/uploads/category/", category.image), function (response) {
  });
  await categoryModel.findByIdAndDelete(req.params.id);
  res.redirect("/admin/category");
};

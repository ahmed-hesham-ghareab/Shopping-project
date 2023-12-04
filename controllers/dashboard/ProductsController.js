const { checkAdminNotAuth } = require("../../helpers/checkAdminAuth");
const productModel = require("../../models/product.model");
const validationResult = require("express-validator").validationResult;
const categoryModel = require("../../models/category.model");
var mongoose = require("mongoose");
const stock_typeModel = require("../../models/stock_type.model");
const { getModels } = require("../../helpers/general");
const QRCode = require("qrcode");

//__________________Get Add Product Page________________________
module.exports.create = async (req, res, next) => {
  checkAdminNotAuth(req, res, next); // If not session redirect to login page
  let categorys = await categoryModel.find({});
  let stock_types = await stock_typeModel.find({});

  res.render("dashboard/products/create.ejs", {
    validationErrors: req.flash("validationErrors"),
    success: req.flash("success")[0],
    error: req.flash("error")[0],

    categorys: categorys,
    stock_types: stock_types,
  });
};

//__________________Post Add Product________________________
module.exports.addProduct = async (req, res, next) => {
  checkAdminNotAuth(req, res, next); // If not session redirect to login page
  //ٍStart Validation
  if (!validationResult(req).isEmpty()) {
    req.flash("validationErrors", validationResult(req).errors);
    return res.redirect("/admin/products/create");
  }
  //ٍEnd of Validation

  let imgs = [];
  req.body.imageCover = req.files.imageCover[0].filename;
  req.files.images.forEach((element) => {
    imgs.push(element.filename);
  });
  req.body.images = imgs;

  if (req.body["imageCover"] == "" || req.body["imageCover"] == undefined) {
    req.flash("error", "imageCover is required");
    return res.redirect("/admin/products/create");
  }
  //qrcode_product
  let link = req.body.name+"<br/>"+req.body.price ;
  QRCode.toDataURL(link, async function (err, url) {
    console.log(url);
    req.body.qrcode = url;
    product = await productModel.insertMany(req.body);
  });

  req.flash("success", "Product has been added successfully");
  return res.redirect("/admin/products/create");
};
//__________________Get All Product ________________________
module.exports.getProducts = async (req, res, next) => {
  checkAdminNotAuth(req, res, next); // If not session redirect to login page
  let products = await productModel.find({}).populate("category stock_type");

  res.render("dashboard/products/products.ejs", {
    products: products,
  });
};

//__________________get update Product________________________
module.exports.updatProducts = async (req, res, next) => {
  checkAdminNotAuth(req, res, next); // If not session redirect to login page

  let product_id = req.params.id;
  let categorys = await categoryModel.find({});
  let stock_types = await stock_typeModel.find({});
  let product = await productModel.findById(product_id);
  // console.log(product);
  res.render("dashboard/products/update_product.ejs", {
    product: product,
    stock_types: stock_types,
    categorys: categorys,
  });
};

//__________________Post update Product________________________
module.exports.updateProduct = async (req, res, next) => {
  checkAdminNotAuth(req, res, next); // If not session redirect to login page

  let imgs = [];
  if (req.files && req.files.images) {
    req.files.images.forEach((element) => {
      imgs.push(element.filename);
    });
    req.body.images = imgs;
  }
  if (req.file) req.body.imageCover = req.files.imageCover[0].filename;
  product = await productModel.findByIdAndUpdate(req.params.id, req.body);
  res.redirect("/admin/products");
};
//__________________ delete Product________________________
module.exports.deleteProduct = async (req, res, next) => {
  checkAdminNotAuth(req, res, next); // If not session redirect to login page
  await productModel.findByIdAndDelete(req.params.id);
  res.redirect("/admin/products");
};

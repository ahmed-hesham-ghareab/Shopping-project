const { checkAdminNotAuth } = require("../../helpers/checkAdminAuth");
const { getModels } = require("../../helpers/general");
const offerModel = require("../../models/offer.model");
const productModel = require("../../models/product.model");
const validationResult = require("express-validator").validationResult;

//__________________Get Add offer Page________________________
module.exports.createoffer = async (req, res, next) => {
  checkAdminNotAuth(req, res, next); // If not session redirect to login page
  let Products = await productModel.find({});
  

  res.render("dashboard/offers/add_offers.ejs", {
    validationErrors: req.flash("validationErrors"),
    success: req.flash("success")[0],
    Products: Products,
  });
};

//__________________Post Add offer________________________
module.exports.addoffer = async (req, res, next) => {
  checkAdminNotAuth(req, res, next); // If not session redirect to login page
  //ٍStart Validation
  if (!validationResult(req).isEmpty()) {
    req.flash("validationErrors", validationResult(req).errors);
    return res.redirect("/admin/offer/create");
  }
  //ٍEnd of Validation
  req.body["image"] = req.file?.filename;
  offer = await offerModel.insertMany(req.body);
  console.log(req.body);
  req.flash("success", "offer has been added successfully");
  return res.redirect("/admin/offer/create");
};
//__________________Get All offer ________________________
module.exports.getoffers = async (req, res, next) => {
  checkAdminNotAuth(req, res, next); // If not session redirect to login page
  
  let offers = await offerModel.find({}).populate("product", "-_id  name");
  res.render("dashboard/offers/offers.ejs", {  
    offers: offers,
  });
};

//__________________get update offer________________________
module.exports.updatoffer = async (req, res, next) => {
  checkAdminNotAuth(req, res, next); // If not session redirect to login page
  let offer_id = req.params.id;
  let offer = await offerModel.findById(offer_id);
  let Products = await productModel.find({});
  
  res.render("dashboard/offers/update_offers.ejs", {
    offer: offer,
    Products: Products,
  });
};

//__________________Post update offer________________________
module.exports.updateoffer = async (req, res, next) => {
  checkAdminNotAuth(req, res, next); // If not session redirect to login page
  req.body["image"] = req.file?.filename;

  console.log(req.params.id);
  console.log(req.body);
  offer = await offerModel.findByIdAndUpdate(req.params.id, req.body);
  res.redirect("/admin/offer");
};
//__________________ delete offer________________________
module.exports.deleteoffer = async (req, res, next) => {
  checkAdminNotAuth(req, res, next); // If not session redirect to login page
  await offerModel.findByIdAndDelete(req.params.id);
  res.redirect("/admin/offer");
};

//__________________Get Add Product Page________________________
module.exports.createOfferProduct = async (req, res, next) => {
  checkAdminNotAuth(req, res, next); // If not session redirect to login page

  let offer_id = req.params.id;
  let offer = await offerModel.findById(offer_id);
  let Products = await productModel.find({});

  res.render("dashboard/offers/add_product.ejs", {
    validationErrors: req.flash("validationErrors"),
    success: req.flash("success")[0],
    offer: offer,
    Products: Products,
  });
};

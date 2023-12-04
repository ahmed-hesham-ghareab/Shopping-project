const offerModel = require("../../models/offer.model");
const productModel = require("../../models/product.model");

module.exports.getHome = async (req, res, next) => {
  let products = await productModel.find({}).limit(8);
  let offers = await offerModel.find({});

  res.render("website/home.ejs", {
    products: products,
    offers: offers,
    msg: req.flash("msg_err")[0],
  });
};

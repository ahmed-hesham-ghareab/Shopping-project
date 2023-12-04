const { checkUserNotAuth } = require("../../helpers/checkUserAuth");
const cartModel = require("../../models/cart.model");
const productModel = require("../../models/product.model");

module.exports.getCart = async (req, res, next) => {
  res.render("website/cart.ejs", {});
};

//__________________Post Add cart________________________
module.exports.addCart = async (req, res, next) => {
  checkUserNotAuth(req, res, next); // If not session redirect to login page
  product_id = req.params.id;

  let product = await productModel.findOne({
    product_id: product_id,
  });
    // with message product not found
  if (!product) {
    req.flash("msg_err", "This product already added to your cart");
   return res.redirect("/website/home");
  }

  const quantity = req.params.qty;
  let product_in_cart = await cartModel.findOne({
    product_id: product_id,
    user_id: req.session.user_id,
  });
   // with message this product already added to your cart
  if (product_in_cart) {
    req.flash("msg_err", "This product already added to your cart");
   return res.redirect("/website/home");
  }
  // with message quantity product isnot equal to quantity
  if (product.quantity < quantity) {
    req.flash("msg_err", "your quantity > quantity product");
   return res.redirect("/website/home");
   //product-single/" + product_id +"
  }
// insert product in wishlist
  cart = await cartModel.insertMany({
    product_id: product_id,
    user_id: req.session.user_id,
    quantity: quantity,
  });
  return res.redirect("/website/cart");
};

//__________________Get All cart ________________________
module.exports.getCart = async (req, res, next) => {
  checkUserNotAuth(req, res, next); // If not session redirect to login page

  let cart = await cartModel
    .find({ user_id: req.session.user_id })
    .populate("product_id");
  res.render("website/cart.ejs", {
    cart: cart,
  });
};

//__________________ delete cart________________________
module.exports.deletecart = async (req, res, next) => {
  checkUserNotAuth(req, res, next); // If not session redirect to login page
  await cartModel.findByIdAndDelete(req.params.id);
  res.redirect("/website/cart");
};

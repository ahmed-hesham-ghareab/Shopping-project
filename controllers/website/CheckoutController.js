const cartModel = require("../../models/cart.model");

module.exports.getCheckout = async (req, res, next) => {
  let checkout = await cartModel
    .find({ user_id: req.session.user_id })
    .populate("product_id");
    res.render("website/checkout.ejs", {
    checkout: checkout,
  });
};

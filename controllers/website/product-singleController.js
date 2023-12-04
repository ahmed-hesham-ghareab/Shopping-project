const productModel = require("../../models/product.model");

module.exports.getProductSingle = async (req, res, next) => {
  let product_id = req.params.id;
  let product = await productModel
    .findById(product_id)
    .populate("stock_type category");
  let category_poroducts = await productModel.find({
    category: product.category._id,
  });
  console.log(req.flash("msg_err")[0]);
  res.render("website/product_single.ejs", {
    msg: req.flash("msg_err")[0],
    product: product,
    category_poroducts: category_poroducts,
  });
};

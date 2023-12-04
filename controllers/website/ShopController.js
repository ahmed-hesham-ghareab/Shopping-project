const productModel = require("../../models/product.model");

module.exports.getShop = async(req, res, next) => {
let products = await productModel.find({});

    res.render("website/shop.ejs", {
      products:products, 
    });
  };
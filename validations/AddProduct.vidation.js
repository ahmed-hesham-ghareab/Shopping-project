const productModel = require("../models/product.model");

const check = require("express-validator").check;

const add_product_validation = [
  check("category").not().isEmpty().withMessage("category is required"),
  check("name").not().isEmpty().withMessage("names is required").custom(async (value) => {
    cat = await productModel.findOne({ name: value });
    if (cat) {
      throw "Name already taken";
    } else {
      return true;
    }
  }),
  check("desc").not().isEmpty().withMessage("desc is required"),
  check("price_before")
    .isInt()
    .not()
    .isEmpty()
    .withMessage("price_before is required"),
  check("quantity").isInt().not().isEmpty().withMessage("quantity is required"),
  check("price_after")
    .isInt()
    .not()
    .isEmpty()
    .withMessage("price_after is required"),
];

module.exports = { add_product_validation };

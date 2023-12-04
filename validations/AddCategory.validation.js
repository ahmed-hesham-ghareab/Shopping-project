const categoryModel = require("../models/category.model");

const check = require("express-validator").check;
const add_category_validation = [
  check("name").not().isEmpty().withMessage("name is required").custom(async (value) => {
    cat = await categoryModel.findOne({ name: value });
    if (cat) {
      throw "Name already taken";
    } else {
      return true;
    }
  }),
  check("desc").not().isEmpty().withMessage("desc is required"),
];

module.exports = { add_category_validation };


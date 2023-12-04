const stock_typeModel = require('../models/stock_type.model');

const check = require('express-validator').check

const add_Stock_type_validation = [
 check('title').not().isEmpty().withMessage("title is required").custom(async (value) => {
    cat = await stock_typeModel.findOne({ title: value });
    if (cat) {
      throw "title already taken";
    } else {
      return true;
    }
  }),
]

module.exports = { add_Stock_type_validation }


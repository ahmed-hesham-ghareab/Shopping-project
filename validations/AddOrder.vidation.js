const orderModel = require('../models/order.model');

const check = require('express-validator').check

const add_order_validation = [
    check('name').not().isEmpty().withMessage("name is required").custom(async (value) => {
        cat = await orderModel.findOne({ name: value });
        if (cat) {
          throw "Name already taken";
        } else {
          return true;
        }
      }),
    check('price').not().isEmpty().withMessage("price is required"),
    check('payment').not().isEmpty().withMessage("payment is required"),
    check('address').not().isEmpty().withMessage("address is required"),
    check('status').not().isEmpty().withMessage("status is required"),
    check('required_date').not().isEmpty().withMessage("required_date is required"),
]


module.exports = { add_order_validation }


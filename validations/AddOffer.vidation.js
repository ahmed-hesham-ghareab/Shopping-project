const offerModel = require('../models/offer.model');

const check = require('express-validator').check

const add_offer_validation = [
    check('name').not().isEmpty().withMessage("name is required").custom(async (value) => {
        cat = await offerModel.findOne({ name: value });
        if (cat) {
          throw "Name already taken";
        } else {
          return true;
        }
      }),
    check('desc').not().isEmpty().withMessage("desc is required"),
    check('price').isInt().not().isEmpty().withMessage("price is required"),
    check('offer_stock').isInt().not().isEmpty().withMessage("offer_stock is required"),
    check('offer_start').not().isEmpty().withMessage("offer_start is required"),
    check('offer_end').not().isEmpty().withMessage("offer_end is required"),
]


module.exports = { add_offer_validation }


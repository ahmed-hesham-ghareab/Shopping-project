const ScopeModel = require('../models/Scope.model');

const check = require('express-validator').check

const add_Scope_validation = [
    check('area').not().isEmpty().withMessage("area is required").custom(async (value) => {
        cat = await ScopeModel.findOne({ area: value });
        if (cat) {
          throw "Area already taken";
        } else {
          return true;
        }
      }),
    check('price').isInt().not().isEmpty().withMessage("price is required"),
   
]

module.exports = { add_Scope_validation }


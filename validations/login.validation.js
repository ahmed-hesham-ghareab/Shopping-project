
const check = require('express-validator').check

const login_validation = [
    check('email').not().isEmpty().withMessage("email is required"),
    check('password').not().isEmpty().withMessage("password is required")
]


module.exports = { login_validation }


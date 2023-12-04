
const check = require('express-validator').check

const signup_validation = [
    check('username').not().isEmpty().withMessage("username is required"),
    check('email').not().isEmpty().withMessage("email is required").isEmail().withMessage("invalid email format"),
    check('password').isLength({ min: 6 }).withMessage("password must be at least 6 characters"),
    check('confirmPassword').not().isEmpty().withMessage("confirmPassword is required").custom((value, { req }) => {
        if (value == req.body.password) {
            return true
        } else {
            throw "Passwords don't matched"
        }
    })
]


module.exports = { signup_validation }


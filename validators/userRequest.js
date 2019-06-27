const { check, validationResult } = require('express-validator/check');


const validateRequest = () => {
   [
    // username must be an email
    check('name', 'Name is required')
      .not()
      .isEmail(),
    // password must be at least 5 chars long
    check('email', 'Please include a valid email').isEmail(),
    check('password', 'Please entere with 6 or more').isLength({ min: 6 })
  ];
}
module.exports.validateRequest;
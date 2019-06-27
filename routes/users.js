const router = require('express').Router();
const { userController } = require('../controllers/userController.js');
const { check, validationResult } = require('express-validator/check');

//route GET api/users
router.post(
  '/register',
  [
    // username must be an email
    check('name', 'Name is required')
      .not()
      .isEmail(),
    // password must be at least 5 chars long
    check('email', 'Please include a valid email').isEmail(),
    check('password', 'Please entere with 6 or more').isLength({ min: 6 })
  ],
  userController
);





module.exports = router;

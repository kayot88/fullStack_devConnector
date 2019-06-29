const router = require('express').Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const auth = require('../middleware/auth');
// const authLoginController = require('../controllers/authController');
const { check, validationResult } = require('express-validator/check');
/* Passport Local Authentication */

//with middleware "auth" without passport

router.get('/', auth, async (req, res) => {
  const user = await User.findById(req.user.id).select('-password');
  if (!user) {
    res.status(401).json({ message: 'no such user found' });
  }

  res.json(user);
});

router.post(
  '/login',
  [
    check('email', 'Please include a valid email').isEmail(),
    check('password', 'Invalid credentials').exists()
  ],
  async (req, res) => {
    //validation handling
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      //check if user exists
      const { email, password } = req.body;
      let user = await User.findOne({ email });
      if (!user) {
        return res.status(400).json({ errors: [{ msg: 'No user found' }] });
      }
      const isMatch = user.isValidPassword(password);
      if (!isMatch) {
        return res
          .status(400)
          .json({ errors: [{ msg: 'Invalid credentials' }] });
      }
      const payload = {
        user: {
          id: user.id
        }
      };
      const secret = process.env.JWT_SECRET;
      jwt.sign(payload, secret, { expiresIn: '1d' }, (error, token) => {
        if (error) {
          throw error;
        }
        res.json({ token });
      });
    } catch (error) {
      console.log(error.message);
      res.status(500).send('Server error');
    }
  }
);

module.exports = router;

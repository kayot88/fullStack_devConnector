const { check, validationResult } = require('express-validator/check');
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

exports.userController = async function(req, res) {
  //validation handling
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const { email, password, name } = req.body;
  try {
    //check if user exists
    let user = await User.findOne({ email });
    console.log(email);
    if (user) {
      return res.status(400).json({ errors: [{ msg: 'User already exists' }] });
    }
    //gravatar
    const avatar = gravatar.url(email, {
      s: '200',
      r: 'pg',
      d: 'mm'
    });
    user = new User({
      email,
      password,
      name,
      avatar,
      date:Date.now()

    });
    // const salt = await bcrypt.genSalt(10);
    // user.password = await bcrypt.hash(password, salt);
    await user.save();
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
};

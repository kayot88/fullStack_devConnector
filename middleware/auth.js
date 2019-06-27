//auth middleware
const jwt = require('jsonwebtoken');

module.exports = function(req, res, next) {
  const token = req.header('x-auth-token');
  if (!token) {
    res.status(401).json({ msg: 'There is no token' });
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log(decoded);
    req.user = decoded.user;
    next();
  } catch (error) {
    res.status(401).json({ msg: 'token is not valid' });
  }
};
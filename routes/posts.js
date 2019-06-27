const router = require('express').Router();
const { postController } = require('../controllers/postController');
//route GET api/users
router.get('/', postController);

module.exports = router;

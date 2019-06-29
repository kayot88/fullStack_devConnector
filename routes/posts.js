const router = require('express').Router();
const {
  addPost,
  getAllPosts,
  getPostById,
  deletePost
} = require('../controllers/postController');
const { check, validationResult } = require('express-validator/check');
const auth = require('../middleware/auth');
const Posts = require('../models/Posts');
const User = require('../models/User');
const Profile = require('../models/Profile');

//route POST create post
router.post(
  '/',
  [
    auth,
    [
      check('text', 'text is required')
        .not()
        .isEmpty()
    ]
  ],
  addPost
);

//get all posts
router.get('/', auth, getAllPosts);

//get post by id
router.get('/:id', auth, getPostById);

//delete post
router.delete('/:id', auth, deletePost);
module.exports = router;

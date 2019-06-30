const router = require('express').Router();
const Posts = require('../models/Posts');

const {
  addPost,
  getAllPosts,
  getPostById,
  deletePost,
  likePost,
  unLikePost
} = require('../controllers/postController');
const { check, validationResult } = require('express-validator/check');
const auth = require('../middleware/auth');

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

//like post
router.put('/like/:id', auth, likePost);

//unlike post
router.put('/unlike/:id', auth, unLikePost);

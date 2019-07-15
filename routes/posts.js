const router = require('express').Router();
const Posts = require('../models/Posts');

const {
  addPost,
  getAllPosts,
  getPostById,
  deletePost,
  likePost,
  unLikePost,
  addComment,
  deleteComment

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

//like post
router.put('/like/:id', auth, likePost);

//unlike post
router.put('/unlike/:id', auth, unLikePost);

//add coment
router.put(
  '/comments/:id',
  [
    auth,
    [
      check('text', 'text is required')
      .not()
      .isEmpty()
    ]
  ],
  addComment
  );
  
  // remove comment
  router.delete('/comments/:id/:comment_id', auth, deleteComment);
  
  module.exports = router;
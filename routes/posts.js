const router = require('express').Router();
const {
  addPost,
  getAllPosts,
  getPostById
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
router.delete('/:id', auth, async (req, res) => {
  try {
    const user = await User.findById({_id:req.user.id});
    const post = await Posts.findById(req.params.id);
    
    if (post.user.toString() !== user.id) {
      return res.status(401).json({msg: 'You must be post owner'})
    }

    if (!post) {
      return res.status(400).json({ msg: 'post not found' });
    }
    await post.remove()
    res.json({ msg: 'post was delete' });
  } catch (error) {
    console.error(error.message);
    if (error.kind === 'ObjectId') {
      return res.status(400).json({ msg: 'post not found' });
    }
    res.status(500).send('server error');
  }
});
module.exports = router;

const { check, validationResult } = require('express-validator/check');
const Posts = require('../models/Posts');
const User = require('../models/User');
const Profile = require('../models/Profile');

exports.addPost = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  try {
    const user = await User.findById({ _id: req.user.id }).select('-password');
    const post = new Posts({
      text: req.body.text,
      user: user.id,
      avatar: user.avatar
    });
    await post.save();
    res.status(200).json({ msg: 'The Post is created' });
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server error');
  }
};

exports.getAllPosts = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(401).json({ msg: 'You must authorize' });
    }
    const posts = await Posts.find().sort({ date: -1 });
    if (!posts) {
      return res.status(400).json({ msg: 'posts not found' });
    }
    res.json(posts);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('server error');
  }
};

exports.getPostById = async (req, res) => {
  try {
    const post = await Posts.findById(req.params.id);
    if (!post) {
      return res.status(400).json({ msg: 'posts not found' });
    }
    res.json(post);
  } catch (error) {
    console.error(error.message);
    if (error.kind === 'ObjectId') {
      return res.status(400).json({ msg: 'posts not found' });
    }
    res.status(500).send('server error');
  }
};
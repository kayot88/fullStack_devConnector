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
      name: user.name,
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
exports.deletePost = async (req, res) => {
  try {
    const user = await User.findById({ _id: req.user.id });
    const post = await Posts.findById(req.params.id);

    if (post.user.toString() !== user.id) {
      return res.status(401).json({ msg: 'You must be post owner' });
    }

    if (!post) {
      return res.status(400).json({ msg: 'post not found' });
    }
    await post.remove();
    res.json({ msg: 'post was delete' });
  } catch (error) {
    console.error(error.message);
    if (error.kind === 'ObjectId') {
      return res.status(400).json({ msg: 'post not found' });
    }
    res.status(500).send('server error');
  }
};

exports.likePost = async (req, res) => {
  try {
    const post = await Posts.findById(req.params.id);
    // console.log(post);
    //check if post liked
    if (
      post.likes.filter(like => like.user.toString() === req.user.id).length > 0
    ) {
      return res
        .status(400)
        .json({ msg: 'post has been already liked be you' });
    }
    post.likes.unshift({ user: req.user.id });
    await post.save();
    res.json(post.likes);
  } catch (error) {
    console.log(error.message);
    if (error.kind === 'ObjectId') {
      return res.status(400).json({ msg: 'Post not found' });
    }
    res.status(500).send('Server error');
  }
};

exports.unLikePost = async (req, res) => {
  try {
    const post = await Posts.findById(req.params.id);
    // console.log(post.likes);
    console.log(req.user.id);
    if (
      post.likes.filter(like => like.user.toString() === req.user.id).length ===
      0
    ) {
      return res.status(400).json({ msg: 'post was not like yet' });
    }
    const likeIndex = post.likes
      .map(like => {
        return like.user.toString();
      })
      .indexOf(req.user.id);
      // console.log(likeIndex);
    post.likes.splice(likeIndex, 1);
    await post.save();
    res.json(post.likes);
  } catch (error) {
    console.log(error.message);
    if (error.kind === 'ObjectId') {
      return res.status(400).json({ msg: 'Post not found' });
    }
    res.status(500).send('Server error');
  }
};

exports.addComment = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  try {
    const post = await Posts.findById(req.params.id);
    const user = await User.findById({ _id: req.user.id }).select('-password');
    const { text } = req.body;
    const newComment = {
      text,
      name: user.id,
      avatar: user.avatar
    };
    post.comments.unshift(newComment);
    await post.save();
    res.json(post.comments);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server error');
  }
};

exports.deleteComment = async (req, res) => {
  try {
    const post = await Posts.findById(req.params.id);
    const comment = post.comments.find(
      comment => comment.id === req.params.comment_id
    );
    if (!comment) {
      return res.status(400).json({ msg: 'comment not found' });
    }
    if (
      post.comments.filter(comment => comment.name.toString() === req.user.id)
        .length === 0
    ) {
      return res.json({ msg: 'you not a owner' });
    }
    const commentIndex = post.comments
      .map(comment => {
        return comment.id;
      })
      .indexOf(comment.id);

    post.comments.splice(commentIndex, 1);
    await post.save();
    res.json(post.comments);
  } catch (error) {
    console.error(error.message);
        // res.json(post.comments);

    res.status(500).send('Server error');
  }
};

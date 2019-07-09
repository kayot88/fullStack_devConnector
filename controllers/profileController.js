const { check, validationResult } = require('express-validator/check');
const request = require('request');

const Profile = require('../models/Profile');
const User = require('../models/User');
const Posts = require('../models/Posts');

exports.createProfileUpdate = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const {
    company,
    website,
    location,
    status,
    bio,
    githubusername,
    skills,
    youtube,
    twitter,
    facebook,
    linkedin,
    instagram
  } = req.body;
  const profileFields = {};
  profileFields.user = req.user.id;
  if (company) profileFields.company = company;
  if (website) profileFields.website = website;
  if (location) profileFields.location = location;
  if (status) profileFields.status = status;
  if (bio) profileFields.bio = bio;
  if (githubusername) profileFields.githubusername = githubusername;
  if (skills) {
    profileFields.skills = skills.split(',').map(skill => skill.trim());
  }
  //initialize social obj
  profileFields.social = {};
  if (youtube) profileFields.social.youtube = youtube;
  if (twitter) profileFields.social.twitter = twitter;
  if (facebook) profileFields.social.facebook = facebook;
  if (linkedin) profileFields.social.linkedin = linkedin;
  if (instagram) profileFields.social.instagram = instagram;

  try {
    // const id = req.user.id;
    let profile = await Profile.findOne({ user: req.user.id });
    // console.log(profile);
    if (profile) {
      //update profile
      profile = await Profile.findOneAndUpdate(
        { user: req.user.id },
        { $set: profileFields },
        { new: true }
      );
      return res.json(profile);
    }
    //create profile
    profile = new Profile(profileFields);
    await profile.save();
    res.json(profile);
  } catch (err) {
    console.error(err.message);
    // res.status(500).json({ msg: 'Server error' });
    res.status(500).send('Server Error');
  }
};
exports.getCurrentProfile = async (req, res) => {
  try {
    const profile = await Profile.findOne({ user: req.user.id }).populate(
      'User',
      ['name', 'avatar']
    );
    if (!profile) {
      return res.status(400).json({ msg: 'No user profile found' });
    }
    return res.json(profile);
  } catch (error) {
    console.error(error.message);
    res.json({ msg: 'Server error' });
  }
};
exports.getAllProfiles = async (req, res) => {
  try {
    // const profiles = [];
    const profiles = await Profile.find().populate('user', ['name', 'avatar']);
    return res.json(profiles);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ msg: 'Server error' });
  }
};
exports.getProfilesById = async (req, res) => {
  try {
    const profile = await Profile.findOne({
      user: req.params.user_id
    }).populate('user', ['name', 'avatar']);
    if (!profile) {
      return res.status(400).json({ msg: 'Profile not found' });
    }
    return res.json(profile);
  } catch (error) {
    console.error(error.message);
    if (error.kind == 'ObjectId') {
      return res.status(400).json({ msg: 'Profile not found' });
    }
    res.status(500).json({ msg: 'Server error' });
  }
};

exports.deleteProfileAndUser = async (req, res) => {
  try {
    //remove user posts
    await Posts.deleteMany({user: req.user.id})
    // remove user Profile
    await Profile.findOneAndRemove({ user: req.user.id });
    //remove user
    await User.findOneAndRemove({ _id: req.user.id });
    res.json({ msg: 'User deleted' });
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server error');
  }
};

exports.addExperienceToProfile = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    //find profile
    const profile = await Profile.findOne({ user: req.user.id });
    if (!profile) {
      return res.status(400).json({ msg: 'No profile found' });
    }
    const experience = ({
      title,
      company,
      from,
      location,
      to,
      current,
      description
    } = req.body);
    profile.experience.unshift(experience);
    await profile.save();
    return res.json(profile);
    // Profile.findByIdAndUpdate({experience: }, {});
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ msg: error.response.data });
  }
};

exports.deleteExperience = async (req, res) => {
  try {
    const profile = await Profile.findOne({ user: req.user.id });
    if (!profile) {
      return res.status(400).json({ msg: 'No profile found' });
    }
    const expIndex = profile.experience
      .map(item => {
        return item._id;
      })
      .indexOf(req.params.id);
      console.log(req.params.id);
    debugger;
    if (expIndex == -1) {
      return res.status(400).json({ msg: 'no experience found' });
    }

    profile.experience.splice(expIndex, 1);

    await profile.save();
    res.status(200).json(profile);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ msg: 'Server error' });
  }
};

exports.addEducationToProfile = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    //find profile
    const profile = await Profile.findOne({ user: req.user.id });
    if (!profile) {
      return res.status(400).json({ msg: 'No profile found' });
    }
    const education = ({
      school,
      degree,
      fieldofstudy,
      from,
      to,
      current,
      description
    } = req.body);
    profile.education.unshift(education);
    await profile.save();
    return res.json(profile);
    // Profile.findByIdAndUpdate({experience: }, {});
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ msg: 'Server error' });
  }
};

exports.deleteEducation = async (req, res) => {
  try {
    const profile = await Profile.findOne({ user: req.user.id });
    if (!profile) {
      return res.status(400).json({ msg: 'No profile found' });
    }
    const educIndex = profile.education
      .map(item => {
        return item._id;
      })
      .indexOf(req.params.id);

    if (educIndex == -1) {
      return res.status(400).json({ msg: 'no education found' });
    }

    profile.education.splice(educIndex, 1);

    await profile.save();
    res.status(200).json(profile);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ msg: 'Server error' });
  }
};

exports.getGithubRepos = (req, res) => {
  try {
    const opt = {
      uri: `https://api.github.com/users/${
        req.params.username
      }/repos?per_page=5&sort=created:asc&client_id=${
        process.env.GITHUB_ID
      }&client_secret=${process.env.GITHUG_SECRET}`,
      method: 'GET',
      headers: { 'user-agent': 'node.js' }
    };

    request(opt, (error, response, body) => {
      if (error) {
        return console.error(error.message);
      }
      if (response.statusCode !== 200) {
        return res.status(404).json({ msg: 'github profile not found' });
      }
      res.json(JSON.parse(body));
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ msg: 'Server error' });
  }
};

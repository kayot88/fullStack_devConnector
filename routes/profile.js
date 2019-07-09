const router = require('express').Router();
const { check, validationResult } = require('express-validator/check');
const request = require('request');
const User = require('../models/User');
const Profile = require('../models/Profile');
const {
  createProfileUpdate,
  getCurrentProfile,
  getAllProfiles,
  getProfilesById,
  deleteProfileAndUser,
  addExperienceToProfile,
  deleteExperience,
  addEducationToProfile,
  deleteEducation,
  getGithubRepos
} = require('../controllers/profileController');
const auth = require('../middleware/auth');

//route GET api/users
router.get('/me', auth, getCurrentProfile);

router.post(
  '/',
  [
    auth,
    [
      check('status', 'status is required')
        .not()
        .isEmpty(),
      check('skills', 'skills is required')
        .not()
        .isEmpty()
    ]
  ],
  createProfileUpdate
);

router.get('/', getAllProfiles);

router.get('/user/:user_id', getProfilesById);

router.delete('/', auth, deleteProfileAndUser); 

router.put(
  '/experience',
  [
    auth,
    [
      check('title', 'title is required')
        .not()
        .isEmpty(),
      check('company', 'company is required')
        .not()
        .isEmpty(),
      check('from', 'from is required')
        .not()
        .isEmpty()
    ]
  ],
  addExperienceToProfile
);

router.delete('/experience/:id', auth, deleteExperience);

router.put(
  '/education',
  [
    auth,
    [
      check('school', 'school is required')
        .not()
        .isEmpty(),
      check('degree', 'degree is required')
        .not()
        .isEmpty(),
      check('fieldofstudy', 'fieldofstudy is required')
        .not()
        .isEmpty(),
      check('from', 'from is required')
        .not()
        .isEmpty()
    ]
  ],
  addEducationToProfile
);

router.delete('/education/:id', auth, deleteEducation);

router.get('/github/:username', getGithubRepos);

module.exports = router;

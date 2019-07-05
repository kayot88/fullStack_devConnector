import React, { Fragment, useState } from 'react';
import { connect } from 'redux';
import PropTypes from 'prop-types';
import PagesSection from '../../components/PagesSection';

const CreateProfile = props => {
  const [formData, setFormData] = useState({
    company: '',
    website: '',
    location: '',
    status: '',
    bio: '',
    githubusername: '',
    skills: '',
    youtube: '',
    twitter: '',
    facebook: '',
    linkedin: '',
    instagram: ''
  });
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
  } = formData;
  const [socialInputs, toggleSocialInputs] = useState(false);
  const onChange = e => {
    return setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  // console.log(formData);
  return (
    <Fragment>
      <PagesSection>
        <h1 className="large text-primary">Create Your Profile</h1>
        <p className="lead">
          <i className="fa fa-user" /> Let's get some information to make your
          profile stand out
        </p>
        <small>* = required field</small>
        <form className="form">
          <div className="form-group">
            <select
              name="status"
              value={status}
              onChange={e => {
                onChange(e);
              }}
            >
              <option value="0">* Select Professional Status</option>
              <option value="Developer">Developer</option>
              <option value="Junior Developer">Junior Developer</option>
              <option value="Senior Developer">Senior Developer</option>
              <option value="Manager">Manager</option>
              <option value="Student or Learning">Student or Learning</option>
              <option value="Instructor">Instructor or Teacher</option>
              <option value="Intern">Intern</option>
              <option value="Other">Other</option>
            </select>
            <small className="form-text">
              Give us an idea of where you are at in your career
            </small>
          </div>
          <div className="form-group">
            <input
              type="text"
              placeholder="Company"
              name="company"
              value={company}
              onChange={e => {
                onChange(e);
              }}
            />
            <small className="form-text">
              Could be your own company or one you work for
            </small>
          </div>
          <div className="form-group">
            <input
              type="text"
              placeholder="Website"
              name="website"
              value={website}
              onChange={e => {
                onChange(e);
              }}
            />
            <small className="form-text">
              Could be your own or a company website
            </small>
          </div>
          <div className="form-group">
            <input
              type="text"
              placeholder="Location"
              name="location"
              value={location}
              onChange={e => {
                onChange(e);
              }}
            />
            <small className="form-text">
              City & state suggested (eg. Boston, MA)
            </small>
          </div>
          <div className="form-group">
            <input
              type="text"
              placeholder="* Skills"
              name="skills"
              value={skills}
              onChange={e => {
                onChange(e);
              }}
            />
            <small className="form-text">
              Please use comma separated values (eg. HTML,CSS,JavaScript,PHP)
            </small>
          </div>
          <div className="form-group">
            <input
              type="text"
              placeholder="Github Username"
              name="githubusername"
              value={githubusername}
              onChange={e => {
                onChange(e);
              }}
            />
            <small className="form-text">
              If you want your latest repos and a Github link, include your
              username
            </small>
          </div>
          <div className="form-group">
            <textarea
              placeholder="A short bio of yourself"
              name="bio"
              value={bio}
              onChange={e => {
                onChange(e);
              }}
            />
            <small className="form-text">
              Tell us a little about yourself
            </small>
          </div>
          <div className="my-2">
            <button
              type="button"
              onClick={() => toggleSocialInputs(!socialInputs)}
              className="btn btn-primary  mx-2"
            >
              Add Social Network Links
            </button>
            <span>Optional</span>
          </div>

          {socialInputs ? (
            <Fragment>
              <div className="form-group social-input">
                <i className="fa fa-twitter fa-2x" />
                <input
                  type="text"
                  placeholder="Twitter URL"
                  name="twitter"
                  value={twitter}
                  onChange={e => {
                    onChange(e);
                  }}
                />
              </div>

              <div className="form-group social-input">
                <i className="fa fa-facebook fa-2x" />
                <input
                  type="text"
                  placeholder="Facebook URL"
                  name="facebook"
                  value={facebook}
                  onChange={e => {
                    onChange(e);
                  }}
                />
              </div>

              <div className="form-group social-input">
                <i className="fa fa-youtube fa-2x" />
                <input
                  type="text"
                  placeholder="YouTube URL"
                  name="youtube"
                  value={youtube}
                  onChange={e => {
                    onChange(e);
                  }}
                />
              </div>

              <div className="form-group social-input">
                <i className="fa fa-linkedin fa-2x" />
                <input
                  type="text"
                  placeholder="Linkedin URL"
                  name="linkedin"
                  value={linkedin}
                  onChange={e => {
                    onChange(e);
                  }}
                />
              </div>

              <div className="form-group social-input">
                <i className="fa fa-instagram fa-2x" />
                <input
                  type="text"
                  placeholder="Instagram URL"
                  name="instagram"
                  value={instagram}
                  onChange={e => {
                    onChange(e);
                  }}
                />
              </div>
            </Fragment>
          ) : null}
          <input type="submit" className="btn btn-primary my-1" />
          <a className="btn btn-light my-1" href="dashboard.html">
            Go Back
          </a>
        </form>
      </PagesSection>
    </Fragment>
  );
};

CreateProfile.propTypes = {};

export default CreateProfile;

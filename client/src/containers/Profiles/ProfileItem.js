import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import moment from 'moment';
import { getProfileById } from '../../actions/profileAction';
import Spinner from '../Spinner';
import ProfileGithub from '../../containers/Profiles/ProfileGithub';

const StyledDiv = styled.div`
  display: flex;
  /* justify-content: space-around; */
  background-color: ${props => props.theme.lightColor};
`;

const ProfileItem = ({
  profile: { loading, profile },
  getProfileById,
  match,
  auth
}) => {
  useEffect(
    () => {
      getProfileById(match.params.id);
    },
    /*eslint-disable*/
    [getProfileById, match.params.id]
    /*eslint-enable*/
  );
  const listSkill = profile => {
    if (profile.skills.length > 0) {
      return profile.skills.map((skill, index) => (
        <li key={index} style={{ marginRight: '50px' }}>
          <i className="fa fa-check" /> {skill}
        </li>
      ));
    }
  };
  return (
    <Fragment>
      {!profile || loading ? (
        <Spinner />
      ) : (
        <Fragment>
          <Link to="/profiles" className="btn btn-light">
            Back To Profiles
          </Link>
          {auth.isAuthorized && auth.user.id === profile.user._id && (
            <Link to="/edit-profile" className="btn btn-dark">
              Edit Profile
            </Link>
          )}
          <div className="profile-grid my-1">
            <div className="profile-top bg-primary p-2">
              <img
                className="round-img my-1"
                src={profile.user.avatar}
                alt=""
              />
              <h1 className="large">{profile.user.name}</h1>
              <p className="lead">{profile.status}</p>
              <p>{profile.location}</p>
              <StyledDiv className="icons my-1">
                {profile.website && (
                  <a
                    href={profile.website}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <i className="fa fa-globe fa-2x" />
                  </a>
                )}
                {profile.social.twitter && (
                  <a
                    href={profile.social.twitter}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <i className="fa fa-twitter fa-2x" />
                  </a>
                )}
                {profile.social.facebook && (
                  <a
                    href={profile.social.facebook}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <i className="fa fa-facebook fa-2x" />
                  </a>
                )}
                {profile.social.linkedin && (
                  <a
                    href={profile.social.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <i className="fa fa-linkedin fa-2x" />
                  </a>
                )}
                {profile.social.youtube && (
                  <a
                    href={profile.social.youtube}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <i className="fa fa-youtube fa-2x" />
                  </a>
                )}
                {profile.social.instagram && (
                  <a
                    href={profile.social.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <i className="fa fa-instagram fa-2x" />
                  </a>
                )}
              </StyledDiv>
            </div>

            <div className="profile-about bg-light p-2">
              <h2 className="text-primary">{profile.user.name}`s bio</h2>
              <p>{profile.bio}</p>
              <div className="line" />
              <h2 className="text-primary">Skill Set</h2>
              {listSkill(profile)}
            </div>

            <div className="profile-exp bg-white p-2">
              <h2 className="text-primary">Experience</h2>
              {profile.experience.map(exp => {
                return (
                  <div key={exp._id}>
                    <h3 className="text-dark">{exp.company}</h3>
                    <p>
                      {moment(exp.from).format('MMM Do YY')} -
                      {exp.to === null
                        ? ' still work'
                        : moment(exp.to).format('MMM Do YY')}{' '}
                    </p>
                    <p>
                      <strong>Position: </strong>
                      {exp.title}
                    </p>
                    <p>
                      <strong>Description: </strong>
                      {exp.description}
                    </p>
                  </div>
                );
              })}
            </div>

            <div className="profile-edu bg-white p-2">
              <h2 className="text-primary">Education</h2>
              {profile.education.map(edu => {
                return (
                  <div key={edu._id}>
                    <h3>{edu.school}</h3>
                    <p>
                      {moment(edu.from).format('MMM Do YY')} -
                      {edu.to === null
                        ? ' still work'
                        : moment(edu.to).format('MMM Do YY')}{' '}
                    </p>
                    <p>
                      <strong>Degree: </strong>
                      {edu.degree}
                    </p>
                    <p>
                      <strong>Field Of Study: </strong>
                      {edu.fieldofstudy}
                    </p>
                    <p>
                      <strong>Description: </strong>
                      {edu.description}
                    </p>
                  </div>
                );
              })}
            </div>

            <div className="profile-github">
              <h2 className="text-primary my-1">
                <i className="fa fa-github" /> Github Repos
              </h2>
              {profile.githubusername && <ProfileGithub />}
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

ProfileItem.propTypes = {
  getProfileById: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  profile: state.profile,
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { getProfileById }
)(ProfileItem);

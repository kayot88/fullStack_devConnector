import React, { Fragment, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { getProfileById } from '../../actions/profileAction';
import Spinner from '../Spinner';

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
              <div className="icons my-1">
                <Link to="#" target="_blank" rel="noopener noreferrer">
                  <i className="fa fa-globe fa-2x" />
                </Link>
                <Link to="#" target="_blank" rel="noopener noreferrer">
                  <i className="fa fa-twitter fa-2x" />
                </Link>
                <Link to="#" target="_blank" rel="noopener noreferrer">
                  <i className="fa fa-facebook fa-2x" />
                </Link>
                <Link to="#" target="_blank" rel="noopener noreferrer">
                  <i className="fa fa-linkedin fa-2x" />
                </Link>
                <Link to="#" target="_blank" rel="noopener noreferrer">
                  <i className="fa fa-youtube fa-2x" />
                </Link>
                <Link to="#" target="_blank" rel="noopener noreferrer">
                  <i className="fa fa-instagram fa-2x" />
                </Link>
              </div>
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
              <div>
                <h3 className="text-dark">Microsoft</h3>
                <p>Oct 2011 - Current</p>
                <p>
                  <strong>Position: </strong>Senior Developer
                </p>
                <p>
                  <strong>Description: </strong>Lorem ipsum dolor sit amet
                  consectetur adipisicing elit. Dignissimos placeat, dolorum
                  ullam ipsam, sapiente suscipit dicta eius velit amet
                  aspernatur asperiores modi quidem expedita fugit.
                </p>
              </div>
              <div>
                <h3 className="text-dark">Sun Microsystems</h3>
                <p>Nov 2004 - Nov 2011</p>
                <p>
                  <strong>Position: </strong>Systems Admin
                </p>
                <p>
                  <strong>Description: </strong>Lorem ipsum dolor sit amet
                  consectetur adipisicing elit. Dignissimos placeat, dolorum
                  ullam ipsam, sapiente suscipit dicta eius velit amet
                  aspernatur asperiores modi quidem expedita fugit.
                </p>
              </div>
            </div>

            <div className="profile-edu bg-white p-2">
              <h2 className="text-primary">Education</h2>
              <div>
                <h3>University Of Washington</h3>
                <p>Sep 1993 - June 1999</p>
                <p>
                  <strong>Degree: </strong>Masters
                </p>
                <p>
                  <strong>Field Of Study: </strong>Computer Science
                </p>
                <p>
                  <strong>Description: </strong>Lorem ipsum dolor sit amet
                  consectetur adipisicing elit. Dignissimos placeat, dolorum
                  ullam ipsam, sapiente suscipit dicta eius velit amet
                  aspernatur asperiores modi quidem expedita fugit.
                </p>
              </div>
            </div>

            <div className="profile-github">
              <h2 className="text-primary my-1">
                <i className="fa fa-github" /> Github Repos
              </h2>
              <div className="repo bg-white p-1 my-1">
                <div>
                  <h4>
                    <Link to="#" target="_blank" rel="noopener noreferrer">
                      Repo One
                    </Link>
                  </h4>
                  <p>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Repellat, laborum!
                  </p>
                </div>
                <div>
                  <ul>
                    <li className="badge badge-primary">Stars: 44</li>
                    <li className="badge badge-dark">Watchers: 21</li>
                    <li className="badge badge-light">Forks: 25</li>
                  </ul>
                </div>
              </div>
              <div className="repo bg-white p-1 my-1">
                <div>
                  <h4>
                    <Link to="#" target="_blank" rel="noopener noreferrer">
                      Repo Two
                    </Link>
                  </h4>
                  <p>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Repellat, laborum!
                  </p>
                </div>
                <div>
                  <ul>
                    <li className="badge badge-primary">Stars: 44</li>
                    <li className="badge badge-dark">Watchers: 21</li>
                    <li className="badge badge-light">Forks: 25</li>
                  </ul>
                </div>
              </div>
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

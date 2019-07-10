import React, { Fragment, useEffect } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Spinner from '../Spinner';
import { getAllProfiles } from '../../actions/profileAction';

const StyledDiv = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const StyledList = styled.ul`
  color: ${props => props.theme.primaryColor};
`;

const Profiles = ({ getAllProfiles, profile: { loading, profiles } }) => {
  useEffect(
    () => {
      getAllProfiles();
    },
    /*eslint-disable */
    []
    /*eslint-enable */
  );
  const listExp = profile => {
    if (profile.skills.length > 0) {
      return profile.skills.map((skill, index) => (
        <li
          key={index}
          style={{ marginRight: '50px' }}
        >
          <i className="fa fa-check" /> {skill}
        </li>
      ));
    }
  };
  return loading ? (
    <Spinner />
  ) : (
    <Fragment>
      <h1 className="large text-primary">Developers</h1>
      <p className="lead">
        <i className="fa fa-connectdevelop" /> Browse and connect with
        developers
      </p>
      {profiles.map(profile => {
        return (
          <div key={profile._id} style={{marginBottom: '50px'}}>
            <Fragment>
              <div className="profile-grid my-1">
                <div className="profiles">
                  <StyledDiv className="profile bg-light" key={profile.id}>
                    <div className="wrappers d-flex">
                      <img
                        className="round-img rounded-circle mx-3"
                        src={profile.user.avatar}
                        alt="developers"
                      />
                      <div>
                        <h2>{profile.user.name}</h2>
                        <p>{profile.status}</p>
                        <p>{profile.location}</p>
                        <Link
                          to={`/profile/${profile.user._id}`}
                          className="btn btn-primary"
                        >
                          View Profile
                        </Link>
                      </div>
                    </div>
                    <StyledList className="exp-list">
                      {listExp(profile)}
                    </StyledList>
                  </StyledDiv>
                </div>
              </div>
            </Fragment>
          </div>
        );
      })}
    </Fragment>
  );
};

Profiles.propTypes = {
  getAllProfiles: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile
});

export default connect(
  mapStateToProps,
  { getAllProfiles }
)(Profiles);

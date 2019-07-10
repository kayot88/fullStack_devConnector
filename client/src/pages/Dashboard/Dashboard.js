import React, { useEffect, Fragment } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { profileActions } from '../../actions/profileAction';
import DashboardActions from '../Dashboard/DashboardActions';
import Experience from '../Dashboard/Experience';
import Education from '../Dashboard/Education';
import { deleteProfile } from '../../actions/profileAction';
import Spinner from '../../containers/Spinner';

const Dashboard = ({
  profileActions,
  deleteProfile,
  auth: { user },
  profile: { loading, profile }
}) => {
  useEffect(() => {
    profileActions();
  }, [profileActions]);
  return loading && profile === null ? (
    <Spinner />
  ) : (
    <Fragment>
      <h1 className="large text-primary">Dashboard</h1>
      <p className="lead">
        <i className="fa fa-user" />
        Welcome {user && user.name}
      </p>
      {profile !== null ? (
        <Fragment>
          <DashboardActions />
          <Experience experience={profile.experience} />
          <Education education={profile.education} />
          <p className="my=2">
            <button
              className="btn btn-danger"
              onClick={() => deleteProfile()}
            >
              <i className="fa fa-user" /> Delete user profile
            </button>
          </p>
        </Fragment>
      ) : (
        <Fragment>
          <p>
            You have not account yet, please enter some info about your self
          </p>
          <Link to={'/create-profile'} className="btn btn-primary m-1">
            Create profile
          </Link>
        </Fragment>
      )}
    </Fragment>
  );
};

Dashboard.propTypes = {
  profileActions: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  deleteProfile: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile,
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { profileActions, deleteProfile }
)(Dashboard);

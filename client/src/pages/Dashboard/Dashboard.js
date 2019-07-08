import React, { useEffect, Fragment } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { profileActions } from '../../actions/profileAction';
import DashboardActions from '../Dashboard/DashboardActions';
// import UpdateProfile from '../../components/Forms/UpdateProfile';
import Spinner from '../../containers/Spinner';

const Dashboard = ({
  profileActions,
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
          {/* <UpdateProfile /> */}
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
  // profile: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile,
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { profileActions }
)(Dashboard);

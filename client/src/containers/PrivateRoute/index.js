import React from 'react';
import { connect } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';

const PrivateRouter = ({
  component: Component,
  auth: { loading, isAuthorized },
  ...rest
}) => (
  <Route
    {...rest}
    render={props =>
      !loading && !isAuthorized ? (
        <Redirect to="/login" />
      ) : (
        <Component {...props} />
      )
    }
  />
);
PrivateRouter.propTypes ={
  auth: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps)(PrivateRouter);

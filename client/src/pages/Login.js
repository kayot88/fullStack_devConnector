import React, { Fragment, useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import Spinner from '../containers/Spinner';
import PropTypes from 'prop-types';

import { loginAction } from '../actions/authAction';

const Login = ({ loginAction, loading, isAuthorized }) => {
  const [formData, setFormData ] = useState({
    email: '',
    password: ''
  });
  const { email, password } = formData;

  const handleOnChange = e => {
    return setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleSubmit = async e => {
    e.preventDefault();
    loginAction({ email, password });
  };
  if (isAuthorized) {
    return <Redirect to='/dashboard' />;
  }
  if (loading) {
    return <Spinner />;
  }
  return (
    <Fragment>
      <h1 className="large text-primary">Sign In</h1>
      <p className="lead">
        <i className="fa fa-user " /> Sign Into Your Account
      </p>
      <form className="form" onSubmit={handleSubmit}>
        <div className="form-group">
          <input
            type="email"
            placeholder="Email Address"
            name="email"
            value={email}
            onChange={handleOnChange}
            required
          />
        </div>
        <div className="form-group">
          <input
            type="password"
            placeholder="Password"
            name="password"
            value={password}
            onChange={handleOnChange}
            minLength="6"
            required
          />
        </div>
        <input type="submit" className="btn btn-primary" value="Login" />
      </form>
      <p className="my-1">
        Dont have an account? <Link to="/register">Sign out</Link>
      </p>
    </Fragment>
  );
};

Login.propTypes = {
  loginAction: PropTypes.func.isRequired,
  loading: PropTypes.bool,
  isAuthorized: PropTypes.bool
};

const mapStateToProps = state => ({
  loading: state.auth.loading,
  isAuthorized: state.auth.isAuthorized
});

export default connect(
  mapStateToProps,
  { loginAction }
)(Login);

import React, { Fragment, useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Spinner from '../containers/Spinner';
// import authReducer from '../reducers/authReducer';
import addAlert from '../actions/alertActions';
import { registerAction } from '../actions/authAction';

const Register = ({ addAlert, registerAction, loading, isAuthorized }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    password2: ''
  });
  const { name, email, password, password2 } = formData;

  const handleOnChange = e => {
    return setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleSubmit = async e => {
    e.preventDefault();
    if (password !== password2) {
      return addAlert('password do not match', 'danger');
    }
    console.log(formData);
    registerAction({ name, email, password });
  };
  if (isAuthorized) {
    return <Redirect to="/dashboard"/>;
  }
  if (loading) {
    return <Spinner className="spinner" />;
  }
  return (
    <Fragment>
      <h1 className="large text-primary">Sign Up</h1>
      <p className="lead">
        <i className="fa fa-user" /> Create Your Account
      </p>
      <form className="form" onSubmit={handleSubmit}>
        <div className="form-group">
          <input
            type="text"
            placeholder="Name"
            name="name"
            value={name}
            onChange={handleOnChange}
            required
          />
        </div>
        <div className="form-group">
          <input
            type="email"
            placeholder="Email Address"
            name="email"
            value={email}
            onChange={handleOnChange}
            required
          />
          <small className="form-text">
            This site uses Gravatar so if you want a profile image, use a
            Gravatar email
          </small>
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
        <div className="form-group">
          <input
            type="password"
            placeholder="Confirm Password"
            name="password2"
            minLength="6"
            value={password2}
            onChange={handleOnChange}
            required
          />
        </div>
        <input type="submit" className="btn btn-primary" value="Register" />
      </form>
      <p className="my-1">
        Already have an account? <Link to="/login">Sign In</Link>
      </p>
    </Fragment>
  );
};

Register.propTypes = {
  addAlert: PropTypes.func.isRequired,
  registerAction: PropTypes.func.isRequired,
  isAuthorized: PropTypes.bool,
  loading: PropTypes.bool
};

const mapStateToProps = state => {
  return {
    loading: state.auth.loading,
    isAuthorized: state.auth.isAuthorized
  };
};

export default connect(
  mapStateToProps,
  { addAlert, registerAction }
)(Register);

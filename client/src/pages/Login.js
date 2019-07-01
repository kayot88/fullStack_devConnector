import React, { Fragment, useState } from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const { email, password } = formData;

  const handleOnChange = e => {
    return setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleSubmit = async e => {
    e.preventDefault();
    console.log(formData);
  };
  return (
    <Fragment>
      <h1 className="large text-primary">Sign In</h1>
      <p className="lead">
        <i className="fa fa-user" /> Sign Into Your Account
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

export default Login;

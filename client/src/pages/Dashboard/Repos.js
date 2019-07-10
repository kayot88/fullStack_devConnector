import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';

const Repos = props => {
  return (
    <Fragment>
      <h1 className="large text-primary">Developers</h1>
      <p className="lead">
        <i className="fa fa-connectdevelop" /> Browse and connect with developers
      </p>
      <div className="profiles">
        <div className="profile bg-light">
          <img
            className="round-img"
            src="https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50?s=200"
            alt=""
          />
          <div>
            <h2>John Doe</h2>
            <p>Developer at Microsoft</p>
            <p>Seattle, WA</p>
            <Link to="/profile" className="btn btn-primary">
              View Profile
            </Link>
          </div>

          <ul>
            <li className="text-primary">
              <i className="fa fa-check" /> HTML
            </li>
            <li className="text-primary">
              <i className="fa fa-check" /> CSS
            </li>
            <li className="text-primary">
              <i className="fa fa-check" /> JavaScript
            </li>
            <li className="text-primary">
              <i className="fa fa-check" /> Python
            </li>
            <li className="text-primary">
              <i className="fa fa-check" /> C#
            </li>
          </ul>
        </div>

        <div className="profile bg-light">
          <img
            className="round-img"
            src="https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50?s=200"
            alt=""
          />
          <div>
            <h2>John Doe</h2>
            <p>Developer at Microsoft</p>
            <p>Seattle, WA</p>
            <Link to="/profile" className="btn btn-primary">
              View Profile
            </Link>
          </div>

          <ul>
            <li className="text-primary">
              <i className="fa fa-check" /> HTML
            </li>
            <li className="text-primary">
              <i className="fa fa-check" /> CSS
            </li>
            <li className="text-primary">
              <i className="fa fa-check" /> JavaScript
            </li>
          </ul>
        </div>
      </div>
    </Fragment>
  );
};

Repos.propTypes = {};

export default Repos;

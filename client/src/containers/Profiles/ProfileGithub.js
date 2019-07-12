import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { getRepos } from '../../actions/profileAction';
const ProfileGithub = ({ profile: { profile, repos }, getRepos }) => {
  let count = 1;
  // console.log(profile.githubusername);
  useEffect(() => {
    getRepos(profile.githubusername);
    /*eslint-disable*/
  }, []);
  /*eslint-enable*/
  return (
    <Fragment>
      {repos.map(repo => {
        return (
          <div key={repo.id} className="repo bg-white p-1 my-1">
            <div className="repoWrapper">
              <h4 className="headRepo">
                <a
                  href={repo.html_url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {count++} {repo.name}
                </a>
              </h4>
              {/* <p /> */}
            </div>
            <div>
              <ul className="repoStats">
                <li className="badge badge-primary">
                  Stars: {repo.stargazers_count}
                </li>
                <li className="badge badge-dark">
                  Watchers: {repo.watchers}
                </li>
                <li className="badge badge-light">
                  Forks: {repo.forks}
                </li>
              </ul>
            </div>
          </div>
        );
      })}
    </Fragment>
  );
};

ProfileGithub.propTypes = {
  profile: PropTypes.object.isRequired,
  getRepos: PropTypes.func.isRequired
};
const mapStateToProps = state => ({
  profile: state.profile
});
export default connect(
  mapStateToProps,
  { getRepos }
)(ProfileGithub);

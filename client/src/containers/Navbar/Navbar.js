import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';
import styled from 'styled-components';
import StyledNav from '../../components/Navbar';
import StyledList from '../../components/List';
import StyledListItem from '../../components/ListItem';
import { logoutUser } from '../../actions/authAction';
const StyledLink = styled(Link)`
  color: ${props => props.theme.lightColor};
  &:hover {
    text-decoration: none;
  }
`;

const Navbar = ({ logoutUser, isAuthorized, loading }) => {
  if (isAuthorized && !loading) {
    return (
      <StyledNav className="navbar bg-dark">
        <h1>
          <StyledLink to="/">
            <i className="fa fa-code" /> DevConnector
          </StyledLink>
        </h1>
        <StyledList>
          <StyledListItem>
            <StyledLink
              className="fa fa-user"
              to="/profiles"
            > 
              Developers
            </StyledLink>
          </StyledListItem>
          <StyledListItem></StyledListItem>
          <StyledListItem>
            <StyledLink
              className="fa fa-user"
              to="/dashboard"
            > 
              Dashboard
            </StyledLink>
          </StyledListItem>
          <StyledListItem>
            <StyledLink
              className="fa fa-sign-out"
              to="/login"
              onClick={logoutUser}
            >
              Logout
            </StyledLink>
          </StyledListItem>
        </StyledList>
      </StyledNav>
    );
  }
  return (
    <StyledNav className="navbar bg-dark">
      <h1>
        <StyledLink to="/">
          <i className="fa fa-code" /> DevConnector
        </StyledLink>
      </h1>
      <StyledList>
        <StyledListItem>
          <StyledLink className="fa fa-user" to="/profiles">
            Developers
          </StyledLink>
        </StyledListItem>
        <StyledListItem>
          <StyledLink to="/register">Register</StyledLink>
        </StyledListItem>
        <StyledListItem>
          <StyledLink to="/login">Login</StyledLink>
        </StyledListItem>
      </StyledList>
    </StyledNav>
  );
};
Navbar.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  isAuthorized: PropTypes.bool,
  loading: PropTypes.bool,
};

const mapStateToProps = state => ({
  isAuthorized: state.auth.isAuthorized,
  loading:state.auth.loading
});

export default connect(
  mapStateToProps,
  { logoutUser }
)(Navbar);

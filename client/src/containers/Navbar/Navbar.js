import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import StyledNav from '../../components/Navbar';
import StyledList from '../../components/List';
import StyledListItem from '../../components/ListItem';

const StyledLink = styled(Link)`

  color: ${props => props.theme.lightColor};
  &:hover{
    text-decoration: none;
  }
`;

const Navbar = () => {
  return (
    <StyledNav className="navbar bg-dark">
      <h1>
        <StyledLink to="/">
          <i className="fa fa-code" /> DevConnector
        </StyledLink>
      </h1>
      <StyledList>
        <StyledListItem>
          <StyledLink to="/" className="active">Developers</StyledLink>
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

export default Navbar;

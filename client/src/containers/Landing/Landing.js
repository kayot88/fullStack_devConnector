import React from 'react';
import {Link} from 'react-router-dom'
import styled from 'styled-components';
import StyledSection from '../../components/LandSection';
import DarkOverlay from '../../components/Dark-overlay';

const LandingInner = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  height: 100%;
  width: 80%;
  color: #fff;
  margin: auto;
`;

const Landing = () => {
  return (
    <StyledSection className="nav">
      <DarkOverlay>
        <LandingInner>
          <h1 className="x-large">Developer Connector</h1>
          <p className="lead">
            Create a developer profile/portfolio, share posts and get help from
            other developers
          </p>
          <div className="buttons">
            <Link to="/register" className="btn btn-primary">
              Sign Up
            </Link>
            <Link to="/login" className="btn btn-light">
              Login
            </Link>
          </div>
        </LandingInner>
      </DarkOverlay>
    </StyledSection>
  );
};

export default Landing;
